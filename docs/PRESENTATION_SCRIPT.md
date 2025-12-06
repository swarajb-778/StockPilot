# StockPilot - Complete Presentation Script (25-30 Minutes)

---

## 📋 Presentation Overview

| Section | Duration | Topics |
|---------|----------|--------|
| 1. Introduction | 2 min | Project overview, problem statement |
| 2. Tech Stack | 2 min | Technologies used |
| 3. Live Demo | 8 min | Landing → Sign Up → Dashboard → All Routes |
| 4. AWS Services | 10 min | All 9 services with demonstration |
| 5. Architecture & Relationships | 3 min | How services connect |
| 6. Performance & Monitoring | 3 min | CloudWatch, Alarms |
| 7. Conclusion | 2 min | Summary, future scope |
| **Total** | **30 min** | |

---

## 🎬 SECTION 1: Introduction (2 Minutes)

### [0:00 - 2:00] Opening & Project Overview

**NAVIGATE TO:** https://main.d47qigns6kh3.amplifyapp.com

---

**SCRIPT:**

> "Good [morning/afternoon], everyone. Today I'm going to present **StockPilot** - a comprehensive, cloud-native inventory management dashboard that I've built using modern web technologies and deployed entirely on AWS Free Tier services.

> **What is StockPilot?**
> StockPilot is a full-stack web application designed to help small to medium-sized businesses efficiently manage their inventory operations. It provides real-time insights into stock levels, sales performance, expense tracking, and automated low-stock notifications.

> **The Problem We're Solving:**
> Many small businesses still rely on spreadsheets or manual methods to track inventory. This leads to:
> - Human errors in stock counting
> - Delayed awareness of low stock situations
> - No centralized view of inventory health
> - Difficulty in tracking expenses and sales trends

> **Our Solution:**
> StockPilot addresses these challenges by providing:
> - A beautiful, intuitive dashboard with real-time analytics
> - Automated email notifications when stock falls below threshold
> - Complete product management with image support
> - Expense tracking with category breakdowns
> - User management with secure authentication

> This project demonstrates the practical implementation of a **three-tier architecture** using AWS cloud services, showcasing how modern applications can be built cost-effectively using Free Tier resources."

---

## 🛠️ SECTION 2: Tech Stack Overview (2 Minutes)

### [2:00 - 4:00] Technologies Used

**STAY ON:** Landing Page (scroll to features section if visible)

---

**SCRIPT:**

> "Before we dive into the demo, let me quickly walk you through the technology stack powering StockPilot.

> **Frontend Technologies:**
> - **Next.js 14** - React framework with server-side rendering for fast page loads
> - **TypeScript** - For type-safe code and better developer experience
> - **Redux Toolkit with RTK Query** - State management and API data fetching with automatic caching
> - **Tailwind CSS** - Utility-first CSS framework for rapid UI development
> - **Clerk** - Production-ready authentication service
> - **Framer Motion** - Smooth animations and transitions

> **Backend Technologies:**
> - **Node.js 18** with **Express.js** - RESTful API server
> - **Prisma ORM** - Type-safe database operations
> - **PostgreSQL** - Production-grade relational database
> - **AWS SDK v3** - Integration with AWS services

> **AWS Services (9 Free Tier Services):**
> 1. AWS Amplify - Frontend hosting
> 2. Amazon EC2 - Backend server
> 3. Amazon RDS - PostgreSQL database
> 4. Amazon S3 - Product image storage
> 5. Amazon CloudFront - CDN for fast content delivery
> 6. Amazon SNS - Push notifications
> 7. Amazon SES - Email notifications
> 8. Amazon CloudWatch - Monitoring and alarms
> 9. AWS Systems Manager Parameter Store - Secrets management

> Now, let me show you the application in action."

---

## 🖥️ SECTION 3: Live Application Demo (8 Minutes)

### [4:00 - 5:30] Landing Page

**NAVIGATE TO:** https://main.d47qigns6kh3.amplifyapp.com

---

**SCRIPT:**

> "This is our landing page, the first thing users see when they visit StockPilot.

> **Design Highlights:**
> - Clean, modern design with a dark theme
> - Clear value proposition in the hero section
> - Prominent call-to-action buttons - 'Get Started' and 'Learn More'
> - The StockPilot logo which represents our brand identity

