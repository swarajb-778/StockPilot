# 🚀 AWS Free Tier Deployment Guide for StockPilot

## Overview

This guide covers deploying your StockPilot inventory management system using **9 AWS Free Tier services** for your academic project (2-3 months until March).

> ⚠️ **Important**: All services listed are within AWS Free Tier limits. Monitor your usage via AWS Billing Dashboard to avoid unexpected charges.

---

## 🏗️ Architecture Overview

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
│    │  │   │             - REST API Server                         │     │  │     │
│    │  │   └──────────────────────────────────────────────────────┘     │  │     │
│    │  └────────────────────────────────────────────────────────────────┘  │     │
│    │  ┌────────────────────────────────────────────────────────────────┐  │     │
│    │  │                     PRIVATE SUBNET                              │  │     │
│    │  │   ┌──────────────────────────────────────────────────────┐     │  │     │
│    │  │   │            Amazon RDS (db.t2.micro)                   │     │  │     │
│    │  │   │            - PostgreSQL Database                      │     │  │     │
│    │  │   └──────────────────────────────────────────────────────┘     │  │     │
│    │  └────────────────────────────────────────────────────────────────┘  │     │
│    └──────────────────────────────────────────────────────────────────────┘     │
│                                                                                  │
│    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌────────────┐   │
│    │  Amazon S3   │    │   Cognito    │    │  CloudWatch  │    │   SNS      │   │
│    │  (Images)    │    │   (Auth)     │    │  (Logs)      │    │  (Alerts)  │   │
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

## 📋 The 9 AWS Free Tier Services

| # | Service | Free Tier Type | What We're Using It For | Monthly Limit |
|---|---------|----------------|------------------------|---------------|
| 1 | **AWS Amplify** | Always Free | Frontend deployment (Next.js) | 5 GB storage, 1,000 build mins |
| 2 | **Amazon EC2** | 12-Month Free | Backend server (Express.js) | 750 hrs/month (t2.micro) |
| 3 | **Amazon RDS** | 12-Month Free | PostgreSQL database | 750 hrs, 20 GB storage |
| 4 | **Amazon S3** | 12-Month Free | Product images storage | 5 GB, 20,000 GET requests |
| 5 | **Amazon CloudFront** | 12-Month Free | CDN for fast content delivery | 50 GB transfer, 2M requests |
| 6 | **Amazon Cognito** | Always Free | User authentication | 50,000 monthly active users |
| 7 | **Amazon CloudWatch** | Always Free | Monitoring & logging | 10 metrics, 5 GB logs |
| 8 | **AWS Systems Manager Parameter Store** | Always Free | Secrets & config management | 10,000 parameters |
| 9 | **Amazon SNS** | Always Free | Stock alerts & notifications | 1M published messages |

---

## 🔍 Detailed Service Explanation

---

### 1️⃣ AWS Amplify (Frontend Deployment)

#### **What It Does**
AWS Amplify is a complete solution for hosting modern web applications. It's specifically optimized for frameworks like Next.js, React, Vue, and Angular.

#### **Why We're Using It**
- **Zero Configuration**: Automatically detects Next.js and configures build settings
- **CI/CD Built-in**: Automatically deploys when you push to GitHub
- **Server-Side Rendering (SSR)**: Full support for Next.js SSR/SSG features
- **Custom Domains**: Easy to add custom domain with SSL certificates
- **Preview Environments**: Get a unique URL for each pull request

#### **When to Use**
- Hosting your Next.js frontend application
- When you need automatic deployments from Git
- For preview deployments of pull requests

#### **Free Tier Limits**
| Resource | Free Limit |
|----------|------------|
| Build & Deploy | 1,000 build minutes/month |
| Hosting | 5 GB/month |
| Data Transfer | 15 GB/month |

#### **Setup Steps**
```bash
# 1. Push your code to GitHub
# 2. Go to AWS Amplify Console
# 3. Click "New App" → "Host web app"
# 4. Connect your GitHub repository
# 5. Select the 'client' folder as the root
# 6. Amplify auto-detects Next.js settings
# 7. Deploy!
```

#### **Amplify Build Settings (amplify.yml)**
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

#### **Environment Variables to Set in Amplify**
```
NEXT_PUBLIC_API_BASE_URL=https://your-ec2-ip-or-domain:8000
```

---

### 2️⃣ Amazon EC2 (Backend Computing)

