# AWS Screenshot Links for Documentation

Use these direct links to capture screenshots of working AWS services for your documentation.

---

## Quick Reference Table

| Section | Service | Screenshot Link |
|---------|---------|-----------------|
| Performance | CloudWatch Metrics | [Open →](#1-performance-screenshots) |
| Performance | CloudWatch Alarms | [Open →](#1-performance-screenshots) |
| Functionality | Live Application | [Open →](#2-functionality-screenshots) |
| Frontend | Amplify Console | [Open →](#3-frontend-screenshots) |
| Backend | EC2 Console | [Open →](#4-backend-screenshots) |
| AWS Services | All Services | [Open →](#5-aws-services-screenshots) |

---

## 1. Performance Screenshots

### CloudWatch Dashboard
**Link:** https://us-west-1.console.aws.amazon.com/cloudwatch/home?region=us-west-1#home:

**What to capture:**
- Overview metrics
- Service health indicators

---

### CloudWatch Metrics (EC2)
**Link:** https://us-west-1.console.aws.amazon.com/cloudwatch/home?region=us-west-1#metricsV2:graph=~();query=~'*7bAWS*2fEC2*2cInstanceId*7d

**What to capture:**
- CPU Utilization graph
- Network In/Out graphs
- Status checks

---

### CloudWatch Metrics (RDS)
**Link:** https://us-west-1.console.aws.amazon.com/cloudwatch/home?region=us-west-1#metricsV2:graph=~();query=~'*7bAWS*2fRDS*7d

**What to capture:**
- Database CPU Utilization
- Free Storage Space
- Database Connections

---

### CloudWatch Alarms
**Link:** https://us-west-1.console.aws.amazon.com/cloudwatch/home?region=us-west-1#alarmsV2:

**What to capture:**
- List of configured alarms
- Alarm states (OK, ALARM, INSUFFICIENT_DATA)
- EC2 CPU High alarm
- RDS CPU High alarm
- RDS Storage Low alarm

---

### CloudWatch Alarm Details
**Links:**
- EC2 CPU Alarm: https://us-west-1.console.aws.amazon.com/cloudwatch/home?region=us-west-1#alarmsV2:alarm/StockPilot-EC2-CPU-High
- RDS CPU Alarm: https://us-west-1.console.aws.amazon.com/cloudwatch/home?region=us-west-1#alarmsV2:alarm/StockPilot-RDS-CPU-High
- RDS Storage Alarm: https://us-west-1.console.aws.amazon.com/cloudwatch/home?region=us-west-1#alarmsV2:alarm/StockPilot-RDS-FreeStorage-Low

**What to capture:**
- Alarm configuration
- Threshold settings
- Actions (SNS topics)

---

## 2. Functionality Screenshots

### Live Application - Landing Page
**Link:** https://main.d47qigns6kh3.amplifyapp.com

**What to capture:**
- Landing page hero section
- Features section
- Navigation menu

---

### Live Application - Dashboard
**Link:** https://main.d47qigns6kh3.amplifyapp.com/dashboard

**What to capture:**
- KPI cards (Revenue, Expenses, Orders, Products)
- Sales Summary chart
- Purchase Summary chart
- Expense breakdown pie chart
- Popular Products section

---

### Live Application - Inventory
**Link:** https://main.d47qigns6kh3.amplifyapp.com/inventory

**What to capture:**
- Product data table
- Search/filter functionality
- Stock quantity column
- Product images

---

### Live Application - Products
**Link:** https://main.d47qigns6kh3.amplifyapp.com/products

**What to capture:**
- Product cards/grid
- Product details modal
- Add/Edit product form

---

### Live Application - Expenses
**Link:** https://main.d47qigns6kh3.amplifyapp.com/expenses

**What to capture:**
- Expense summary
- Category breakdown chart
- Expense list

---

### Live Application - Users
**Link:** https://main.d47qigns6kh3.amplifyapp.com/users

**What to capture:**
- User list/table
- User roles
- User management interface

---

### Backend API - Health Check
**Link:** http://54.176.27.132:8000

**What to capture:**
- API response
- Server running confirmation

---

### Backend API - Dashboard Endpoint
**Link:** http://54.176.27.132:8000/dashboard

**What to capture:**
- JSON response showing dashboard data
- Metrics and summaries

---

## 3. Frontend Screenshots

### Amplify Console - Overview
**Link:** https://us-west-1.console.aws.amazon.com/amplify/apps/d47qigns6kh3

**What to capture:**
- App overview
- Domain information
- Branch deployments

---

### Amplify - Deployments
**Link:** https://us-west-1.console.aws.amazon.com/amplify/apps/d47qigns6kh3/overview

**What to capture:**
- Deployment history
- Build status
- Latest deployment details

---

### Amplify - Build Settings
**Link:** https://us-west-1.console.aws.amazon.com/amplify/apps/d47qigns6kh3/settings/build

**What to capture:**
- Build specification (amplify.yml)
- Build commands
- App root directory

---

### Amplify - Environment Variables
**Link:** https://us-west-1.console.aws.amazon.com/amplify/apps/d47qigns6kh3/settings/environment-variables

**What to capture:**
- List of environment variables (names only, blur values)
- Variable configuration

---

### Amplify - Domain Management
**Link:** https://us-west-1.console.aws.amazon.com/amplify/apps/d47qigns6kh3/settings/domain-management

**What to capture:**
- Custom domain setup
- SSL certificate status
- Subdomain configuration

---

## 4. Backend Screenshots

### EC2 - Instances Dashboard
**Link:** https://us-west-1.console.aws.amazon.com/ec2/home?region=us-west-1#Instances:

**What to capture:**
- Instance list
- Instance state (Running)
- Instance ID and type

---

### EC2 - Instance Details
**Link:** https://us-west-1.console.aws.amazon.com/ec2/home?region=us-west-1#InstanceDetails:instanceId=i-XXXXX
*(Replace i-XXXXX with your actual instance ID)*

**What to capture:**
- Instance summary
- Public IP address
- Instance type (t2.micro)
- VPC and subnet info

---

### EC2 - Security Groups
**Link:** https://us-west-1.console.aws.amazon.com/ec2/home?region=us-west-1#SecurityGroups:

**What to capture:**
- Security group list
- Inbound rules (SSH, HTTP, Custom 8000)
- Outbound rules

---

### EC2 - Monitoring Tab
**Link:** (In EC2 Instance Details → Monitoring tab)

**What to capture:**
- CPU utilization graph
- Network in/out graphs
- Status checks

---

## 5. AWS Services Screenshots

### RDS - Database Dashboard
**Link:** https://us-west-1.console.aws.amazon.com/rds/home?region=us-west-1#databases:

**What to capture:**
- Database list
- DB instance status
- Engine version
- Storage and CPU info

---

### RDS - Database Details
**Link:** https://us-west-1.console.aws.amazon.com/rds/home?region=us-west-1#database:id=stockpilot-db
*(Replace with your actual DB identifier)*

**What to capture:**
- Configuration summary
- Endpoint and port
- Instance class
- Storage details

---

### RDS - Monitoring
**Link:** (In RDS Database Details → Monitoring tab)

**What to capture:**
- CPU Utilization
- Database Connections
- Free Storage Space
- Read/Write IOPS

---

### S3 - Buckets
**Link:** https://s3.console.aws.amazon.com/s3/buckets?region=us-west-1

**What to capture:**
- Bucket list
- stockpilot-images bucket
- Region and access settings

---

### S3 - Bucket Contents
**Link:** https://s3.console.aws.amazon.com/s3/buckets/stockpilot-images-317635640887?region=us-west-1
*(Replace with your actual bucket name)*

**What to capture:**
- Folder structure (products/)
- Product images
- Object count and size

---

### CloudFront - Distributions
**Link:** https://us-east-1.console.aws.amazon.com/cloudfront/v4/home#/distributions

**What to capture:**
- Distribution list
- Distribution status (Enabled)
- Domain name

---

### CloudFront - Distribution Details
**Link:** (Click on your distribution ID)

**What to capture:**
- General settings
- Origin configuration
- Behaviors
- Cache settings

---

### SNS - Topics
**Link:** https://us-west-1.console.aws.amazon.com/sns/v3/home?region=us-west-1#/topics

**What to capture:**
- Topic list
- stockpilot-stock-alerts topic
- stockpilot-system-alerts topic

---

### SNS - Topic Subscriptions
**Link:** https://us-west-1.console.aws.amazon.com/sns/v3/home?region=us-west-1#/subscriptions

**What to capture:**
- Subscription list
- Email subscriptions
- Confirmation status

---

### SES - Dashboard
**Link:** https://us-west-1.console.aws.amazon.com/ses/home?region=us-west-1#/homepage

**What to capture:**
- Sending statistics
- Account status
- Daily sending quota

---

### SES - Verified Identities
**Link:** https://us-west-1.console.aws.amazon.com/ses/home?region=us-west-1#/verified-identities

**What to capture:**
- Verified email addresses
- Verification status

---

### Parameter Store
**Link:** https://us-west-1.console.aws.amazon.com/systems-manager/parameters?region=us-west-1

**What to capture:**
- Parameter list
- Parameter names (hierarchy)
- Types (String, SecureString)

---

### CloudWatch Logs
**Link:** https://us-west-1.console.aws.amazon.com/cloudwatch/home?region=us-west-1#logsV2:log-groups

**What to capture:**
- Log groups list
- stockpilot-backend log group
- Recent log events

---

### VPC - Dashboard
**Link:** https://us-west-1.console.aws.amazon.com/vpc/home?region=us-west-1

**What to capture:**
- VPC overview
- Subnets (public and private)
- Route tables

---

### IAM - Users/Roles
**Link:** https://us-east-1.console.aws.amazon.com/iam/home#/users

**What to capture:**
- IAM users list
- EC2 instance role (if applicable)

---

## Screenshot Tips

### Best Practices:
1. **Blur sensitive data**: AWS account numbers, access keys, passwords
2. **Consistent sizing**: Use same browser window size for all screenshots
3. **Full context**: Capture enough of the screen to show the service name
4. **Clear resolution**: Use high DPI/retina settings if available
5. **Light/Dark mode**: Be consistent with theme across screenshots

### Recommended Tools:
- **macOS**: Command + Shift + 4 (selection) or Command + Shift + 3 (full screen)
- **Windows**: Win + Shift + S (Snipping Tool)
- **Browser Extension**: Full Page Screen Capture

### Image Naming Convention:
```
aws-[service]-[description].png

Examples:
aws-ec2-instances.png
aws-rds-database-details.png
aws-cloudwatch-alarms.png
aws-amplify-deployments.png
```

### Recommended Image Size:
- Width: 1200-1920 pixels
- Format: PNG (for clarity) or JPEG (for smaller file size)
- Quality: At least 72 DPI for screen, 300 DPI for print

---

## All Links in One Place

### Application URLs
| Service | URL |
|---------|-----|
| Frontend (Live) | https://main.d47qigns6kh3.amplifyapp.com |
| Backend API | http://54.176.27.132:8000 |
| GitHub Repository | https://github.com/swarajb-778/StockPilot |

### AWS Console Links (us-west-1 region)
| Service | Direct Link |
|---------|-------------|
| Amplify | https://us-west-1.console.aws.amazon.com/amplify/apps |
| EC2 Instances | https://us-west-1.console.aws.amazon.com/ec2/home?region=us-west-1#Instances: |
| RDS Databases | https://us-west-1.console.aws.amazon.com/rds/home?region=us-west-1#databases: |
| S3 Buckets | https://s3.console.aws.amazon.com/s3/buckets?region=us-west-1 |
| CloudFront | https://us-east-1.console.aws.amazon.com/cloudfront/v4/home#/distributions |
| SNS Topics | https://us-west-1.console.aws.amazon.com/sns/v3/home?region=us-west-1#/topics |
| SES Dashboard | https://us-west-1.console.aws.amazon.com/ses/home?region=us-west-1#/homepage |
| CloudWatch Dashboard | https://us-west-1.console.aws.amazon.com/cloudwatch/home?region=us-west-1#home: |
| CloudWatch Alarms | https://us-west-1.console.aws.amazon.com/cloudwatch/home?region=us-west-1#alarmsV2: |
| CloudWatch Logs | https://us-west-1.console.aws.amazon.com/cloudwatch/home?region=us-west-1#logsV2:log-groups |
| Parameter Store | https://us-west-1.console.aws.amazon.com/systems-manager/parameters?region=us-west-1 |
| VPC Dashboard | https://us-west-1.console.aws.amazon.com/vpc/home?region=us-west-1 |

---

**© 2025 StockPilot. All rights reserved.**