> **Technical Implementation:**
> - This page is server-side rendered by Next.js for optimal SEO
> - The smooth animations you see are powered by Framer Motion
> - The styling uses Tailwind CSS utility classes
> - It's fully responsive - works on desktop, tablet, and mobile

> Let me click on 'Get Started' to show you the authentication flow."

---

### [5:30 - 7:00] Authentication (Sign Up & Sign In)

**CLICK:** "Get Started" button

**NAVIGATE TO:** https://main.d47qigns6kh3.amplifyapp.com/sign-up

---

**SCRIPT:**

> "This is our sign-up page powered by **Clerk** authentication.

> **Why Clerk?**
> - Production-ready authentication out of the box
> - Handles security best practices - password hashing, session management
> - Supports multiple authentication methods - email, Google, GitHub
> - Beautiful pre-built UI components
> - Webhook support for user events

> **Features Available:**
> - Email and password registration
> - Social login options (Google, GitHub if configured)
> - Email verification
> - Secure session management

> Let me show you the sign-in page as well."

**NAVIGATE TO:** https://main.d47qigns6kh3.amplifyapp.com/sign-in

> "The sign-in page has the same clean design. After successful authentication, users are redirected to the dashboard.

> **Security Features:**
> - Protected routes - you cannot access dashboard without logging in
> - JWT tokens for API authentication
> - Automatic session refresh

> Let me log in and show you the main dashboard."

**[Login with your credentials]**

---

### [7:00 - 9:00] Dashboard

**NAVIGATE TO:** https://main.d47qigns6kh3.amplifyapp.com/dashboard

---

**SCRIPT:**

> "Welcome to the main dashboard - the heart of StockPilot.

> **Key Performance Indicators (Top Row):**
> Looking at the top section, we have four KPI cards:
> 1. **Total Revenue** - Sum of all sales with percentage change indicator
> 2. **Total Expenses** - Overall expense tracking
> 3. **Pending Orders** - Orders awaiting fulfillment
> 4. **Active Products** - Number of products in inventory

> **Sales Summary Chart:**
> This chart shows sales trends over time. It's built using **Recharts** library. You can see the visual representation of sales performance which helps in identifying patterns.

> **Purchase Summary:**
> Adjacent to sales, we track purchases - money going out for restocking inventory.

> **Expense Breakdown (Pie Chart):**
> This pie chart breaks down expenses by category:
> - Office Supplies
> - Professional Services
> - Salaries
> - and more...

> This helps identify where the money is being spent.

> **Popular Products Section:**
> At the bottom, we display the top-performing products based on sales and ratings.

> **Technical Implementation:**
> - Data is fetched using RTK Query with automatic caching
> - The dashboard metrics come from our `/dashboard` API endpoint
> - Charts are interactive and responsive
> - Real-time updates when data changes"

---

### [9:00 - 10:00] Inventory Management

**NAVIGATE TO:** https://main.d47qigns6kh3.amplifyapp.com/inventory

---

**SCRIPT:**

> "This is the Inventory Management page - where you track all your products.

> **Features:**
> - **Data Grid** powered by Material UI DataGrid
> - **Search functionality** - quickly find products
> - **Sorting** - click column headers to sort
> - **Pagination** - handles large datasets efficiently

> **Product Information Displayed:**
> - Product name with image thumbnail
> - Price
> - Current stock quantity (highlighted if low)
> - Rating
> - Category

> **Low Stock Highlighting:**
> Products with stock below the threshold are highlighted, making it easy to identify items that need restocking.

> **Product Details Modal:**
> Clicking on a product opens a detailed view with full description and larger image."

---

### [10:00 - 10:45] Products Page

**NAVIGATE TO:** https://main.d47qigns6kh3.amplifyapp.com/products

---

**SCRIPT:**

> "The Products page provides a different view of our inventory.

> **CRUD Operations:**
> From here, you can:
> - **Create** new products
> - **Read** product details
> - **Update** existing products
> - **Delete** products

> **Product Cards:**
> Each product is displayed as a card showing:
> - Product image (served from S3 via CloudFront)
> - Name and price
> - Stock status
> - Rating stars

> **Image Storage:**
> All product images are stored in Amazon S3 and served through CloudFront CDN for fast loading worldwide."