#### **What It Does**
EC2 (Elastic Compute Cloud) provides virtual servers in the cloud. Think of it as renting a computer that runs 24/7 in AWS data centers.

#### **Why We're Using It**
- **Full Control**: Complete access to the server (install Node.js, PM2, etc.)
- **Persistent**: Runs continuously, unlike serverless which has cold starts
- **Cost-Effective**: Free tier gives you 750 hours/month (enough to run 1 instance 24/7)
- **Express.js Compatible**: Perfect for running your Node.js backend

#### **When to Use**
- Running your Express.js backend server
- When you need a persistent server (not serverless)
- For running scheduled tasks (cron jobs)
- Database migrations and seeding

#### **Free Tier Limits**
| Resource | Free Limit |
|----------|------------|
| Instance Type | t2.micro (1 vCPU, 1 GB RAM) |
| Hours | 750 hours/month |
| EBS Storage | 30 GB General Purpose (SSD) |

#### **Instance Setup Commands**
```bash
# Connect to EC2 via SSH
ssh -i "your-key.pem" ec2-user@your-ec2-public-ip

# Update system
sudo yum update -y

# Install Node.js 18
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Clone your repository
git clone https://github.com/yourusername/StockPilot.git
cd StockPilot/server

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# Start with PM2
pm2 start npm --name "stockpilot-backend" -- start
pm2 save
pm2 startup
```

#### **Security Group Rules**
```
Inbound Rules:
- SSH (22): Your IP only
- HTTP (80): 0.0.0.0/0
- HTTPS (443): 0.0.0.0/0
- Custom TCP (8000): 0.0.0.0/0 (for API)
```

---

### 3️⃣ Amazon RDS (Database)

#### **What It Does**
RDS (Relational Database Service) is a managed database service. AWS handles backups, patches, and maintenance automatically.

#### **Why We're Using It**
- **Managed Service**: No need to manage database server yourself
- **Automatic Backups**: Daily backups with 7-day retention
- **PostgreSQL Support**: Production-ready database (upgrade from SQLite)
- **Security**: Database in private subnet, not directly accessible from internet

#### **When to Use**
- As your production database (replacing SQLite)
- When you need automated backups
- For better data durability and reliability

#### **Free Tier Limits**
| Resource | Free Limit |
|----------|------------|
| Instance Type | db.t2.micro or db.t3.micro |
| Hours | 750 hours/month |
| Storage | 20 GB General Purpose SSD |
| Backup Storage | 20 GB |

#### **Database Configuration**
```
Engine: PostgreSQL 14 or 15
Instance Class: db.t2.micro
Storage: 20 GB (General Purpose SSD)
Multi-AZ: No (not free tier)
Public Access: No (private subnet)
```

#### **Connection String Format**
```
DATABASE_URL="postgresql://username:password@your-rds-endpoint:5432/stockpilot?schema=public"
```

#### **Prisma Schema Update (SQLite → PostgreSQL)**
```prisma
datasource db {
  provider = "postgresql"  // Changed from "sqlite"
  url      = env("DATABASE_URL")
}
```

---

### 4️⃣ Amazon S3 (Storage)

#### **What It Does**
S3 (Simple Storage Service) is object storage for files like images, videos, documents. It's infinitely scalable and highly durable.

#### **Why We're Using It**
- **Product Images**: Store Nike product images instead of serving from EC2
- **Scalability**: Handles any amount of images without server overhead
- **Direct Access**: Images can be accessed directly via URL
- **CDN Integration**: Works seamlessly with CloudFront

#### **When to Use**
- Storing product images (Nike_Items folder)
- User-uploaded files
- Static assets that don't change often
- Backup storage for exports

#### **Free Tier Limits**
| Resource | Free Limit |
|----------|------------|
| Storage | 5 GB |
| GET Requests | 20,000/month |
| PUT Requests | 2,000/month |

#### **Bucket Configuration**
```javascript
// S3 Bucket Structure
stockpilot-images-bucket/
├── products/
│   ├── nike1.png
│   ├── nike2.png
│   └── ...
├── users/
│   └── profile-pictures/
└── uploads/
    └── temp/
```

#### **CORS Configuration for Bucket**
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["https://your-amplify-domain.amplifyapp.com"],
    "ExposeHeaders": []
  }
]
```

#### **Backend S3 Integration (server/src/utils/s3.ts)**
```typescript
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const uploadToS3 = async (file: Buffer, key: string) => {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Body: file,
    ContentType: "image/png",
  });
  return s3Client.send(command);
};

