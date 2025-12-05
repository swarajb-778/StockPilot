# StockPilot - Installation and Execution Guide

---

## Document Information

| Field | Details |
|-------|---------|
| **Project Name** | StockPilot - Inventory Management Dashboard |
| **Version** | 1.0.0 |
| **Author** | Swaraj Bangar |
| **Email** | Swarajbangar77@gmail.com |
| **Date** | December 2025 |
| **GitHub Repository** | https://github.com/swarajb-778/StockPilot |

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [System Requirements](#2-system-requirements)
3. [Installation Steps](#3-installation-steps)
4. [Configuration](#4-configuration)
5. [Running the Application](#5-running-the-application)
6. [Deployment to AWS](#6-deployment-to-aws)
7. [Troubleshooting](#7-troubleshooting)
8. [Appendix](#8-appendix)

---

## 1. Prerequisites

### 1.1 Required Software

Before installing StockPilot, ensure you have the following software installed on your system:

| Software | Required Version | Download Link |
|----------|-----------------|---------------|
| **Node.js** | v18.0.0 or higher | https://nodejs.org/en/download/ |
| **npm** | v9.0.0 or higher | Included with Node.js |
| **Git** | v2.30.0 or higher | https://git-scm.com/downloads |
| **PostgreSQL** (Local) | v14.0 or higher | https://www.postgresql.org/download/ |
| **VS Code** (Recommended) | Latest | https://code.visualstudio.com/ |

### 1.2 Account Requirements

| Account | Purpose | Sign Up Link |
|---------|---------|--------------|
| **GitHub** | Source code repository | https://github.com/signup |
| **Clerk** | Authentication service | https://clerk.com/sign-up |
| **AWS** | Cloud deployment | https://aws.amazon.com/free/ |

### 1.3 Verifying Prerequisites

Open a terminal/command prompt and run these commands to verify installations:

```bash
# Check Node.js version
node --version
# Expected output: v18.x.x or higher

# Check npm version
npm --version
# Expected output: 9.x.x or higher

# Check Git version
git --version
# Expected output: git version 2.x.x or higher

# Check PostgreSQL (if installed locally)
psql --version
# Expected output: psql (PostgreSQL) 14.x or higher
```

---

## 2. System Requirements

### 2.1 Minimum Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| **Processor** | Dual-core 2.0 GHz | Quad-core 2.5 GHz |
| **RAM** | 4 GB | 8 GB |
| **Storage** | 5 GB free | 10 GB free |
| **Display** | 1280 x 720 | 1920 x 1080 |
| **Internet** | 5 Mbps | 25 Mbps |

### 2.2 Supported Operating Systems

| Operating System | Version |
|-----------------|---------|
| **Windows** | 10/11 (64-bit) |
| **macOS** | Big Sur (11.0) or later |
| **Ubuntu/Linux** | 20.04 LTS or later |

### 2.3 Browser Requirements

| Browser | Minimum Version |
|---------|-----------------|
| **Google Chrome** | 90+ |
| **Mozilla Firefox** | 88+ |
| **Microsoft Edge** | 90+ |
| **Safari** | 14+ |

---

## 3. Installation Steps

### Step 1: Clone the Repository

Open your terminal and navigate to your preferred directory:

```bash
# Navigate to your projects folder
cd ~/Documents/Projects  # or your preferred location

# Clone the repository
git clone https://github.com/swarajb-778/StockPilot.git

# Navigate into the project directory
cd StockPilot
```

**Expected Output:**
```
Cloning into 'StockPilot'...
remote: Enumerating objects: XXX, done.
remote: Counting objects: 100% (XXX/XXX), done.
remote: Compressing objects: 100% (XXX/XXX), done.
remote: Total XXX (delta XXX), reused XXX (delta XXX)
Receiving objects: 100% (XXX/XXX), X.XX MiB | X.XX MiB/s, done.
Resolving deltas: 100% (XXX/XXX), done.
```

### Step 2: Install Frontend Dependencies

```bash
# Navigate to the client folder
cd client

# Install dependencies
npm install
```

**Expected Output:**
```
added XXX packages, and audited XXX packages in XXs
found 0 vulnerabilities
```

**Important Packages Being Installed:**
- next (14.x) - React framework
- @clerk/nextjs - Authentication
- @reduxjs/toolkit - State management
- tailwindcss - CSS framework
- recharts - Charts library

### Step 3: Install Backend Dependencies

```bash
# Navigate to the server folder
cd ../server

# Install dependencies
npm install
```

**Expected Output:**
```
added XXX packages, and audited XXX packages in XXs
found 0 vulnerabilities
```

**Important Packages Being Installed:**
- express - Web framework
- @prisma/client - Database ORM
- @aws-sdk/* - AWS integrations
- cors - Cross-origin requests
- helmet - Security headers

### Step 4: Set Up the Database

#### Option A: Local SQLite (Development - Easiest)

For quick local development, use SQLite:

```bash
# Ensure you're in the server directory
cd server

# Update prisma schema to use SQLite (if not already)
# Open prisma/schema.prisma and ensure:
# datasource db {
#   provider = "sqlite"
#   url      = env("DATABASE_URL")
# }

# Generate Prisma client
npx prisma generate

# Create database and run migrations
npx prisma migrate dev --name init

# Seed the database with sample data
npx prisma db seed
```

**Expected Output:**
```
✔ Generated Prisma Client
✔ Applied migrations
✔ Seeded database
```

#### Option B: Local PostgreSQL (Production-like)

If you have PostgreSQL installed locally:

```bash
# Create database
psql -U postgres
CREATE DATABASE stockpilot;
\q

# Update DATABASE_URL in server/.env
# DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/stockpilot"

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed database
npx prisma db seed
```

### Step 5: Verify Installation

```bash
# Check that node_modules exists in both folders
ls client/node_modules  # Should show many folders
ls server/node_modules  # Should show many folders

# Check that Prisma client is generated
ls server/node_modules/.prisma/client  # Should exist

# Check database file (if using SQLite)
ls server/prisma/dev.db  # Should exist
```

---

## 4. Configuration

### 4.1 Frontend Configuration

Create the environment file for the frontend:

```bash
# Navigate to client folder
cd client

# Create environment file
touch .env.local
```

Open `.env.local` in your editor and add:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# Clerk Authentication (Get from https://clerk.com/dashboard)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Optional: S3 and CloudFront URLs (for production images)
# NEXT_PUBLIC_S3_PRODUCTS_URL=https://your-bucket.s3.region.amazonaws.com/products
# NEXT_PUBLIC_CLOUDFRONT_URL=https://your-distribution.cloudfront.net
```

### 4.2 Backend Configuration

Create the environment file for the backend:

```bash
# Navigate to server folder
cd ../server

# Create environment file
touch .env
```

Open `.env` in your editor and add:

```env
# Database Configuration
# For SQLite (local development)
DATABASE_URL="file:./dev.db"

# For PostgreSQL (production)
# DATABASE_URL="postgresql://username:password@localhost:5432/stockpilot"

# Server Configuration
PORT=8000
NODE_ENV=development

# AWS Configuration (Optional - for production features)
# AWS_REGION=us-west-1
# S3_BUCKET_NAME=your-bucket-name
# SNS_STOCK_ALERTS_TOPIC_ARN=arn:aws:sns:us-west-1:account:topic
# SNS_SYSTEM_ALERTS_TOPIC_ARN=arn:aws:sns:us-west-1:account:topic
```

### 4.3 Getting Clerk API Keys

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Sign up or log in
3. Create a new application (or select existing)
4. Navigate to **API Keys** in the sidebar
5. Copy the **Publishable Key** and **Secret Key**
6. Paste them in your `.env.local` file

*(Insert Screenshot: Clerk Dashboard API Keys page)*

### 4.4 Configuration Validation

Create a simple test script to validate your configuration:

```bash
# Test frontend env
cd client
cat .env.local | grep -v "^#" | grep -v "^$"

# Test backend env
cd ../server
cat .env | grep -v "^#" | grep -v "^$"
```

---

## 5. Running the Application

### 5.1 Running in Development Mode

You need to run both the frontend and backend servers simultaneously.

#### Terminal 1: Start Backend Server

```bash
# Navigate to server folder
cd server

# Start the development server
npm run dev
```

**Expected Output:**
```
> server@1.0.0 dev
> npm run build && concurrently "npx tsc -w" "nodemon --exec ts-node src/index.ts"

[nodemon] watching path(s): *.*
[nodemon] watching extensions: ts,json
[nodemon] starting `ts-node src/index.ts`
Server running on port 8000
```

#### Terminal 2: Start Frontend Server

Open a new terminal window/tab:

```bash
# Navigate to client folder
cd client

# Start the development server
npm run dev
```

**Expected Output:**
```
> stockpilot@0.1.0 dev
> next dev

  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
  - Environments: .env.local

 ✓ Ready in X.Xs
```

### 5.2 Accessing the Application

Open your web browser and navigate to:

| URL | Description |
|-----|-------------|
| http://localhost:3000 | Frontend Application |
| http://localhost:8000 | Backend API |
| http://localhost:8000/dashboard | API Health Check |

### 5.3 First-Time Usage

1. **Open the Application**: Go to http://localhost:3000
2. **View Landing Page**: You'll see the StockPilot landing page
3. **Sign Up**: Click "Get Started" to create an account
4. **Complete Registration**: Fill in your details via Clerk
5. **Access Dashboard**: After signing in, you'll be redirected to the dashboard

### 5.4 Running in Production Mode

#### Build Frontend

```bash
cd client
npm run build
npm run start
```

#### Build Backend

```bash
cd server
npm run build
npm run start
```

### 5.5 Running Both Servers Together (Alternative)

You can use a tool like `concurrently` to run both from root:

```bash
# Install concurrently globally
npm install -g concurrently

# From project root
concurrently "cd server && npm run dev" "cd client && npm run dev"
```

---

## 6. Deployment to AWS

### 6.1 AWS Account Setup

1. **Create AWS Account**: https://aws.amazon.com/free/
2. **Enable MFA**: Go to IAM → Your Security Credentials → Assign MFA device
3. **Create IAM User**: Don't use root account for daily operations
4. **Set Up Billing Alerts**: AWS Budgets → Create Budget

### 6.2 Deploy Frontend to AWS Amplify

#### Step 1: Access AWS Amplify
Navigate to: https://us-west-1.console.aws.amazon.com/amplify/create

#### Step 2: Connect Repository
1. Click **"Create new app"**
2. Select **"Host web app"**
3. Choose **"GitHub"** as the source
4. Authorize AWS to access your GitHub
5. Select your StockPilot repository
6. Select the `main` branch

#### Step 3: Configure Build Settings
AWS will auto-detect Next.js. Verify the settings:

```yaml
version: 1
applications:
  - frontend:
      phases:
        preBuild:
          commands:
            - npm ci
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: .next
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
          - .next/cache/**/*
    appRoot: client
```

#### Step 4: Configure Environment Variables
In Amplify Console → Environment variables, add:

| Variable | Value |
|----------|-------|
| NEXT_PUBLIC_API_BASE_URL | http://your-ec2-ip:8000 |
| NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY | pk_live_your_key |
| CLERK_SECRET_KEY | sk_live_your_key |

#### Step 5: Deploy
Click **"Save and deploy"**

**Screenshot Link**: [Amplify Console](https://us-west-1.console.aws.amazon.com/amplify/apps)

### 6.3 Deploy Backend to EC2

#### Step 1: Launch EC2 Instance
Navigate to: https://us-west-1.console.aws.amazon.com/ec2/home?region=us-west-1#LaunchInstances:

**Instance Configuration:**
| Setting | Value |
|---------|-------|
| AMI | Amazon Linux 2023 |
| Instance Type | t2.micro (Free Tier) |
| Key Pair | Create new or select existing |
| Security Group | Allow SSH (22), HTTP (8000) |
| Storage | 8 GB gp3 |

#### Step 2: Connect to EC2
```bash
# Download your .pem key file
# Set permissions
chmod 400 your-key.pem

# Connect via SSH
ssh -i "your-key.pem" ec2-user@your-ec2-public-ip
```

#### Step 3: Install Dependencies on EC2
```bash
# Update system
sudo yum update -y

# Install Node.js 18
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Verify installation
node --version
npm --version

# Install PM2
sudo npm install -g pm2

# Install Git
sudo yum install -y git
```

#### Step 4: Deploy Application
```bash
# Clone repository
git clone https://github.com/swarajb-778/StockPilot.git
cd StockPilot/server

# Install dependencies
npm install

# Create .env file
nano .env
# Add your environment variables (DATABASE_URL, AWS settings, etc.)

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Build the application
npm run build

# Start with PM2
pm2 start dist/index.js --name "stockpilot-backend"

# Save PM2 process list
pm2 save

# Set PM2 to start on boot
pm2 startup
# Follow the command output to complete setup
```

#### Step 5: Verify Deployment
```bash
# Check PM2 status
pm2 status

# Check logs
pm2 logs stockpilot-backend

# Test API
curl http://localhost:8000
```

**Screenshot Link**: [EC2 Console](https://us-west-1.console.aws.amazon.com/ec2/home?region=us-west-1#Instances:)

### 6.4 Deploy Database to RDS

#### Step 1: Create RDS Instance
Navigate to: https://us-west-1.console.aws.amazon.com/rds/home?region=us-west-1#launch-dbinstance:

**Configuration:**
| Setting | Value |
|---------|-------|
| Engine | PostgreSQL 15 |
| Template | Free Tier |
| Instance | db.t3.micro |
| Storage | 20 GB gp2 |
| Public Access | No |
| VPC | Same as EC2 |

#### Step 2: Configure Security Group
Allow inbound PostgreSQL (5432) from EC2 security group.

#### Step 3: Update Backend Configuration
```bash
# SSH into EC2
ssh -i "your-key.pem" ec2-user@your-ec2-ip

# Update .env
cd StockPilot/server
nano .env

# Update DATABASE_URL
DATABASE_URL="postgresql://username:password@rds-endpoint:5432/stockpilot"

# Run migrations
npx prisma migrate deploy

# Restart server
pm2 restart stockpilot-backend
```

**Screenshot Link**: [RDS Console](https://us-west-1.console.aws.amazon.com/rds/home?region=us-west-1#databases:)

### 6.5 Deployment Verification Checklist

| Check | Command/URL | Expected Result |
|-------|-------------|-----------------|
| Frontend | https://your-app.amplifyapp.com | Landing page loads |
| Backend | http://your-ec2-ip:8000 | API responds |
| Database | Run API query | Data returns |
| Authentication | Try sign in | Clerk works |
| Dashboard | Navigate to /dashboard | Data displays |

---

## 7. Troubleshooting

### 7.1 Common Installation Issues

#### Issue: `npm install` fails with permission errors

**Solution:**
```bash
# On macOS/Linux, fix npm permissions
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules

# Or use nvm to manage Node versions
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

#### Issue: Prisma client generation fails

**Solution:**
```bash
# Remove node_modules and reinstall
rm -rf node_modules
rm package-lock.json
npm install

# Regenerate Prisma client
npx prisma generate
```

#### Issue: Port 3000 or 8000 already in use

**Solution:**
```bash
# Find process using port
lsof -i :3000  # or :8000

# Kill the process
kill -9 <PID>

# Or use different ports
# Frontend: PORT=3001 npm run dev
# Backend: Edit .env PORT=8001
```

### 7.2 Common Runtime Issues

#### Issue: CORS errors in browser console

**Solution:**
Check backend CORS configuration in `server/src/index.ts`:
```typescript
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-amplify-url.amplifyapp.com'],
  credentials: true
}));
```

#### Issue: Authentication not working

**Solution:**
1. Verify Clerk keys in `.env.local`
2. Check that keys match environment (test vs production)
3. Ensure Clerk middleware is properly configured

#### Issue: Database connection failed

**Solution:**
```bash
# Check DATABASE_URL format
# SQLite: file:./dev.db
# PostgreSQL: postgresql://user:pass@host:5432/db

# Verify connection
npx prisma db pull
```

### 7.3 AWS Deployment Issues

#### Issue: Amplify build fails

**Solution:**
1. Check build logs in Amplify Console
2. Verify all environment variables are set
3. Ensure `appRoot: client` is in amplify.yml

#### Issue: EC2 server not responding

**Solution:**
```bash
# Check if server is running
pm2 status

# Check security group allows port 8000
# AWS Console → EC2 → Security Groups → Edit inbound rules

# Check server logs
pm2 logs stockpilot-backend
```

#### Issue: RDS connection timeout

**Solution:**
1. Verify RDS security group allows EC2
2. Check VPC configuration
3. Ensure correct endpoint in DATABASE_URL

---

## 8. Appendix

### 8.1 Project File Structure

```
StockPilot/
├── client/                     # Frontend application
│   ├── src/
│   │   ├── app/               # Next.js pages
│   │   ├── components/        # React components
│   │   ├── lib/               # Utilities
│   │   └── state/             # Redux store
│   ├── public/                # Static files
│   ├── .env.local             # Environment variables
│   └── package.json           # Dependencies
│
├── server/                     # Backend application
│   ├── src/
│   │   ├── controllers/       # Route handlers
│   │   ├── routes/            # API routes
│   │   └── utils/             # Utilities
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema
│   │   └── migrations/        # DB migrations
│   ├── .env                   # Environment variables
│   └── package.json           # Dependencies
│
├── assets/                     # Documentation images
├── docs/                       # Documentation files
└── README.md                   # Project readme
```

### 8.2 API Endpoints Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /dashboard | Dashboard metrics |
| GET | /products | List products |
| POST | /products | Create product |
| PUT | /products/:id | Update product |
| DELETE | /products/:id | Delete product |
| GET | /users | List users |
| POST | /users | Create user |
| GET | /expenses | List expenses |
| GET | /expenses/summary | Expense summary |
| GET | /notifications | List notifications |
| POST | /notifications | Create notification |
| PUT | /notifications/:id/read | Mark as read |
| POST | /notifications/check-low-stock | Check low stock |

### 8.3 Environment Variables Quick Reference

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
```

**Backend (.env):**
```env
DATABASE_URL="file:./dev.db"
PORT=8000
```

### 8.4 Useful Commands

```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run linter

# Backend
npm run dev          # Start with hot reload
npm run build        # Compile TypeScript
npm run start        # Start production server
npm run seed         # Seed database

# Prisma
npx prisma generate  # Generate client
npx prisma migrate dev # Create migration
npx prisma migrate deploy # Apply migrations
npx prisma db seed   # Seed database
npx prisma studio    # Open database GUI

# PM2 (Production)
pm2 start app.js     # Start application
pm2 stop all         # Stop all processes
pm2 restart all      # Restart all
pm2 logs             # View logs
pm2 status           # Check status
```

### 8.5 Contact and Support

For installation issues or questions:

- **Email**: Swarajbangar77@gmail.com
- **GitHub Issues**: https://github.com/swarajb-778/StockPilot/issues
- **Live Demo**: https://main.d47qigns6kh3.amplifyapp.com

---

**© 2025 StockPilot. All rights reserved.**

*Installation Guide - December 2025*

