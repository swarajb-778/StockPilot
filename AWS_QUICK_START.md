# ⚡ AWS Quick Start Guide for StockPilot

## The 9 AWS Free Tier Services at a Glance

| # | Service | What It Does | Why You Need It | Free Tier Limit |
|---|---------|--------------|-----------------|-----------------|
| 1️⃣ | **AWS Amplify** | Hosts Next.js frontend | Zero-config deployment, auto-deploys from Git | 5 GB storage, 1K build mins |
| 2️⃣ | **Amazon EC2** | Runs Express.js backend | Full server control, 24/7 uptime | 750 hrs/month (t2.micro) |
| 3️⃣ | **Amazon RDS** | PostgreSQL database | Managed DB with auto-backups | 750 hrs, 20 GB storage |
| 4️⃣ | **Amazon S3** | Stores product images | Scalable, durable file storage | 5 GB, 20K GET requests |
| 5️⃣ | **CloudFront** | CDN for images | Fast global delivery, caching | 50 GB transfer, 2M requests |
| 6️⃣ | **Cognito** | User authentication | AWS-native auth (optional w/ Clerk) | 50,000 MAUs |
| 7️⃣ | **CloudWatch** | Monitoring & logs | Track errors, set up alerts | 5 GB logs, 10 alarms |
| 8️⃣ | **Parameter Store** | Secrets management | Secure config storage | 10,000 parameters |
| 9️⃣ | **Amazon SNS** | Send notifications | Stock alerts via email | 1M messages, 1K emails |

---

## 🚀 5-Minute Setup Overview

### Step 1: Create AWS Account
1. Go to [aws.amazon.com](https://aws.amazon.com)
2. Create free account (requires credit card, but won't charge within limits)
3. Enable MFA on root account (Security!)

### Step 2: Set Up VPC (Virtual Private Cloud)
```
Region: us-east-1 (N. Virginia)
VPC CIDR: 10.0.0.0/16
Public Subnet: 10.0.1.0/24 (for EC2)
Private Subnet: 10.0.2.0/24 (for RDS)
```

### Step 3: Launch RDS (Database)
```
Engine: PostgreSQL 15
Instance: db.t2.micro (Free Tier)
Storage: 20 GB
Subnet: Private
Public Access: No
```

### Step 4: Launch EC2 (Backend Server)
```
AMI: Amazon Linux 2023
Instance: t2.micro (Free Tier)
Storage: 30 GB
Subnet: Public
Security Group: Allow 22 (SSH), 8000 (API)
```

### Step 5: Create S3 Bucket (Images)
```
Bucket Name: stockpilot-images-[your-account-id]
Region: us-east-1
Public Access: Block all (use CloudFront)
```

### Step 6: Set Up CloudFront (CDN)
```
Origin: Your S3 bucket
Protocol: HTTPS only
Price Class: North America & Europe only
```

### Step 7: Deploy to Amplify (Frontend)
```
1. Connect GitHub repo
2. Select 'client' as app root
3. Add environment variables
4. Deploy!
```

### Step 8: Configure Remaining Services
- **Cognito**: Create User Pool (if not using Clerk)
- **CloudWatch**: Create log group `/stockpilot/backend`
- **Parameter Store**: Store your secrets
- **SNS**: Create topics for alerts

---

## 📊 Your Deployment Checklist

```
□ AWS Account created
□ MFA enabled on root account
□ VPC with public/private subnets created
□ RDS PostgreSQL instance running
□ Prisma schema updated to PostgreSQL
□ EC2 instance running with Node.js
□ Backend deployed and running with PM2
□ S3 bucket created for images
□ Nike_Items images uploaded to S3
□ CloudFront distribution created
□ Amplify app connected to GitHub
□ Frontend deployed on Amplify
□ Environment variables configured
□ CloudWatch log group created
□ SNS topics created for alerts
□ Billing alarm set at $5
```

---

## 💰 Estimated Cost: $0/month

For your academic project with low traffic:
- All services within Free Tier limits
- Set up billing alerts just in case
- Delete everything after March to be safe

---

## 📁 Files Created for You

| File | Purpose |
|------|---------|
| `AWS_DEPLOYMENT_GUIDE.md` | Comprehensive deployment instructions |
| `AWS_ARCHITECTURE.md` | Visual architecture diagrams |
| `AWS_QUICK_START.md` | This quick reference guide |
| `amplify.yml` | Amplify build configuration |
| `server/utils/aws-services.ts` | AWS SDK integration code |
| `server/aws-env-template.txt` | Backend environment variables |
| `client/aws-env-template.txt` | Frontend environment variables |

---

## 🔗 Quick Links

- [AWS Free Tier](https://aws.amazon.com/free/)
- [EC2 Getting Started](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/get-set-up-for-amazon-ec2.html)
- [RDS PostgreSQL Guide](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_PostgreSQL.html)
- [Amplify Next.js](https://docs.amplify.aws/nextjs/)
- [S3 Getting Started](https://docs.aws.amazon.com/AmazonS3/latest/userguide/GetStartedWithS3.html)

---

## 🆘 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| EC2 can't connect to RDS | Check security group allows 5432 from EC2 SG |
| Images not loading | Check S3 bucket permissions, CloudFront origin |
| Amplify build fails | Check environment variables are set |
| API calls fail | Check EC2 security group allows port 8000 |
| Database connection timeout | Ensure RDS is in correct VPC/subnet |

---

**Ready to deploy? Start with `AWS_DEPLOYMENT_GUIDE.md` for detailed instructions!**