export const getS3Url = (key: string) => {
  return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};
```

---

### 5️⃣ Amazon CloudFront (CDN)

#### **What It Does**
CloudFront is a Content Delivery Network (CDN) that caches your content at edge locations worldwide, making your app faster for users everywhere.

#### **Why We're Using It**
- **Faster Load Times**: Content served from nearest edge location
- **Reduced S3 Costs**: Fewer direct requests to S3
- **HTTPS**: Free SSL certificates
- **Caching**: Static assets cached at edge

#### **When to Use**
- Serving product images from S3
- As a layer in front of your Amplify app (optional)
- For any static content delivery

#### **Free Tier Limits**
| Resource | Free Limit |
|----------|------------|
| Data Transfer Out | 50 GB/month |
| HTTP/HTTPS Requests | 2,000,000/month |

#### **CloudFront Distribution Settings**
```
Origin Domain: your-s3-bucket.s3.amazonaws.com
Viewer Protocol Policy: Redirect HTTP to HTTPS
Allowed HTTP Methods: GET, HEAD
Cache Policy: CachingOptimized
Price Class: Use Only North America and Europe (cheapest)
```

#### **Example Image URLs**
```
# Direct S3 URL (slower, uses S3 requests)
https://stockpilot-images.s3.us-east-1.amazonaws.com/products/nike1.png

# CloudFront URL (faster, cached at edge)
https://d1234abcd.cloudfront.net/products/nike1.png
```

---

### 6️⃣ Amazon Cognito (Authentication)

#### **What It Does**
Cognito provides user authentication, authorization, and user management. It can replace or complement your existing Clerk authentication.

#### **Why We're Using It**
- **Free for Small Apps**: 50,000 MAUs free (more than enough for academic project)
- **Built-in UI**: Hosted login pages (optional)
- **JWT Tokens**: Standard authentication tokens
- **AWS Integration**: Works seamlessly with other AWS services

#### **When to Use**
- User registration and login
- Password reset flows
- Multi-factor authentication (MFA)
- Social logins (Google, Facebook)

#### **Free Tier Limits**
| Resource | Free Limit |
|----------|------------|
| Monthly Active Users (MAUs) | 50,000 |
| Features | Sign-up, sign-in, password reset |

#### **Cognito User Pool Settings**
```
User Pool Name: stockpilot-users
Sign-in Options: Email
Password Policy:
  - Minimum length: 8
  - Require uppercase: Yes
  - Require lowercase: Yes
  - Require numbers: Yes
  - Require symbols: No
MFA: Optional
```

#### **Frontend Integration (React)**
```typescript
// Install: npm install amazon-cognito-identity-js
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
};

const userPool = new CognitoUserPool(poolData);

export const signIn = (email: string, password: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });
    
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });
    
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: resolve,
      onFailure: reject,
    });
  });
};
```

#### **Note on Clerk vs Cognito**
You can either:
1. **Replace Clerk with Cognito** - Full AWS integration
2. **Keep Clerk** - Simpler to use, already implemented
3. **Use both** - Cognito for AWS service auth, Clerk for app auth

For academic purposes, keeping Clerk and just demonstrating Cognito knowledge is acceptable.

---

### 7️⃣ Amazon CloudWatch (Monitoring)

#### **What It Does**
CloudWatch collects and tracks metrics, logs, and events from AWS resources. It's your monitoring and observability solution.

#### **Why We're Using It**
- **Application Logs**: Centralized logging from EC2
- **Metrics**: CPU, memory, request counts
- **Alerts**: Get notified when something goes wrong
- **Dashboards**: Visualize your application health

#### **When to Use**
- Monitoring EC2 and RDS health
- Debugging production issues
- Setting up alerts for anomalies
- Tracking API request counts

#### **Free Tier Limits**
| Resource | Free Limit |
|----------|------------|
| Custom Metrics | 10 metrics |
| Alarms | 10 alarms |
| Log Data Ingestion | 5 GB/month |
| Dashboard | 3 dashboards |

#### **EC2 CloudWatch Agent Configuration**
```json
{
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
          {
            "file_path": "/home/ec2-user/StockPilot/server/logs/*.log",
            "log_group_name": "stockpilot-backend",
            "log_stream_name": "{instance_id}"
          }
        ]
      }
    }
  },
  "metrics": {
    "metrics_collected": {
      "mem": {
        "measurement": ["mem_used_percent"]
      },
      "cpu": {
        "measurement": ["cpu_usage_active"]
      }
    }
  }
}
```

#### **Useful Alarms to Create**
```
1. EC2 CPU Utilization > 80%
2. RDS CPU Utilization > 80%
3. RDS Free Storage Space < 2 GB
4. Backend Error Log Count > 10/hour
```

---

### 8️⃣ AWS Systems Manager Parameter Store (Secrets)

#### **What It Does**
Parameter Store provides secure, hierarchical storage for configuration data and secrets. It's like a secure key-value store.

#### **Why We're Using It**
- **Free**: No cost for standard parameters
- **Secure**: Encryption with AWS KMS
- **Centralized**: All configs in one place
- **Version Control**: Track changes to parameters

#### **When to Use**
- Storing database credentials
- API keys and secrets
- Environment-specific configurations
- Feature flags

#### **Free Tier Limits**
| Resource | Free Limit |
|----------|------------|
| Standard Parameters | 10,000 parameters |
| Value Size | Up to 4 KB |
| Throughput | 40 requests/second |

#### **Parameter Naming Convention**
```
/stockpilot/production/database/url
/stockpilot/production/database/username
/stockpilot/production/database/password
/stockpilot/production/s3/bucket-name
/stockpilot/production/cognito/user-pool-id
/stockpilot/production/cognito/client-id
```

#### **Retrieving Parameters in Node.js**
```typescript
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