---

### [10:45 - 11:15] Expenses Page

**NAVIGATE TO:** https://main.d47qigns6kh3.amplifyapp.com/expenses

---

**SCRIPT:**

> "The Expenses page helps track business expenditures.

> **Expense Categories:**
> We track expenses across multiple categories:
> - Office Supplies
> - Professional Services
> - Salaries
> - Transportation
> - Utilities

> **Visualization:**
> The pie chart provides an instant visual breakdown of where money is being spent.

> **Use Case:**
> This helps business owners understand their cost structure and identify areas for potential savings."

---

### [11:15 - 11:45] Users Page

**NAVIGATE TO:** https://main.d47qigns6kh3.amplifyapp.com/users

---

**SCRIPT:**

> "The Users page shows all registered users in the system.

> **User Information:**
> - User name
> - Email address
> - Profile picture (if available)

> **Integration with Clerk:**
> User data is synced between Clerk authentication and our database, ensuring consistency."

---

### [11:45 - 12:00] Settings & Sidebar Navigation

**Show sidebar navigation**

---

**SCRIPT:**

> "Finally, let me highlight the navigation and settings.

> **Sidebar:**
> - Collapsible for more screen space
> - Clear icons for each section
> - Active state highlighting

> **Settings Page:**
> Would contain user preferences, notification settings, and theme toggle.

> **Notification Bell:**
> Shows real-time notifications including low stock alerts.

> That completes our application walkthrough. Now let's dive into the AWS infrastructure powering all of this."

---

## ☁️ SECTION 4: AWS Services Deep Dive (10 Minutes)

### [12:00 - 12:30] AWS Console Overview

**NAVIGATE TO:** https://us-west-1.console.aws.amazon.com/console/home?region=us-west-1

---

**SCRIPT:**

> "Now let's look at the AWS infrastructure. I'm using 9 AWS Free Tier services to run this entire application at zero cost.

> Let me walk you through each service, explaining:
> - What it does
> - Why we chose it
> - How it's configured
> - Its impact on the application"

---

### [12:30 - 14:00] Service 1: AWS Amplify (Frontend Hosting)

**NAVIGATE TO:** https://us-west-1.console.aws.amazon.com/amplify/apps/d47qigns6kh3

---

**SCRIPT:**

> "**AWS Amplify** hosts our Next.js frontend application.

> **What it does:**
> Amplify is a complete solution for hosting modern web applications. It provides CI/CD, hosting, and preview environments.

> **Why we chose it:**
> - Zero configuration for Next.js - it auto-detects the framework
> - Built-in CI/CD - automatically deploys when I push to GitHub
> - Free SSL certificates
> - Preview deployments for pull requests
> - Excellent free tier - 1,000 build minutes, 5 GB hosting

> **Configuration:**
> - Connected to our GitHub repository
> - App root set to `client/` folder
> - Environment variables configured for API URL and Clerk keys

> **Impact on Application:**
> - Users get fast page loads due to global CDN
> - Automatic deployments mean quick iteration
> - SSL ensures secure connections

> You can see here the deployment history, build logs, and the domain assigned to our app."

**SHOW:** Deployments tab, Build settings, Environment variables

---

### [14:00 - 15:30] Service 2: Amazon EC2 (Backend Server)

**NAVIGATE TO:** https://us-west-1.console.aws.amazon.com/ec2/home?region=us-west-1#Instances:

---

**SCRIPT:**

> "**Amazon EC2** runs our Express.js backend server.

> **What it does:**
> EC2 provides virtual servers in the cloud. Think of it as renting a computer that runs 24/7 in AWS data centers.

> **Why we chose it:**
> - Full control over the server environment
> - Can install Node.js, PM2, and any dependencies
> - Persistent server - no cold starts like serverless
> - Free tier gives 750 hours per month - enough to run one instance 24/7

> **Our Configuration:**
> - Instance Type: t2.micro (1 vCPU, 1 GB RAM)
> - Operating System: Amazon Linux 2023
> - Public IP: 54.176.27.132
> - Running PM2 for process management

> **Security Group Rules:**
> - SSH (22) - for server management
> - Custom TCP (8000) - for API access

> **Impact on Application:**
> - Handles all API requests from the frontend
> - Processes business logic
> - Communicates with database and other AWS services

