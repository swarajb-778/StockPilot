import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  uploadProductImage,
} from "../controllers/productController";
import { upload } from "../utils/multerConfig";

const router = Router();

// GET routes
router.get("/", getProducts);
router.get("/:productId", getProductById);

// POST routes
router.post("/", upload.single("image"), createProduct);

// PUT/PATCH routes
router.put("/:productId", upload.single("image"), updateProduct);
router.patch("/:productId", upload.single("image"), updateProduct);
router.post("/:productId/image", upload.single("image"), uploadProductImage);

// DELETE routes
router.delete("/:productId", deleteProduct);

export default router;