const ssmClient = new SSMClient({ region: process.env.AWS_REGION });

export const getParameter = async (name: string): Promise<string> => {
  const command = new GetParameterCommand({
    Name: name,
    WithDecryption: true,
  });
  
  const response = await ssmClient.send(command);
  return response.Parameter?.Value || "";
};

// Usage
const databaseUrl = await getParameter("/stockpilot/production/database/url");
```

---

### 9️⃣ Amazon SNS (Notifications)

#### **What It Does**
SNS (Simple Notification Service) is a pub/sub messaging service that sends notifications via SMS, email, or push notifications.

#### **Why We're Using It**
- **Stock Alerts**: Notify when inventory is low
- **System Alerts**: CloudWatch alarm notifications
- **Email Notifications**: Send to users or admins
- **Decoupling**: Separate notification logic from main app

#### **When to Use**
- Low stock alerts
- New order notifications
- System error alerts (from CloudWatch)
- Daily/weekly summary emails

#### **Free Tier Limits**
| Resource | Free Limit |
|----------|------------|
| Published Messages | 1,000,000/month |
| HTTP/HTTPS Deliveries | 100,000/month |
| Email Deliveries | 1,000/month |

#### **SNS Topic Structure**
```
stockpilot-notifications
├── stockpilot-stock-alerts      # Low inventory alerts
├── stockpilot-system-alerts     # System errors
└── stockpilot-order-notifications # New orders
```

#### **Backend Integration**
```typescript
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const snsClient = new SNSClient({ region: process.env.AWS_REGION });

export const sendStockAlert = async (productName: string, currentStock: number) => {
  const command = new PublishCommand({
    TopicArn: process.env.SNS_STOCK_ALERTS_TOPIC_ARN,
    Subject: `Low Stock Alert: ${productName}`,
    Message: `Warning: ${productName} has only ${currentStock} units left in stock.`,
  });
  
  return snsClient.send(command);
};