> Let me show you the instance details and monitoring."

**SHOW:** Instance details, Security groups, Monitoring tab

---

### [15:30 - 17:00] Service 3: Amazon RDS (Database)

**NAVIGATE TO:** https://us-west-1.console.aws.amazon.com/rds/home?region=us-west-1#databases:

---

**SCRIPT:**

> "**Amazon RDS** hosts our PostgreSQL database.

> **What it does:**
> RDS is a managed database service. AWS handles backups, patches, and maintenance automatically.

> **Why we chose it:**
> - Managed service - no database administration headaches
> - Automatic daily backups with 7-day retention
> - PostgreSQL is production-grade, unlike SQLite we used in development
> - Database runs in a private subnet - not directly accessible from internet

> **Our Configuration:**
> - Engine: PostgreSQL 15
> - Instance Class: db.t3.micro
> - Storage: 20 GB SSD
> - Multi-AZ: No (to stay in free tier)

> **Database Schema:**
> We have tables for:
> - Users
> - Products
> - Sales
> - Purchases
> - Expenses
> - Notifications

> **Impact on Application:**
> - Reliable data storage
> - Fast query performance
> - Data durability and automatic backups

> Let me show you the database details and monitoring metrics."

**SHOW:** Database details, Configuration tab, Monitoring

---

### [17:00 - 18:00] Service 4: Amazon S3 (Storage)

**NAVIGATE TO:** https://s3.console.aws.amazon.com/s3/buckets/stockpilot-images-317635640887?region=us-west-1

---

**SCRIPT:**

> "**Amazon S3** stores all our product images.

> **What it does:**
> S3 is object storage for files - images, videos, documents. It's infinitely scalable.

> **Why we chose it:**
> - Unlimited storage capacity
> - Direct URL access for images
> - Integrates seamlessly with CloudFront
> - Very cost-effective - 5 GB free

> **Our Configuration:**
> - Bucket Name: stockpilot-images-317635640887
> - Region: us-west-1
> - Folder structure: products/ for product images

> **Impact on Application:**
> - Product images load quickly
> - No strain on EC2 server for serving images
> - Can handle any number of products

> Here you can see our bucket structure and the product images stored."

**SHOW:** Bucket contents, Objects in products/ folder

---

### [18:00 - 18:45] Service 5: Amazon CloudFront (CDN)

**NAVIGATE TO:** https://us-east-1.console.aws.amazon.com/cloudfront/v4/home#/distributions

---

**SCRIPT:**

> "**Amazon CloudFront** is our Content Delivery Network.

> **What it does:**
> CloudFront caches content at edge locations worldwide, making your app faster for users everywhere.

> **Why we chose it:**
> - Faster load times - content served from nearest edge location
> - Reduces S3 costs - fewer direct requests
> - Free HTTPS certificates
> - 50 GB free transfer monthly

> **Our Configuration:**
> - Origin: Our S3 bucket
> - Cache Policy: Optimized for images
> - HTTPS enforced

> **Impact on Application:**
> - Product images load in milliseconds
> - Users worldwide get consistent performance
> - Reduces bandwidth costs

> The distribution domain is what we use in our frontend to load images."

**SHOW:** Distribution details, Origins, Behaviors

---

### [18:45 - 19:30] Service 6: Amazon SNS (Notifications)

**NAVIGATE TO:** https://us-west-1.console.aws.amazon.com/sns/v3/home?region=us-west-1#/topics

---

**SCRIPT:**

> "**Amazon SNS** handles our notification system.

> **What it does:**
> SNS is a pub/sub messaging service - publish once, deliver to multiple subscribers.

> **Why we chose it:**
> - Decouples notification logic from main application
> - Multiple delivery protocols - email, SMS, HTTP
> - Integration with CloudWatch for system alerts
> - 1 million messages free monthly

> **Our Topics:**
> 1. **stockpilot-stock-alerts** - Low inventory notifications
> 2. **stockpilot-system-alerts** - CloudWatch alarm notifications

> **How it works:**
> When stock falls below threshold → Backend publishes to SNS → SNS delivers to email subscribers

> **Impact on Application:**
> - Managers get instant alerts about low stock
> - System issues trigger automatic notifications
> - Never miss critical inventory situations"

