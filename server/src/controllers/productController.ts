import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { uploadToS3, deleteFromS3, extractS3KeyFromUrl } from "../utils/s3";

const prisma = new PrismaClient();

// Generate UUID using Node.js built-in crypto
const generateUUID = (): string => crypto.randomUUID();

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const search = req.query.search?.toString().toLowerCase();
    
    // Get all products and filter case-insensitively (SQLite doesn't support case-insensitive contains natively)
    const allProducts = await prisma.products.findMany();
    
    const products = search
      ? allProducts.filter((product) =>
          product.name.toLowerCase().includes(search)
        )
      : allProducts;
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products" });
  }
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;
    
    const product = await prisma.products.findUnique({
      where: { productId },
      include: {
        Sales: {
          take: 10,
          orderBy: { timestamp: "desc" },
        },
        Purchases: {
          take: 10,
          orderBy: { timestamp: "desc" },
        },
      },
    });
    
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving product" });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, price, rating, stockQuantity, description } = req.body;
    
    let imageUrl: string | null = null;
    
    // Handle image upload if file is present
    if ((req as any).file) {
      const file = (req as any).file;
      const uploadResult = await uploadToS3(
        file.buffer,
        file.originalname,
        file.mimetype
      );
      
      if (uploadResult.success && uploadResult.url) {
        imageUrl = uploadResult.url;
      }
    }
    
    const product = await prisma.products.create({
      data: {
        productId: generateUUID(),
        name,
        price: parseFloat(price),
        rating: rating ? parseFloat(rating) : null,
        stockQuantity: parseInt(stockQuantity),
        description: description || null,
        imageUrl,
      },
    });
    
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Error creating product" });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;
    const { name, price, rating, stockQuantity, description } = req.body;
    
    // Get existing product
    const existingProduct = await prisma.products.findUnique({
      where: { productId },
    });
    
    if (!existingProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    
    let imageUrl = existingProduct.imageUrl;
    
    // Handle image upload if file is present
    if ((req as any).file) {
      const file = (req as any).file;
      // Delete old image if it exists
      if (existingProduct.imageUrl) {
        const oldKey = extractS3KeyFromUrl(existingProduct.imageUrl);
        if (oldKey) {
          await deleteFromS3(oldKey);
        }
      }
      
      const uploadResult = await uploadToS3(
        file.buffer,
        file.originalname,
        file.mimetype
      );
      
      if (uploadResult.success && uploadResult.url) {
        imageUrl = uploadResult.url;
      }
    }
    
    const updatedProduct = await prisma.products.update({
      where: { productId },
      data: {
        name: name || existingProduct.name,
        price: price ? parseFloat(price) : existingProduct.price,
        rating: rating !== undefined ? parseFloat(rating) : existingProduct.rating,
        stockQuantity: stockQuantity ? parseInt(stockQuantity) : existingProduct.stockQuantity,
        description: description !== undefined ? description : existingProduct.description,
        imageUrl,
      },
    });
    
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product" });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;
    
    // Get product to check if it has an image
    const product = await prisma.products.findUnique({
      where: { productId },
    });
    
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    
    // Delete image from S3 if it exists
    if (product.imageUrl) {
      const imageKey = extractS3KeyFromUrl(product.imageUrl);
      if (imageKey) {
        await deleteFromS3(imageKey);
      }
    }
    
    await prisma.products.delete({
      where: { productId },
    });
    
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product" });
  }
};

// Upload image for an existing product
export const uploadProductImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;
    
    if (!(req as any).file) {
      res.status(400).json({ message: "No image file provided" });
      return;
    }
    
    const file = (req as any).file;
    
    // Get existing product
    const existingProduct = await prisma.products.findUnique({
      where: { productId },
    });
    
    if (!existingProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    
    // Delete old image if it exists
    if (existingProduct.imageUrl) {
      const oldKey = extractS3KeyFromUrl(existingProduct.imageUrl);
      if (oldKey) {
        await deleteFromS3(oldKey);
      }
    }
    
    // Upload new image
    const uploadResult = await uploadToS3(
      file.buffer,
      file.originalname,
      file.mimetype
    );
    
    if (!uploadResult.success) {
      res.status(500).json({ message: uploadResult.error || "Failed to upload image" });
      return;
    }
    
    // Update product with new image URL
    const updatedProduct = await prisma.products.update({
      where: { productId },
      data: { imageUrl: uploadResult.url },
    });
    
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error uploading product image:", error);
    res.status(500).json({ message: "Error uploading product image" });
  }
};
