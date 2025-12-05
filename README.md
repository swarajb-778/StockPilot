# 🚀 StockPilot - Inventory Management Dashboard

<div align="center">

![StockPilot Logo](client/public/StockPilotLogo.svg)

**A full-stack, cloud-native inventory management dashboard built with modern web technologies and deployed on AWS Free Tier services.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-StockPilot-blue?style=for-the-badge)](https://main.d47qigns6kh3.amplifyapp.com)
[![Backend API](https://img.shields.io/badge/Backend%20API-EC2-orange?style=for-the-badge)](http://54.176.27.132:8000)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

## 📋 Table of Contents

- [Live URLs](#-live-urls)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [AWS Architecture](#-aws-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [API Documentation](#-api-documentation)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [Contact](#-contact)

---

## 🌐 Live URLs

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend (Amplify)** | [https://main.d47qigns6kh3.amplifyapp.com](https://main.d47qigns6kh3.amplifyapp.com) | Next.js application hosted on AWS Amplify |
| **Backend API (EC2)** | [http://54.176.27.132:8000](http://54.176.27.132:8000) | Express.js REST API on EC2 |
| **CloudFront CDN** | [https://d1k3m3m0ppxz1z.cloudfront.net](https://d1k3m3m0ppxz1z.cloudfront.net) | CDN for faster content delivery |
| **Product Images (S3)** | [https://stockpilot-images-317635640887.s3.us-west-1.amazonaws.com/products](https://stockpilot-images-317635640887.s3.us-west-1.amazonaws.com/products) | S3 bucket for product images |

---

## ✨ Features

### Core Functionality
- 📊 **Real-time Dashboard** - Analytics with enhanced visualizations and KPIs
- 📦 **Inventory Management** - Track stock levels, categories, and product details
- 👥 **User Management** - Role-based access control with Clerk authentication
- 🛒 **Product Catalog** - Full CRUD operations with image support
- 💰 **Expense Tracking** - Detailed expense summaries and categorization
- 🔔 **Smart Notifications** - Low stock alerts via email (SNS/SES)
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile

### Technical Features
- 🔐 **Secure Authentication** - Clerk integration for user management
- ☁️ **Cloud-Native** - Fully deployed on AWS Free Tier
- 📈 **Auto-Scaling Ready** - Architecture supports horizontal scaling
- 🔄 **Real-time Updates** - Redux Toolkit Query for data fetching
- 🎨 **Modern UI** - Tailwind CSS with smooth animations

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router |
| **TypeScript** | Type-safe JavaScript |
| **Redux Toolkit** | State management |
| **RTK Query** | API data fetching & caching |
| **Tailwind CSS** | Utility-first styling |
| **Material UI DataGrid** | Advanced data tables |
| **Clerk** | Authentication & user management |
| **Framer Motion** | Smooth animations |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js 18** | JavaScript runtime |
| **Express.js** | Web framework |
| **Prisma ORM** | Database operations |
| **PostgreSQL** | Production database (RDS) |
| **TypeScript** | Type-safe backend |
| **PM2** | Process manager |
| **AWS SDK v3** | AWS service integration |

### AWS Services (9 Free Tier Services)
| Service | Purpose | Status |
|---------|---------|--------|
| **AWS Amplify** | Frontend hosting | ✅ Active |
| **Amazon EC2** | Backend server (t2.micro) | ✅ Active |
| **Amazon RDS** | PostgreSQL database | ✅ Active |
| **Amazon S3** | Product image storage | ✅ Active |
| **Amazon CloudFront** | CDN for fast delivery | ✅ Active |
| **Amazon SNS** | Push notifications | ✅ Active |
| **Amazon SES** | Email notifications | ✅ Active |
| **Amazon CloudWatch** | Monitoring & alarms | ✅ Active |
| **Parameter Store** | Secrets management | ✅ Active |

---

## 🏗️ AWS Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                  AWS CLOUD                                       │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│    ┌──────────────┐        ┌──────────────┐        ┌──────────────────────┐     │
│    │   USERS      │───────▶│  CloudFront  │───────▶│   AWS Amplify        │     │
│    │   (Browser)  │        │   (CDN)      │        │   (Next.js Frontend) │     │
│    └──────────────┘        └──────────────┘        └──────────────────────┘     │
│           │                       │                                              │
│           │                       │                                              │
│           ▼                       ▼                                              │
│    ┌──────────────────────────────────────────────────────────────────────┐     │
│    │                    VIRTUAL PRIVATE CLOUD (VPC)                        │     │
│    │  ┌────────────────────────────────────────────────────────────────┐  │     │
│    │  │                      PUBLIC SUBNET                              │  │     │
│    │  │   ┌──────────────────────────────────────────────────────┐     │  │     │
│    │  │   │             Amazon EC2 (t2.micro)                     │     │  │     │
│    │  │   │             - Express.js Backend                      │     │  │     │
│    │  │   │             - IP: 54.176.27.132                       │     │  │     │
│    │  │   └──────────────────────────────────────────────────────┘     │  │     │
│    │  └────────────────────────────────────────────────────────────────┘  │     │
│    │  ┌────────────────────────────────────────────────────────────────┐  │     │
│    │  │                     PRIVATE SUBNET                              │  │     │
│    │  │   ┌──────────────────────────────────────────────────────┐     │  │     │
│    │  │   │            Amazon RDS (db.t3.micro)                   │     │  │     │
│    │  │   │            - PostgreSQL Database                      │     │  │     │
│    │  │   │            - stockpilot-db                            │     │  │     │
│    │  │   └──────────────────────────────────────────────────────┘     │  │     │
│    │  └────────────────────────────────────────────────────────────────┘  │     │
│    └──────────────────────────────────────────────────────────────────────┘     │
│                                                                                  │
│    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌────────────┐   │
│    │  Amazon S3   │    │  Amazon SES  │    │  CloudWatch  │    │   SNS      │   │
│    │  (Images)    │    │  (Emails)    │    │  (Logs)      │    │  (Alerts)  │   │
│    └──────────────┘    └──────────────┘    └──────────────┘    └────────────┘   │
│                                                                                  │
│    ┌──────────────────────────────────────────────────────────────────────┐     │
│    │              AWS Systems Manager Parameter Store                      │     │
│    │              (Configuration & Secrets Management)                     │     │
│    └──────────────────────────────────────────────────────────────────────┘     │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
StockPilot/
├── client/                          # Frontend (Next.js)
│   ├── src/
│   │   ├── app/                     # App Router pages
│   │   │   ├── (components)/        # Shared components
│   │   │   ├── (dashboard)/         # Dashboard pages
│   │   │   ├── sign-in/             # Clerk auth pages
│   │   │   └── sign-up/
│   │   ├── components/ui/           # UI components
│   │   ├── lib/                     # Utilities
│   │   └── state/                   # Redux store
│   ├── public/                      # Static assets
│   └── package.json
│
├── server/                          # Backend (Express.js)
│   ├── src/
│   │   ├── controllers/             # Route handlers
│   │   ├── routes/                  # API routes
│   │   └── utils/                   # Utilities (AWS, S3, etc.)
│   ├── prisma/
│   │   ├── schema.prisma            # Database schema
│   │   ├── migrations/              # DB migrations
│   │   └── seedData/                # Seed data
│   ├── Nike_Items/                  # Product images
│   └── package.json
│
├── AWS_DEPLOYMENT_GUIDE.md          # Detailed AWS setup guide
├── AMPLIFY_SETUP_GUIDE.md           # Amplify-specific setup
└── README.md                        # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** or **yarn**
- **Git**
- **AWS Account** (for deployment)
- **Clerk Account** (for authentication)

### Local Development

1. **Clone the repository:**
```bash
git clone https://github.com/YOUR_USERNAME/StockPilot.git
cd StockPilot
```

2. **Install dependencies:**
```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

3. **Set up environment variables:**

**Client (`client/.env.local`):**
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

**Server (`server/.env`):**
```env
DATABASE_URL="file:./dev.db"
PORT=8000
```

4. **Initialize the database:**
```bash
cd server
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

5. **Start development servers:**
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

6. **Access the application:**
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8000](http://localhost:8000)

---

## 🔐 Environment Variables

### Client Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API URL | `http://54.176.27.132:8000` |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key | `pk_live_...` |
| `CLERK_SECRET_KEY` | Clerk secret key | `sk_live_...` |
| `NEXT_PUBLIC_S3_PRODUCTS_URL` | S3 products URL | `https://stockpilot-images-317635640887.s3.us-west-1.amazonaws.com/products` |
| `NEXT_PUBLIC_CLOUDFRONT_URL` | CloudFront CDN URL | `https://d1k3m3m0ppxz1z.cloudfront.net` |

### Server Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `PORT` | Server port | `8000` |
| `S3_BUCKET_NAME` | S3 bucket name | `stockpilot-images-317635640887` |
| `S3_REGION` | AWS region | `us-west-1` |
| `SNS_STOCK_ALERTS_TOPIC_ARN` | SNS topic for stock alerts | `arn:aws:sns:us-west-1:...` |
| `SNS_SYSTEM_ALERTS_TOPIC_ARN` | SNS topic for system alerts | `arn:aws:sns:us-west-1:...` |

---

## 📡 API Documentation

### Base URL
- **Production:** `http://54.176.27.132:8000`
- **Development:** `http://localhost:8000`

### Endpoints

#### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/dashboard` | Get dashboard metrics |

#### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Get all products |
| POST | `/products` | Create a new product |
| PUT | `/products/:id` | Update a product |
| DELETE | `/products/:id` | Delete a product |

#### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Get all users |
| POST | `/users` | Create a new user |

#### Expenses
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/expenses` | Get all expenses |
| GET | `/expenses/summary` | Get expense summary |

#### Notifications
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/notifications` | Get all notifications |
| GET | `/notifications/unread-count` | Get unread count |
| POST | `/notifications` | Create notification |
| PUT | `/notifications/:id/read` | Mark as read |
| PUT | `/notifications/mark-all-read` | Mark all as read |
| DELETE | `/notifications/:id` | Delete notification |
| POST | `/notifications/check-low-stock` | Trigger low stock check |

---

## 📊 CloudWatch Alarms

The following alarms are configured to monitor application health:

| Alarm Name | Metric | Threshold | Action |
|------------|--------|-----------|--------|
| `StockPilot-EC2-CPU-High` | EC2 CPU Utilization | > 80% | Email notification |
| `StockPilot-RDS-CPU-High` | RDS CPU Utilization | > 80% | Email notification |
| `StockPilot-RDS-FreeStorage-Low` | RDS Free Storage | < 2GB | Email notification |

**Alert Email:** Swarajbangar77@gmail.com

---

## 🖼️ Screenshots

<details>
<summary>Click to view screenshots</summary>

### Dashboard
![Dashboard](assets/image-32c67bc1-4e9a-4bc4-9475-beb1e8132b1f.png)

### Inventory Management
![Inventory](assets/image-6287ffa1-d04f-43cb-866f-3c05755f0bbb.png)

</details>

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## 📧 Contact

**Swaraj Bangar**
- Email: [Swarajbangar77@gmail.com](mailto:Swarajbangar77@gmail.com)
- Project Link: [https://github.com/YOUR_USERNAME/StockPilot](https://github.com/YOUR_USERNAME/StockPilot)
- Live Demo: [https://main.d47qigns6kh3.amplifyapp.com](https://main.d47qigns6kh3.amplifyapp.com)

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**⭐ If you found this project helpful, please give it a star! ⭐**

© 2025 StockPilot. All rights reserved.

</div>