**SHOW:** Topics list, Subscriptions

---

### [19:30 - 20:00] Service 7: Amazon SES (Email)

**NAVIGATE TO:** https://us-west-1.console.aws.amazon.com/ses/home?region=us-west-1#/homepage

---

**SCRIPT:**

> "**Amazon SES** sends our email notifications.

> **What it does:**
> SES is a cloud-based email sending service with high deliverability.

> **Why we chose it:**
> - 62,000 emails free when sending from EC2
> - High deliverability rates
> - Integrates with SNS
> - Production-ready email infrastructure

> **Use Cases:**
> - Low stock alert emails
> - System notification emails
> - Future: Order confirmations, reports

> **Impact on Application:**
> - Reliable email delivery
> - Professional notification system
> - Keeps stakeholders informed"

**SHOW:** Dashboard, Sending statistics

---

### [20:00 - 21:00] Service 8: Amazon CloudWatch (Monitoring)

**NAVIGATE TO:** https://us-west-1.console.aws.amazon.com/cloudwatch/home?region=us-west-1#home:

---

**SCRIPT:**

> "**Amazon CloudWatch** is our monitoring and observability solution.

> **What it does:**
> CloudWatch collects metrics, logs, and events from AWS resources.

> **Why we chose it:**
> - Centralized logging from EC2
> - Real-time metrics on CPU, memory, network
> - Automated alarms when thresholds are breached
> - Visual dashboards

> **Our Configuration:**
> We have 3 alarms configured:
> 1. EC2 CPU > 80% - triggers if server is overloaded
> 2. RDS CPU > 80% - triggers if database is stressed
> 3. RDS Free Storage < 2 GB - triggers before running out of space

> **Impact on Application:**
> - Proactive issue detection
> - Performance visibility
> - Automatic alerts prevent outages

> Let me show you the alarms and metrics."

**NAVIGATE TO:** https://us-west-1.console.aws.amazon.com/cloudwatch/home?region=us-west-1#alarmsV2:

**SHOW:** Alarms list, Alarm details, Metrics explorer

---

### [21:00 - 21:30] Service 9: Parameter Store (Secrets)

**NAVIGATE TO:** https://us-west-1.console.aws.amazon.com/systems-manager/parameters?region=us-west-1

---

**SCRIPT:**

> "**AWS Systems Manager Parameter Store** manages our secrets and configuration.

> **What it does:**
> Secure, hierarchical storage for configuration data and secrets.

> **Why we chose it:**
> - Free for standard parameters
> - Encryption with AWS KMS
> - Version control for configs
> - Centralized management

> **Parameters Stored:**
> - Database connection string
> - S3 bucket name
> - SNS topic ARNs
> - Other sensitive configuration

> **Impact on Application:**
> - Secrets never stored in code
> - Easy rotation of credentials
> - Audit trail for changes"

**SHOW:** Parameters list (names only, not values)

---

## 🔗 SECTION 5: Architecture & Service Relationships (3 Minutes)

### [21:30 - 24:30] How Services Connect

**NAVIGATE TO:** Show the architecture diagram or whiteboard

---

**SCRIPT:**

> "Now let me explain how all these services work together as a cohesive system.

> **User Request Flow:**

> 1. **User opens the application**
>    - Browser requests → CloudFront → Amplify
>    - Static assets (HTML, JS, CSS) served from Amplify
>    - Page renders in browser

> 2. **User views products with images**
>    - Frontend requests images → CloudFront
>    - CloudFront checks cache
>    - Cache miss → CloudFront fetches from S3 → Caches → Serves
>    - Cache hit → Serves directly from edge location

> 3. **User performs actions (view dashboard, add product)**
>    - Frontend makes API call → EC2 backend
>    - EC2 authenticates request
>    - EC2 queries RDS database
>    - RDS returns data
>    - EC2 sends response to frontend

> 4. **Low stock detected**
>    - EC2 checks stock quantity
>    - Stock below threshold → Creates notification in database
>    - EC2 publishes to SNS topic
>    - SNS triggers SES → Email sent to manager
>    - Frontend shows toast notification

> 5. **Monitoring and Alerts**
>    - CloudWatch continuously monitors EC2 and RDS
>    - Metrics collected every 5 minutes
>    - If threshold breached → Alarm triggers
>    - Alarm action → Publishes to SNS
>    - SNS sends email notification