// Trigger in productController when stock is low
if (product.stockQuantity < 10) {
  await sendStockAlert(product.name, product.stockQuantity);
}
```

---

## 📊 Cost Estimation (Free Tier)

For your 2-3 month academic project with low traffic:

| Service | Monthly Cost |
|---------|--------------|
| AWS Amplify | $0 (within free tier) |
| Amazon EC2 | $0 (750 hrs free) |
| Amazon RDS | $0 (750 hrs free) |
| Amazon S3 | $0 (5 GB free) |
| Amazon CloudFront | $0 (50 GB free) |
| Amazon Cognito | $0 (50K MAU free) |
| Amazon CloudWatch | $0 (within limits) |
| Parameter Store | $0 (always free) |
| Amazon SNS | $0 (1M messages free) |
| **Total** | **$0** |

---

## 🔧 Step-by-Step Deployment Order

### Phase 1: Foundation (Day 1)
1. **Create AWS Account** (if you don't have one)
2. **Set up VPC** with public and private subnets
3. **Create Security Groups** for EC2 and RDS
4. **Set up Parameter Store** with all secrets

### Phase 2: Database (Day 1-2)
5. **Launch RDS PostgreSQL** in private subnet
6. **Update Prisma schema** from SQLite to PostgreSQL
7. **Run migrations** on RDS

### Phase 3: Storage (Day 2)
8. **Create S3 Bucket** for product images
9. **Upload Nike_Items** to S3
10. **Create CloudFront Distribution** for S3

### Phase 4: Backend (Day 2-3)
11. **Launch EC2 Instance**
12. **Install Node.js, PM2**
13. **Deploy backend code**
14. **Configure CloudWatch Agent**

### Phase 5: Frontend (Day 3)
15. **Connect Amplify** to GitHub
16. **Configure environment variables**
17. **Deploy frontend**

### Phase 6: Additional Services (Day 3-4)
18. **Set up Cognito User Pool** (optional if keeping Clerk)
19. **Create SNS Topics**
20. **Set up CloudWatch Alarms**

---

## 🔐 Security Best Practices

1. **Never commit AWS credentials** to Git
2. **Use IAM roles** instead of access keys when possible
3. **Enable MFA** on your AWS root account
4. **Keep RDS in private subnet** (no public access)
5. **Use Security Groups** as firewalls
6. **Encrypt data at rest** (RDS and S3)
7. **Use Parameter Store** for all secrets

---

## 📝 Environment Variables Reference

### EC2 Backend (.env)
```bash
# Database (from Parameter Store)
DATABASE_URL=postgresql://user:pass@rds-endpoint:5432/stockpilot

# AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key

# S3
S3_BUCKET_NAME=stockpilot-images

# SNS Topics
SNS_STOCK_ALERTS_TOPIC_ARN=arn:aws:sns:us-east-1:123456789:stockpilot-stock-alerts

# Cognito (if using)
COGNITO_USER_POOL_ID=us-east-1_xxxxx
COGNITO_CLIENT_ID=xxxxxxxxxx
```

### Amplify Frontend
```bash
NEXT_PUBLIC_API_BASE_URL=http://ec2-public-ip:8000
NEXT_PUBLIC_CLOUDFRONT_URL=https://d1234abcd.cloudfront.net
NEXT_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_xxxxx
NEXT_PUBLIC_COGNITO_CLIENT_ID=xxxxxxxxxx
```

---

## 🎓 Academic Project Tips

1. **Document Everything**: Take screenshots of AWS console for your report
2. **Use Tags**: Tag all resources with `Project: StockPilot, Environment: Production`
3. **Monitor Costs**: Check AWS Cost Explorer weekly
4. **Clean Up**: Delete all resources after March to avoid charges
5. **Architecture Diagram**: Include the diagram from this guide in your presentation

---

## ⚠️ Important Free Tier Reminders

- **12-Month Limit**: EC2, RDS, S3, CloudFront free tiers expire 12 months after account creation
- **Single Instance**: Only run ONE t2.micro EC2 and ONE db.t2.micro RDS
- **Regional**: Some free tier limits are regional; use one region (us-east-1 recommended)
- **Billing Alerts**: Set up billing alerts at $1, $5, and $10

### Setting Up Billing Alert
```
1. Go to AWS Budgets
2. Create Budget → Cost Budget
3. Set monthly budget: $5
4. Alert at 80% (=$4)
5. Add your email for notifications
```

---

## 🗑️ Cleanup Checklist (After March)

When your project is complete:

- [ ] Delete Amplify App
- [ ] Terminate EC2 Instance
- [ ] Delete RDS Instance (uncheck "Create final snapshot" to save costs)
- [ ] Empty and Delete S3 Bucket
- [ ] Delete CloudFront Distribution
- [ ] Delete Cognito User Pool
- [ ] Delete SNS Topics
- [ ] Delete CloudWatch Alarms and Log Groups
- [ ] Delete Parameter Store Parameters
- [ ] Delete VPC and associated resources

---

## 📚 Additional Resources

- [AWS Free Tier Details](https://aws.amazon.com/free/)
- [AWS Amplify Next.js Docs](https://docs.amplify.aws/nextjs/)
- [Amazon EC2 User Guide](https://docs.aws.amazon.com/ec2/)
- [Amazon RDS PostgreSQL Guide](https://docs.aws.amazon.com/rds/)
- [AWS SDK for JavaScript v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/)

---

**Created for StockPilot Academic Project**  
**Last Updated: December 2025**
