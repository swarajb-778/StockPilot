# StockPilot Setup Guide

## Complete Installation and Deployment Guide

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL (or use SQLite for quick testing)
- Git

---

## Step 1: Environment Configuration

### Client Environment Setup
1. Navigate to the client directory:
```bash
cd client
```

2. Create `.env.local` file by copying the example:
```bash
cp .env.example .env.local
```

3. Edit `.env.local` if needed:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

### Server Environment Setup
1. Navigate to the server directory:
```bash
cd server
```

2. Create `.env` file by copying the example:
```bash
cp .env.example .env
```

3. Edit `.env` with your database configuration:
```
PORT=8000

# For SQLite (easiest for testing):
DATABASE_URL="file:./dev.db"

# OR for PostgreSQL (production):
# DATABASE_URL="postgresql://username:password@localhost:5432/inventorymanagement?schema=public"
```

---

## Step 2: Install Dependencies

### Install Client Dependencies
```bash
cd client
npm install
```

### Install Server Dependencies
```bash
cd server
npm install
```

---

## Step 3: Database Setup

### Option A: Using SQLite (Easiest for Testing)
1. Make sure your `server/.env` has:
```
DATABASE_URL="file:./dev.db"
```

2. Run Prisma migrations:
```bash
cd server
npx prisma generate
npx prisma migrate dev --name init
```

3. Seed the database with sample data:
```bash
npm run seed
```

### Option B: Using PostgreSQL (Production)
1. Install PostgreSQL on your system:
   - **macOS**: `brew install postgresql`
   - **Windows**: Download from postgresql.org
   - **Linux**: `sudo apt install postgresql`

2. Start PostgreSQL service:
   - **macOS**: `brew services start postgresql`
   - **Windows**: Start via Services
   - **Linux**: `sudo systemctl start postgresql`

3. Create a database:
```bash
psql -U postgres
CREATE DATABASE inventorymanagement;
\q
```

4. Update `server/.env` with your PostgreSQL credentials:
```
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/inventorymanagement?schema=public"
```

5. Run Prisma migrations:
```bash
cd server
npx prisma generate
npx prisma migrate dev --name init
```

6. Seed the database:
```bash
npm run seed
```

---

## Step 4: Running the Application

You'll need two terminal windows:

### Terminal 1 - Start the Backend Server
```bash
cd server
npm run dev
```
The server will start on http://localhost:8000

### Terminal 2 - Start the Frontend Client
```bash
cd client
npm run dev
```
The client will start on http://localhost:3000

---

## Step 5: Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

You should see the StockPilot dashboard with sample data!

---

## Common Issues and Solutions

### Issue: Port Already in Use
**Solution**: Kill the process using the port:
```bash
# For port 3000 (client)
lsof -ti:3000 | xargs kill -9

# For port 8000 (server)
lsof -ti:8000 | xargs kill -9
```

### Issue: Database Connection Error
**Solution**: 
- Verify your DATABASE_URL in server/.env
- Make sure PostgreSQL is running (if using PostgreSQL)
- Try using SQLite first: `DATABASE_URL="file:./dev.db"`

### Issue: Module Not Found Errors
**Solution**: 
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Prisma Client Errors
**Solution**:
```bash
cd server
npx prisma generate
npx prisma migrate dev
```

---

## Available Pages

Once running, you can access:
- **Dashboard**: http://localhost:3000/dashboard
- **Inventory**: http://localhost:3000/inventory
- **Products**: http://localhost:3000/products
- **Users**: http://localhost:3000/users
- **Settings**: http://localhost:3000/settings
- **Expenses**: http://localhost:3000/expenses

---

## Development Workflow

### Making Changes
1. Edit files in `client/src` for frontend
2. Edit files in `server/src` for backend
3. Changes auto-reload in development mode

### Database Changes
1. Edit `server/prisma/schema.prisma`
2. Run: `npx prisma migrate dev --name your_migration_name`
3. Run: `npx prisma generate`

---

## Deployment (AWS)

Detailed AWS deployment instructions are available in:
- `server/aws-ec2-instructions.md`

Quick overview:
- **Frontend**: AWS Amplify
- **Backend**: AWS EC2
- **Database**: AWS RDS
- **Storage**: AWS S3
- **API**: AWS API Gateway

---

## Project Structure

```
StockPilot/
├── client/                  # Next.js frontend
│   ├── src/
│   │   ├── app/            # Pages and routes
│   │   └── state/          # Redux state management
│   ├── .env.local          # Client environment variables
│   └── package.json
│
├── server/                  # Node.js backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   └── routes/         # API routes
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── seedData/       # Sample data
│   ├── .env                # Server environment variables
│   └── package.json
│
└── README.md
```

---

## Tech Stack

### Frontend
- Next.js 14
- React 18
- TypeScript
- Redux Toolkit & RTK Query
- Tailwind CSS
- Material-UI Data Grid
- Recharts (for graphs)
- Lucide React (icons)

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL / SQLite

---

## Need Help?

If you encounter any issues:
1. Check the error messages carefully
2. Verify all environment variables are set
3. Make sure all dependencies are installed
4. Ensure database is running and accessible
5. Check that no other services are using ports 3000 or 8000

---

## Next Steps

1. ✅ Follow this setup guide
2. ✅ Get the app running locally
3. 🔄 Customize the branding to StockPilot
4. 🔄 Add your own features
5. 🔄 Deploy to AWS (when ready)

Happy coding! 🚀

