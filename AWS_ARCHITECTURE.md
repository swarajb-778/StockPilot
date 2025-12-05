# 🏗️ AWS Architecture - StockPilot

## Visual Architecture Diagram

```
                                    ┌─────────────────────────────────────────────────────────────┐
                                    │                         USERS                                │
                                    │                     (Web Browsers)                           │
                                    └─────────────────────────────────────────────────────────────┘
                                                              │
                                                              │ HTTPS
                                                              ▼
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                              AWS CLOUD (us-east-1)                                               │
│                                                                                                                  │
│    ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐  │
│    │                                    EDGE LOCATIONS (Global)                                               │  │
│    │                                                                                                          │  │
│    │    ┌───────────────────────────────────────────────────────────────────────────────────────────────┐    │  │
│    │    │                               5️⃣ AMAZON CLOUDFRONT (CDN)                                      │    │  │
│    │    │                                                                                                │    │  │
│    │    │    • Caches static assets at 400+ edge locations                                              │    │  │
│    │    │    • FREE: 50 GB data transfer + 2M requests/month                                            │    │  │
│    │    │    • Reduces latency for users worldwide                                                       │    │  │
│    │    │                                                                                                │    │  │
│    │    └───────────────────────────────────────────────────────────────────────────────────────────────┘    │  │
│    │                          │                                            │                                  │  │
│    └──────────────────────────┼────────────────────────────────────────────┼──────────────────────────────────┘  │
│                               │                                            │                                     │
│                               ▼                                            ▼                                     │
│    ┌───────────────────────────────────────────┐    ┌───────────────────────────────────────────────────────┐   │
│    │      1️⃣ AWS AMPLIFY (Frontend)           │    │              4️⃣ AMAZON S3 (Storage)                   │   │
│    │                                            │    │                                                        │   │
│    │    ┌──────────────────────────────────┐   │    │    ┌────────────────────────────────────────────────┐  │   │
│    │    │     Next.js Application          │   │    │    │         stockpilot-images-bucket              │  │   │
│    │    │                                  │   │    │    │                                                │  │   │
│    │    │  • Server-Side Rendering         │   │    │    │  products/                                    │  │   │
│    │    │  • React Dashboard               │   │    │    │  ├── nike1.png                                │  │   │
│    │    │  • Redux State Management        │   │    │    │  ├── nike2.png                                │  │   │
│    │    │                                  │   │    │    │  └── ...                                      │  │   │
│    │    └──────────────────────────────────┘   │    │    │                                                │  │   │
│    │                                            │    │    │  FREE: 5 GB storage, 20K GET requests         │  │   │
│    │    FREE: 5 GB storage, 1K build mins      │    │    └────────────────────────────────────────────────┘  │   │
│    └───────────────────────────────────────────┘    └───────────────────────────────────────────────────────┘   │
│                       │                                                                                          │
│                       │ API Calls (REST)                                                                        │
│                       ▼                                                                                          │
│    ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────┐│
│    │                                    VIRTUAL PRIVATE CLOUD (VPC)                                             ││
│    │                                      10.0.0.0/16                                                           ││
│    │                                                                                                             ││
│    │    ┌────────────────────────────────────────────────────────────────────────────────────────────────────┐  ││
│    │    │                              PUBLIC SUBNET (10.0.1.0/24)                                            │  ││
│    │    │                                                                                                     │  ││
│    │    │    ┌─────────────────────────────────────────────────────────────────────────────────────────┐     │  ││
│    │    │    │                           2️⃣ AMAZON EC2 (Backend)                                       │     │  ││
│    │    │    │                                                                                          │     │  ││
│    │    │    │    Instance Type: t2.micro (1 vCPU, 1 GB RAM)                                           │     │  ││
│    │    │    │                                                                                          │     │  ││
│    │    │    │    ┌────────────────────────────────────────────────────────────────────────────────┐   │     │  ││
│    │    │    │    │                         Express.js Server                                       │   │     │  ││
│    │    │    │    │                                                                                 │   │     │  ││
│    │    │    │    │    Routes:                      Controllers:                                    │   │     │  ││
│    │    │    │    │    • /dashboard                 • dashboardController                           │   │     │  ││
│    │    │    │    │    • /products                  • productController                             │   │     │  ││
│    │    │    │    │    • /users                     • userController                                │   │     │  ││
│    │    │    │    │    • /expenses                  • expenseController                             │   │     │  ││
│    │    │    │    │    • /notifications             • notificationController                        │   │     │  ││
│    │    │    │    │                                                                                 │   │     │  ││
│    │    │    │    │    Tech: Node.js 18 + Prisma ORM + PM2                                          │   │     │  ││
│    │    │    │    └────────────────────────────────────────────────────────────────────────────────┘   │     │  ││
│    │    │    │                                                                                          │     │  ││
│    │    │    │    FREE: 750 hours/month (runs 24/7 for free)                                           │     │  ││
│    │    │    └─────────────────────────────────────────────────────────────────────────────────────────┘     │  ││
│    │    │                                            │                                                        │  ││
│    │    │                                            │ Prisma Client Connection                               │  ││
│    │    └────────────────────────────────────────────┼────────────────────────────────────────────────────────┘  ││
│    │                                                 │                                                            ││
│    │    ┌────────────────────────────────────────────┼────────────────────────────────────────────────────────┐  ││
│    │    │                              PRIVATE SUBNET (10.0.2.0/24)                                           │  ││
│    │    │                                            │                                                        │  ││
│    │    │                                            ▼                                                        │  ││
│    │    │    ┌─────────────────────────────────────────────────────────────────────────────────────────┐     │  ││
│    │    │    │                            3️⃣ AMAZON RDS (Database)                                     │     │  ││
│    │    │    │                                                                                          │     │  ││
│    │    │    │    Engine: PostgreSQL 15                                                                │     │  ││
│    │    │    │    Instance: db.t2.micro (1 vCPU, 1 GB RAM)                                             │     │  ││
│    │    │    │    Storage: 20 GB SSD                                                                   │     │  ││
│    │    │    │                                                                                          │     │  ││
│    │    │    │    Tables:                                                                               │     │  ││
│    │    │    │    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐      │     │  ││
│    │    │    │    │   Users     │ │  Products   │ │   Sales     │ │  Purchases  │ │  Expenses   │      │     │  ││
│    │    │    │    └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘      │     │  ││
│    │    │    │    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────────────┐      │     │  ││
│    │    │    │    │SalesSummary │ │PurchSum     │ │ExpensSum    │ │    Notifications            │      │     │  ││
│    │    │    │    └─────────────┘ └─────────────┘ └─────────────┘ └─────────────────────────────┘      │     │  ││
│    │    │    │                                                                                          │     │  ││
│    │    │    │    FREE: 750 hours/month + 20 GB storage                                                │     │  ││
│    │    │    └─────────────────────────────────────────────────────────────────────────────────────────┘     │  ││
│    │    │                                                                                                     │  ││
│    │    └─────────────────────────────────────────────────────────────────────────────────────────────────────┘  ││
│    │                                                                                                             ││
│    └───────────────────────────────────────────────────────────────────────────────────────────────────────────┘│
│                                                                                                                  │
│    ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────┐│
│    │                                        SUPPORTING SERVICES                                                 ││
│    │                                                                                                             ││
│    │    ┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────────────┐                  ││
│    │    │   6️⃣ AMAZON COGNITO     │  │   7️⃣ CLOUDWATCH         │  │   8️⃣ PARAMETER STORE   │                  ││
│    │    │                          │  │                          │  │                          │                  ││
│    │    │   User Authentication   │  │   Monitoring & Logs      │  │   Secrets Management    │                  ││
│    │    │                          │  │                          │  │                          │                  ││
│    │    │   • User Pool           │  │   • EC2 Metrics          │  │   • DATABASE_URL        │                  ││
│    │    │   • Sign Up/Sign In     │  │   • RDS Metrics          │  │   • AWS_ACCESS_KEY      │                  ││
│    │    │   • Password Reset      │  │   • Application Logs     │  │   • S3_BUCKET_NAME      │                  ││
│    │    │   • JWT Tokens          │  │   • Alarms               │  │   • API_SECRETS         │                  ││
│    │    │                          │  │                          │  │                          │                  ││
│    │    │   FREE: 50K MAU         │  │   FREE: 5 GB logs        │  │   FREE: 10K params      │                  ││
│    │    └─────────────────────────┘  └─────────────────────────┘  └─────────────────────────┘                  ││
│    │                                                                                                             ││
│    │    ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐   ││
│    │    │                                    9️⃣ AMAZON SNS (Notifications)                                 │   ││
│    │    │                                                                                                   │   ││
│    │    │    Topics:                                                                                        │   ││
│    │    │    ┌────────────────────────┐  ┌────────────────────────┐  ┌────────────────────────┐            │   ││
│    │    │    │  stockpilot-stock-     │  │  stockpilot-system-    │  │  stockpilot-order-     │            │   ││
│    │    │    │  alerts                │  │  alerts                │  │  notifications         │            │   ││
│    │    │    │                        │  │                        │  │                        │            │   ││
│    │    │    │  Low inventory alerts  │  │  System errors via     │  │  New order emails      │            │   ││
│    │    │    │  to admin email        │  │  CloudWatch            │  │  (optional)            │            │   ││
│    │    │    └────────────────────────┘  └────────────────────────┘  └────────────────────────┘            │   ││
│    │    │                                                                                                   │   ││
│    │    │    FREE: 1M messages/month + 1K emails/month                                                      │   ││
│    │    └──────────────────────────────────────────────────────────────────────────────────────────────────┘   ││
│    │                                                                                                             ││
│    └───────────────────────────────────────────────────────────────────────────────────────────────────────────┘│
│                                                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Service Flow Diagram

```
                                          REQUEST FLOW
                                              
    ┌──────┐         ┌───────────┐         ┌──────────┐         ┌─────────┐         ┌─────────┐
    │ User │──HTTPS──▶│CloudFront │──Cache──▶│ Amplify  │──API────▶│  EC2    │──Query──▶│   RDS   │
    │      │         │   (CDN)   │  Miss   │(Frontend)│ Request │(Backend)│         │(Database│
    └──────┘         └───────────┘         └──────────┘         └─────────┘         └─────────┘
        │                 │                                          │
        │                 │                                          │
        │            ┌────┴────┐                               ┌─────┴─────┐
        │            ▼         ▼                               ▼           ▼
        │      ┌─────────┐ ┌────────┐                    ┌─────────┐ ┌─────────┐
        │      │   S3    │ │Cognito │                    │Parameter│ │   SNS   │
        │      │(Images) │ │ (Auth) │                    │  Store  │ │(Alerts) │
        │      └─────────┘ └────────┘                    └─────────┘ └─────────┘
        │                      │                              │           │
        │                      │                              │           │
        ▼                      ▼                              ▼           ▼
    ┌──────────────────────────────────────────────────────────────────────────┐
    │                         📊 CLOUDWATCH (Monitoring)                        │
    │                                                                           │
    │   Collects: Metrics, Logs, Alarms from all services                      │
    └──────────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Examples

### 1. Loading Dashboard
```
1. User visits dashboard.stockpilot.com
2. CloudFront checks cache → Cache MISS
3. Request goes to Amplify
4. Next.js SSR fetches data from EC2 API
5. EC2 queries RDS for metrics
6. Data returns through the chain
7. CloudFront caches static assets
8. Dashboard renders in browser
```

### 2. Viewing Product Image
```
1. Browser requests /products/nike1.png
2. CloudFront checks cache → Cache HIT
3. Image served from nearest edge location
4. (If cache miss: CloudFront fetches from S3, caches it)
```

### 3. Low Stock Alert
```
1. Product stock updated via API
2. EC2 checks if stock < threshold
3. EC2 publishes message to SNS topic
4. SNS delivers email to subscribed admins
5. CloudWatch logs the event
```

### 4. User Authentication
```
1. User clicks "Sign In"
2. Cognito hosted UI appears
3. User enters credentials
4. Cognito validates and returns JWT
5. JWT stored in browser
6. JWT sent with API requests
7. EC2 validates JWT with Cognito
```

---

## Security Architecture

```
                    SECURITY LAYERS

    ┌─────────────────────────────────────────────────────┐
    │                    INTERNET                          │
    └─────────────────────────────────────────────────────┘
                            │
                            ▼
    ┌─────────────────────────────────────────────────────┐
    │              AWS SHIELD (DDoS Protection)            │
    │              (Automatic, no extra cost)              │
    └─────────────────────────────────────────────────────┘
                            │
                            ▼
    ┌─────────────────────────────────────────────────────┐
    │                    VPC FIREWALL                      │
    │              Security Groups + NACLs                 │
    └─────────────────────────────────────────────────────┘
                            │
              ┌─────────────┴─────────────┐
              │                           │
              ▼                           ▼
    ┌───────────────────┐     ┌───────────────────────────┐
    │   PUBLIC SUBNET   │     │      PRIVATE SUBNET       │
    │                   │     │                           │
    │   EC2 Security    │     │   RDS Security Group:     │
    │   Group:          │     │   - Inbound: 5432         │
    │   - Inbound: 22,  │────▶│     from EC2 SG only      │
    │     80, 443, 8000 │     │   - Outbound: None        │
    │   - Outbound: All │     │                           │
    │                   │     │   ❌ NO public access     │
    └───────────────────┘     └───────────────────────────┘
                                          │
                                          │
    ┌─────────────────────────────────────┴───────────────┐
    │                DATA ENCRYPTION                       │
    │                                                      │
    │   • RDS: Encrypted at rest (AES-256)                │
    │   • S3: Server-side encryption (SSE-S3)             │
    │   • All traffic: HTTPS/TLS                          │
    │   • Secrets: Parameter Store with KMS               │
    └─────────────────────────────────────────────────────┘
```

---

## Monthly Cost Summary (Free Tier)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                         MONTHLY COST BREAKDOWN                                │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│   Service                  Usage Estimate        Free Limit       Cost       │
│   ─────────────────────────────────────────────────────────────────────      │
│   1. AWS Amplify           500 builds            1,000 builds      $0        │
│   2. Amazon EC2            744 hrs (24/7)        750 hrs           $0        │
│   3. Amazon RDS            744 hrs (24/7)        750 hrs           $0        │
│   4. Amazon S3             1 GB                  5 GB              $0        │
│   5. Amazon CloudFront     5 GB                  50 GB             $0        │
│   6. Amazon Cognito        50 users              50,000 MAU        $0        │
│   7. Amazon CloudWatch     1 GB logs             5 GB              $0        │
│   8. Parameter Store       20 parameters         10,000            $0        │
│   9. Amazon SNS            100 emails            1,000 emails      $0        │
│   ─────────────────────────────────────────────────────────────────────      │
│                                                                               │
│   TOTAL MONTHLY COST:                                              $0        │
│                                                                               │
│   ⚠️  Stay within these limits to ensure $0 cost                             │
│                                                                               │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## Quick Reference Card

| Need To... | Use This Service | Why |
|------------|-----------------|-----|
| Host Next.js frontend | AWS Amplify | Built for React/Next.js |
| Run backend server | Amazon EC2 | Full control, persistent |
| Store data | Amazon RDS | Managed PostgreSQL |
| Store images | Amazon S3 | Scalable object storage |
| Speed up content | Amazon CloudFront | CDN caching |
| Authenticate users | Amazon Cognito | Managed auth |
| Monitor everything | Amazon CloudWatch | Logs & metrics |
| Store secrets | Parameter Store | Secure configs |
| Send alerts | Amazon SNS | Pub/sub messaging |

---

**Next Steps**: Follow the [AWS_DEPLOYMENT_GUIDE.md](./AWS_DEPLOYMENT_GUIDE.md) for step-by-step setup instructions.
