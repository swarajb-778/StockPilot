# StockPilot - Inventory Management Dashboard

A full-stack inventory management dashboard application built with modern web technologies and AWS services.

## 🚀 Tech Stack

### Frontend
- **Next.js** - React framework for production
- **Redux Toolkit** - State management
- **Redux Toolkit Query** - Data fetching and caching
- **Tailwind CSS** - Utility-first CSS framework
- **Material UI Data Grid** - Advanced data tables

### Backend
- **Node.js** - Runtime environment
- **Prisma** - Modern ORM for database operations
- **Express.js** - Web framework for Node.js
- **Static File Serving** - Product image hosting

### AWS Services (9 Free Tier Services)
- **AWS Amplify** - Frontend hosting with CI/CD
- **Amazon EC2** - Backend server (t3.micro)
- **Amazon RDS** - PostgreSQL database (db.t4g.micro)
- **Amazon CloudFront** - CDN for HTTPS and caching
- **Amazon S3** - Product image storage
- **Amazon CloudWatch** - Monitoring and logging
- **AWS Systems Manager** - Parameter Store for secrets
- **Amazon SNS** - Notifications
- **Amazon Cognito** - User authentication (optional)

## 📋 Features

- Comprehensive inventory tracking
- Real-time dashboard analytics with enhanced visualizations
- User management
- Product management with image support
- Order processing
- Expense tracking with detailed summaries
- Responsive design
- Cloud-based deployment
- Static file serving for product images
- Enhanced dashboard cards with improved data aggregation

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- AWS Account
- Git

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/StockPilot.git
cd StockPilot
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

3. Set up environment variables:
```bash
# Create .env files in both client and server directories
cp .env.example .env
```

4. Run the development servers:
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

## 📁 Project Structure

```
StockPilot/
├── client/          # Next.js frontend application
├── server/          # Node.js backend application
├── docs/            # Documentation
└── README.md        # Project documentation
```

## 🌐 Deployment

### AWS Architecture
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   CloudFront    │────▶│    Amplify      │     │      S3         │
│   (CDN/HTTPS)   │     │   (Frontend)    │     │   (Images)      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│      EC2        │────▶│      RDS        │
│   (Backend)     │     │  (PostgreSQL)   │
└─────────────────┘     └─────────────────┘
```

### Live URLs
- **Frontend**: Deployed on AWS Amplify
- **Backend API**: Running on EC2 with PM2
- **Database**: Amazon RDS PostgreSQL

### Environment Variables
Configure the following in your deployment:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_API_BASE_URL` - Backend API URL
- `CLERK_SECRET_KEY` - Clerk authentication
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key

## 📝 License

MIT License

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or feedback, please reach out to [your-email@example.com]

---

**Status:** ✅ Deployed on AWS

**AWS Services Active:** Amplify, EC2, CloudFront, RDS (4/9)