> **Security Flow:**
> - User credentials → Clerk (external)
> - API secrets → Parameter Store
> - Database in private subnet → Only EC2 can access
> - All public traffic over HTTPS

> **The Three Tiers:**
> 1. **Presentation Tier**: Amplify + CloudFront
> 2. **Application Tier**: EC2
> 3. **Data Tier**: RDS + S3

> This architecture is:
> - **Scalable** - Each component can scale independently
> - **Secure** - Defense in depth
> - **Cost-effective** - Runs entirely on free tier
> - **Maintainable** - Clear separation of concerns"

---

## 📊 SECTION 6: Performance & Monitoring Demo (3 Minutes)

### [24:30 - 27:30] CloudWatch Deep Dive

**NAVIGATE TO:** https://us-west-1.console.aws.amazon.com/cloudwatch/home?region=us-west-1#metricsV2

---

**SCRIPT:**

> "Let me demonstrate the performance monitoring in detail.

> **EC2 Metrics:**
> Here we can see the CPU utilization of our backend server. As you can see, it's running smoothly under normal load."

**SHOW:** EC2 CPU Utilization metric

> "We can also see:
> - Network In/Out - Data transferred
> - Status Checks - Server health
> - Disk operations - Read/write performance"

**NAVIGATE TO:** https://us-west-1.console.aws.amazon.com/cloudwatch/home?region=us-west-1#alarmsV2:

> "**Our Configured Alarms:**

> 1. **EC2 CPU High Alarm**
>    - Triggers when CPU exceeds 80% for 5 minutes
>    - Action: Send email via SNS
>    - Currently in OK state

> 2. **RDS CPU High Alarm**
>    - Same threshold for database
>    - Helps identify slow query issues

> 3. **RDS Storage Low Alarm**
>    - Triggers when storage falls below 2 GB
>    - Prevents database from running out of space

> **Why This Matters:**
> - Proactive monitoring prevents outages
> - We know about issues before users report them
> - Historical data helps with capacity planning"

**NAVIGATE TO:** https://us-west-1.console.aws.amazon.com/cloudwatch/home?region=us-west-1#logsV2:log-groups

> "**Application Logs:**
> CloudWatch Logs stores our application logs. We can search for errors, trace requests, and debug issues without SSH-ing into the server."

---

## 🎯 SECTION 7: Conclusion (2.5 Minutes)

### [27:30 - 30:00] Summary & Future Scope

**NAVIGATE TO:** https://main.d47qigns6kh3.amplifyapp.com

---

**SCRIPT:**

> "Let me summarize what we've covered today.

> **What We Built:**
> StockPilot - A full-stack, cloud-native inventory management system with:
> - Modern React frontend with Next.js
> - Express.js REST API backend
> - PostgreSQL database
> - Real-time analytics dashboard
> - Automated low-stock notifications
> - Comprehensive monitoring

> **Technologies Demonstrated:**
> - Frontend: Next.js, TypeScript, Redux, Tailwind CSS
> - Backend: Node.js, Express, Prisma ORM
> - Cloud: 9 AWS Free Tier services

> **Key Achievements:**
> 1. **Zero Cost Infrastructure** - Entire application runs on AWS Free Tier
> 2. **Production Ready** - Proper security, monitoring, and scalability
> 3. **Real-world Architecture** - Three-tier cloud-native design
> 4. **Automated Operations** - CI/CD, monitoring, alerting

> **Challenges Overcome:**
> - Database migration from SQLite to PostgreSQL
> - CORS configuration for cross-origin requests
> - Environment variable management across environments
> - Setting up proper VPC networking

> **Future Enhancements:**
> - Barcode scanning for inventory
> - Mobile application using React Native
> - PDF report generation
> - Multi-warehouse support
> - Advanced analytics with AI predictions

> **Live URLs:**
> - Frontend: https://main.d47qigns6kh3.amplifyapp.com
> - Backend API: http://54.176.27.132:8000
> - GitHub: https://github.com/swarajb-778/StockPilot

> **Conclusion:**
> This project demonstrates that with modern tools and cloud services, we can build production-grade applications that are:
> - **Scalable** - Ready to handle growth
> - **Secure** - Following best practices
> - **Cost-effective** - Entirely within free tier
> - **Maintainable** - Clean architecture and code

