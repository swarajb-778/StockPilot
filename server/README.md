# 🖥️ StockPilot Backend Server

<div align="center">

**Express.js REST API for StockPilot Inventory Management System**

[![Backend API](https://img.shields.io/badge/API-Live-green?style=for-the-badge)](http://54.176.27.132:8000)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)

</div>

---

## 🌐 Live API

| Environment | URL | Status |
|-------------|-----|--------|
| **Production** | [http://54.176.27.132:8000](http://54.176.27.132:8000) | ✅ Live |
| **Development** | [http://localhost:8000](http://localhost:8000) | Local |

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18.x | JavaScript runtime |
| **Express.js** | 4.x | Web framework |
| **TypeScript** | 5.x | Type safety |
| **Prisma** | 5.x | ORM for database |
| **PostgreSQL** | 15.x | Production database (RDS) |
| **SQLite** | 3.x | Development database |
| **PM2** | 5.x | Process manager |
| **AWS SDK v3** | Latest | AWS service integration |

---

## 📁 Project Structure

```
server/
├── src/
│   ├── controllers/           # Business logic
│   │   ├── dashboardController.ts
│   │   ├── expenseController.ts
│   │   ├── notificationController.ts
│   │   ├── productController.ts
│   │   └── userController.ts
│   ├── routes/                # API route definitions
│   │   ├── dashboardRoutes.ts
│   │   ├── expenseRoutes.ts
│   │   ├── notificationRoutes.ts
│   │   ├── productRoutes.ts
│   │   └── userRoutes.ts
│   ├── utils/                 # Utility functions
│   │   ├── aws-services.ts    # SNS notifications
│   │   ├── multerConfig.ts    # File upload config
│   │   └── s3.ts              # S3 integration
│   └── index.ts               # Entry point
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── migrations/            # Migration files
│   ├── seed.ts                # Database seeder
│   └── seedData/              # Seed JSON files
├── Nike_Items/                # Product images (40 images)
├── dist/                      # Compiled JavaScript
├── ecosystem.config.js        # PM2 configuration
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or higher
- npm or yarn
- PostgreSQL (for production) or SQLite (for development)

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
cp aws-env-template.txt .env
# Edit .env with your values
```

3. **Generate Prisma client:**
```bash
npx prisma generate
```

4. **Run database migrations:**
```bash
# Development (SQLite)
npx prisma migrate dev

# Production (PostgreSQL)
npx prisma migrate deploy
```

5. **Seed the database:**
```bash
npx prisma db seed
```

6. **Start the server:**
```bash
# Development
npm run dev

# Production
npm run build
npm start
```

---

## 🔐 Environment Variables

Create a `.env` file in the server directory:

```env
# Database
DATABASE_URL="postgresql://admin:yourpassword@stockpilot-db.xxxxx.us-west-1.rds.amazonaws.com:5432/stockpilot"

# Server
PORT=8000

# AWS Configuration
AWS_REGION=us-west-1

# S3 Configuration
S3_BUCKET_NAME=stockpilot-images-317635640887
S3_REGION=us-west-1
S3_PRODUCTS_URL=https://stockpilot-images-317635640887.s3.us-west-1.amazonaws.com/products

# SNS Topics (for notifications)
SNS_STOCK_ALERTS_TOPIC_ARN=arn:aws:sns:us-west-1:317635640887:stockpilot-stock-alerts
SNS_SYSTEM_ALERTS_TOPIC_ARN=arn:aws:sns:us-west-1:317635640887:stockpilot-system-alerts

# CloudFront (optional - for CDN)
CLOUDFRONT_DOMAIN=d1k3m3m0ppxz1z.cloudfront.net
```

---

## 📡 API Endpoints

### Base URL
- **Production:** `http://54.176.27.132:8000`
- **Development:** `http://localhost:8000`

### Dashboard

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/dashboard` | Get dashboard metrics and analytics |

**Response Example:**
```json
{
  "popularProducts": [...],
  "salesSummary": [...],
  "purchaseSummary": [...],
  "expenseSummary": [...],
  "expenseByCategorySummary": [...]
}
```

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/products` | Get all products (with optional search) |
| `POST` | `/products` | Create a new product |
| `PUT` | `/products/:id` | Update a product |
| `DELETE` | `/products/:id` | Delete a product |

**Query Parameters:**
- `search` - Search products by name

**Create Product Body:**
```json
{
  "name": "Nike Air Max",
  "price": 149.99,
  "stockQuantity": 50,
  "rating": 4.5
}
```

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/users` | Get all users |
| `POST` | `/users` | Create a new user |

### Expenses

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/expenses` | Get expenses by category |
| `GET` | `/expenses/summary` | Get expense summary |

### Notifications

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/notifications` | Get all notifications |
| `GET` | `/notifications/unread-count` | Get unread notification count |
| `POST` | `/notifications` | Create a new notification |
| `PUT` | `/notifications/:id/read` | Mark notification as read |
| `PUT` | `/notifications/mark-all-read` | Mark all notifications as read |
| `DELETE` | `/notifications/:id` | Delete a notification |
| `DELETE` | `/notifications/read` | Delete all read notifications |
| `POST` | `/notifications/check-low-stock` | Check and create low stock alerts |

**Notification Types:**
- `stock_alert` - Low stock warnings
- `order_notification` - Order updates
- `system_error` - System errors
- `info` - General information

---

## 🗄️ Database Schema

### Products
```prisma
model Products {
  productId     String   @id @default(cuid())
  name          String
  price         Float
  rating        Float?
  stockQuantity Int
  minimumStock  Int      @default(10)
  category      String?
  imageUrl      String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

### Notifications
```prisma
model Notifications {
  notificationId String   @id @default(cuid())
  type           String
  message        String
  isRead         Boolean  @default(false)
  createdAt      DateTime @default(now())
  productId      String?
  userId         String?
}
```

### Users
```prisma
model Users {
  userId    String  @id @default(cuid())
  name      String
  email     String
  profileId String?
}
```

---

## 🔔 AWS SNS Integration

The server integrates with Amazon SNS for sending notifications:

### SNS Topics

| Topic | ARN | Purpose |
|-------|-----|---------|
| **Stock Alerts** | `arn:aws:sns:us-west-1:317635640887:stockpilot-stock-alerts` | Low stock notifications |
| **System Alerts** | `arn:aws:sns:us-west-1:317635640887:stockpilot-system-alerts` | System error notifications |

### Email Subscription
- **Email:** Swarajbangar77@gmail.com
- **Status:** ✅ Confirmed

### Usage Example

```typescript
import { sendStockAlert, sendSystemAlert } from './utils/aws-services';

// Send low stock alert
await sendStockAlert('Nike Air Max', 5, 10);

// Send system error alert
await sendSystemAlert('Database connection failed', 'high');
```

---

## 📦 S3 Image Storage

Product images are stored in Amazon S3:

| Configuration | Value |
|---------------|-------|
| **Bucket** | `stockpilot-images-317635640887` |
| **Region** | `us-west-1` |
| **Access** | Public read |
| **URL Pattern** | `https://stockpilot-images-317635640887.s3.us-west-1.amazonaws.com/products/{filename}` |

### Uploaded Images
40 Nike product images (`Nike1.png` - `nike40.png`)

---

## 🖥️ EC2 Deployment

### Instance Details

| Property | Value |
|----------|-------|
| **Name** | StockPilot-Backend |
| **Type** | t2.micro |
| **Region** | us-west-1 |
| **Public IP** | 54.176.27.132 |
| **OS** | Amazon Linux 2023 |

### PM2 Configuration

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'stockpilot-backend',
    script: 'dist/src/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 8000
    }
  }]
};
```

### Useful Commands

```bash
# SSH to EC2 (via Instance Connect)
# Go to AWS Console > EC2 > Connect

# Check PM2 status
pm2 status

# View logs
pm2 logs stockpilot-backend

# Restart server
pm2 restart all --update-env

# Deploy updates
cd ~/StockPilot/server
git pull
npm install
npm run build
pm2 restart all --update-env
```

---

## 🧪 Testing

```bash
# Test API health
curl http://54.176.27.132:8000/

# Test dashboard endpoint
curl http://54.176.27.132:8000/dashboard

# Test products endpoint
curl http://54.176.27.132:8000/products
```

---

## 📊 Monitoring

### CloudWatch Alarms

| Alarm | Threshold | Email |
|-------|-----------|-------|
| EC2 CPU High | > 80% | Swarajbangar77@gmail.com |
| RDS CPU High | > 80% | Swarajbangar77@gmail.com |
| RDS Storage Low | < 2GB | Swarajbangar77@gmail.com |

---

## 🔧 Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Start development server with ts-node |
| `build` | `npm run build` | Compile TypeScript to JavaScript |
| `start` | `npm start` | Start production server |
| `seed` | `npx prisma db seed` | Seed the database |
| `migrate` | `npx prisma migrate deploy` | Run migrations |

---

## 📧 Contact

**Swaraj Bangar**
- Email: [Swarajbangar77@gmail.com](mailto:Swarajbangar77@gmail.com)

---

© 2025 StockPilot. All rights reserved.

