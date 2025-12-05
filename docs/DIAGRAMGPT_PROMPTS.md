# DiagramGPT Prompts for StockPilot Documentation

Use these prompts on [DiagramGPT (eraser.io)](https://www.eraser.io/diagramgpt) to generate professional diagrams for your documentation.

---

## Diagram 1: System Architecture Diagram

### Prompt:
```
Create a detailed AWS cloud architecture diagram for an inventory management system called "StockPilot" with the following components:

**EDGE SERVICES (Left side):**
- CloudFront CDN with AWS logo
- AWS Amplify hosting Next.js frontend application

**VPC (Center, as a large container):**
- Public Subnet containing:
  - EC2 t2.micro instance running Express.js backend
- Private Subnet (dashed border) containing:
  - RDS PostgreSQL database

**EXTERNAL AWS SERVICES (Right side, vertical stack):**
- Amazon S3 bucket for product images
- CloudWatch for monitoring
- SSM Parameter Store for secrets
- SNS for push notifications
- SES for email notifications

**CONNECTIONS:**
- Users connect to CloudFront and Amplify
- Users make API calls directly to EC2
- EC2 queries RDS database
- EC2 uploads/retrieves from S3
- CloudWatch monitors EC2 and RDS
- EC2 fetches secrets from Parameter Store
- EC2 pushes to SNS, SNS triggers SES

Use a dark theme with purple/blue gradient background. Use official AWS service icons. Make it professional and suitable for academic documentation.
```

---

## Diagram 2: Data Flow Diagram

### Prompt:
```
Create a data flow diagram (DFD) for StockPilot inventory management system showing:

**EXTERNAL ENTITIES (circles/ovals):**
- End User
- Admin/Manager
- Email Service

**PROCESSES (rectangles with rounded corners):**
1.0 - User Authentication (via Clerk)
2.0 - Dashboard Analytics
3.0 - Inventory Management
4.0 - Product CRUD Operations
5.0 - Expense Tracking
6.0 - Notification System

**DATA STORES (open-ended rectangles):**
D1 - Users Database
D2 - Products Database
D3 - Sales/Purchases Database
D4 - Expenses Database
D5 - Notifications Database

**DATA FLOWS (arrows with labels):**
- User credentials → Authentication → Session token
- Dashboard request → Dashboard Analytics → Metrics data
- Product data → Inventory Management → Stock levels
- Stock alert → Notification System → Email notification
- Expense entry → Expense Tracking → Expense summary

Use a clean, professional style with blue color scheme. Include numbered processes and labeled data flows.
```

---

## Diagram 3: Database Entity Relationship Diagram (ERD)

### Prompt:
```
Create an Entity Relationship Diagram (ERD) for StockPilot inventory system with these entities and relationships:

**ENTITIES (with attributes):**

USERS
- userId (PK)
- name
- email

PRODUCTS
- productId (PK)
- name
- price
- rating
- stockQuantity
- imageUrl
- description

SALES
- saleId (PK)
- productId (FK)
- timestamp
- quantity
- unitPrice
- totalAmount

PURCHASES
- purchaseId (PK)
- productId (FK)
- timestamp
- quantity
- unitCost
- totalCost

EXPENSES
- expenseId (PK)
- category
- amount
- timestamp

NOTIFICATIONS
- notificationId (PK)
- userId (FK)
- type
- title
- message
- isRead
- createdAt

EXPENSE_SUMMARY
- summaryId (PK)
- totalExpenses
- date

EXPENSE_BY_CATEGORY
- categoryId (PK)
- summaryId (FK)
- category
- amount
- date

**RELATIONSHIPS:**
- Products 1:N Sales
- Products 1:N Purchases
- Users 1:N Notifications
- ExpenseSummary 1:N ExpenseByCategory

Use crow's foot notation. Show primary keys (PK) and foreign keys (FK). Use a professional dark or light theme suitable for documentation.
```

---

## Diagram 4: Application Workflow/Sequence Diagram

### Prompt:
```
Create a sequence diagram showing the user workflow in StockPilot inventory management system:

**PARTICIPANTS (in order):**
- User (stick figure)
- Frontend (Next.js/Amplify)
- Backend (Express.js/EC2)
- Database (RDS PostgreSQL)
- AWS SNS
- Email (SES)

**SEQUENCE OF INTERACTIONS:**

1. Authentication Flow:
   User → Frontend: Opens application
   Frontend → Clerk: Redirects to sign-in
   Clerk → Frontend: Returns auth token
   Frontend → User: Shows dashboard

2. View Dashboard:
   User → Frontend: Requests dashboard
   Frontend → Backend: GET /dashboard
   Backend → Database: Query metrics
   Database → Backend: Return data
   Backend → Frontend: JSON response
   Frontend → User: Display dashboard

3. Low Stock Alert Flow:
   Backend → Database: Check stock levels
   Database → Backend: Low stock detected
   Backend → Backend: Create notification
   Backend → SNS: Publish alert
   SNS → SES: Trigger email
   SES → User: Email notification
   Backend → Frontend: Push notification
   Frontend → User: Show toast alert

Use a clean, professional style. Include activation bars for each participant. Show return messages with dashed lines.
```

---

## How to Use These Prompts

1. Go to [DiagramGPT (eraser.io)](https://www.eraser.io/diagramgpt)
2. Copy one prompt from above
3. Paste it into the DiagramGPT input field
4. Click "Generate"
5. Adjust/edit the generated diagram if needed
6. Export as PNG or SVG
7. Add to your documentation

---

## Recommended Diagram Placements in Documentation

| Diagram | Section | Purpose |
|---------|---------|---------|
| System Architecture | Section 2.1 & 7 | Shows overall cloud infrastructure |
| Data Flow Diagram | Section 4 (Functionality) | Shows how data moves through system |
| ERD | Section 6.2 (Backend) | Shows database structure |
| Sequence Diagram | Section 4.1 | Shows user interaction flow |

---

## Export Settings

When exporting diagrams from eraser.io:

| Setting | Recommended Value |
|---------|-------------------|
| Format | PNG (for Word) or SVG (for web) |
| Resolution | 2x or 3x for high quality |
| Background | Transparent or match document theme |
| Size | At least 1200px width |

---

**© 2025 StockPilot. All rights reserved.**