> Thank you for your attention. I'm happy to answer any questions."

---

## 📑 QUICK REFERENCE: All Navigation Links

### Application Links
| Page | URL |
|------|-----|
| Landing Page | https://main.d47qigns6kh3.amplifyapp.com |
| Sign Up | https://main.d47qigns6kh3.amplifyapp.com/sign-up |
| Sign In | https://main.d47qigns6kh3.amplifyapp.com/sign-in |
| Dashboard | https://main.d47qigns6kh3.amplifyapp.com/dashboard |
| Inventory | https://main.d47qigns6kh3.amplifyapp.com/inventory |
| Products | https://main.d47qigns6kh3.amplifyapp.com/products |
| Expenses | https://main.d47qigns6kh3.amplifyapp.com/expenses |
| Users | https://main.d47qigns6kh3.amplifyapp.com/users |
| Settings | https://main.d47qigns6kh3.amplifyapp.com/settings |
| Backend API | http://54.176.27.132:8000 |

### AWS Console Links (in presentation order)
| Service | URL |
|---------|-----|
| AWS Console Home | https://us-west-1.console.aws.amazon.com/console/home?region=us-west-1 |
| Amplify Console | https://us-west-1.console.aws.amazon.com/amplify/apps/d47qigns6kh3 |
| EC2 Instances | https://us-west-1.console.aws.amazon.com/ec2/home?region=us-west-1#Instances: |
| RDS Databases | https://us-west-1.console.aws.amazon.com/rds/home?region=us-west-1#databases: |
| S3 Bucket | https://s3.console.aws.amazon.com/s3/buckets/stockpilot-images-317635640887?region=us-west-1 |
| CloudFront | https://us-east-1.console.aws.amazon.com/cloudfront/v4/home#/distributions |
| SNS Topics | https://us-west-1.console.aws.amazon.com/sns/v3/home?region=us-west-1#/topics |
| SES Dashboard | https://us-west-1.console.aws.amazon.com/ses/home?region=us-west-1#/homepage |
| CloudWatch Home | https://us-west-1.console.aws.amazon.com/cloudwatch/home?region=us-west-1#home: |
| CloudWatch Alarms | https://us-west-1.console.aws.amazon.com/cloudwatch/home?region=us-west-1#alarmsV2: |
| CloudWatch Metrics | https://us-west-1.console.aws.amazon.com/cloudwatch/home?region=us-west-1#metricsV2 |
| CloudWatch Logs | https://us-west-1.console.aws.amazon.com/cloudwatch/home?region=us-west-1#logsV2:log-groups |
| Parameter Store | https://us-west-1.console.aws.amazon.com/systems-manager/parameters?region=us-west-1 |

---

## 🎤 Presentation Tips

### Before the Presentation:
1. ✅ Login to AWS Console in browser
2. ✅ Login to StockPilot application
3. ✅ Open all AWS service tabs in advance
4. ✅ Clear browser cache for fresh demo
5. ✅ Test all links work
6. ✅ Have backup screenshots ready

### During the Presentation:
1. Speak slowly and clearly
2. Point to specific elements on screen
3. Pause after each major section
4. Make eye contact with audience
5. Be ready to handle questions

### Common Questions to Prepare For:
1. "Why did you choose AWS over other cloud providers?"
2. "How does the authentication work?"
3. "What happens if the EC2 server goes down?"
4. "How do you handle database backups?"
5. "What's the estimated cost after free tier expires?"
6. "How would you scale this for more users?"

### Backup Answers:
1. **AWS vs Others**: AWS has the most comprehensive free tier, excellent documentation, and is industry standard.
2. **Authentication**: Clerk handles all auth - tokens, sessions, security. We just verify tokens on backend.
3. **EC2 Down**: CloudWatch alarm triggers, email sent. Could add auto-scaling for production.
4. **Backups**: RDS automatic daily backups with 7-day retention.
5. **Cost After Free Tier**: ~$30-50/month for this scale (EC2 + RDS primarily).
6. **Scaling**: Add load balancer, multiple EC2 instances, RDS read replicas.

---

**© 2025 StockPilot. All rights reserved.**

*Presentation Script - December 2025*

