# 🚀 Quick Start Guide - StockPilot

## ✅ Setup Complete!

Your StockPilot application is now fully set up and running!

---

## 🌐 Application URLs

### Frontend (Client)
```
http://localhost:3001
```

### Backend API
```
http://localhost:8000
```

---

## 📱 Available Pages

Once you open http://localhost:3001, you can navigate to:

- **Dashboard** - Main analytics dashboard
  - `http://localhost:3001/dashboard`
  
- **Inventory** - View and manage inventory
  - `http://localhost:3001/inventory`
  
- **Products** - Product management with create/edit capabilities
  - `http://localhost:3001/products`
  
- **Users** - User management
  - `http://localhost:3001/users`
  
- **Expenses** - Expense tracking and analytics
  - `http://localhost:3001/expenses`
  
- **Settings** - Application settings
  - `http://localhost:3001/settings`

---

## 🎮 Running the Servers

### Start Backend Server
```bash
cd server
npm run dev
```
Server will run on http://localhost:8000

### Start Frontend Client
```bash
cd client
npm run dev
```
Client will run on http://localhost:3000 (or 3001 if 3000 is in use)

---

## 🛑 Stop the Servers

To stop the servers, press `Ctrl + C` in each terminal window.

---

## 🔄 Restart with Fresh Data

If you want to reset the database with fresh sample data:

```bash
cd server
npm run seed
```

---

## 📊 Database Information

- **Type**: SQLite (local file-based database)
- **Location**: `server/dev.db`
- **Schema**: Defined in `server/prisma/schema.prisma`
- **Sample Data**: Located in `server/prisma/seedData/`

### View Database

You can view your database using Prisma Studio:

```bash
cd server
npx prisma studio
```

This will open a web interface at http://localhost:5555 to view and edit your data.

---

## 🛠️ Common Commands

### Client Commands
```bash
cd client

# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Server Commands
```bash
cd server

# Development server with hot reload
npm run dev

# Build TypeScript
npm run build

# Start production server
npm start

# Seed database with sample data
npm run seed

# Open Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset
```

---

## 🐛 Troubleshooting

### Port Already in Use

If you see "Port already in use":

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 8000
lsof -ti:8000 | xargs kill -9
```

### Module Not Found

If you get "Module not found" errors:

```bash
# In client or server directory
rm -rf node_modules package-lock.json
npm install
```

### Prisma Errors

If you get Prisma client errors:

```bash
cd server
npx prisma generate
npx prisma migrate dev
```

### API Connection Issues

Make sure the backend is running and check your `.env.local` in the client folder:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

---

## 📁 Project Structure

```
StockPilot/
├── client/                     # Frontend (Next.js)
│   ├── src/
│   │   ├── app/               # Pages and routes
│   │   │   ├── dashboard/     # Dashboard page
│   │   │   ├── inventory/     # Inventory page
│   │   │   ├── products/      # Products page
│   │   │   ├── users/         # Users page
│   │   │   ├── expenses/      # Expenses page
│   │   │   ├── settings/      # Settings page
│   │   │   └── (components)/  # Shared components
│   │   └── state/             # Redux store & API
│   ├── .env.local             # Client environment variables
│   └── package.json
│
├── server/                     # Backend (Node.js + Express)
│   ├── src/
│   │   ├── controllers/       # Business logic
│   │   └── routes/            # API endpoints
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema
│   │   └── seedData/          # Sample data files
│   ├── .env                   # Server environment variables
│   ├── dev.db                 # SQLite database file
│   └── package.json
│
└── Documentation files
```

---

## 🎨 Features Included

✅ **Dashboard Analytics**
- Sales summary charts
- Purchase trends
- Expense breakdowns
- Popular products

✅ **Inventory Management**
- Real-time stock tracking
- Low stock alerts
- Product search and filtering

✅ **Product Management**
- Add new products
- Edit existing products
- View product details
- Stock quantity management

✅ **User Management**
- View all users
- User details

✅ **Expense Tracking**
- Category-wise expenses
- Expense timeline
- Total expense calculations

✅ **Dark Mode Support**
- Toggle between light and dark themes

✅ **Responsive Design**
- Works on desktop, tablet, and mobile

---

## 🚀 Next Steps

1. ✅ Explore the dashboard at http://localhost:3001
2. ✅ Test all the different pages
3. 🔄 Customize the branding and colors
4. 🔄 Add your own features
5. 🔄 Deploy to production when ready

---

## 📚 Additional Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **Prisma Documentation**: https://www.prisma.io/docs
- **Redux Toolkit**: https://redux-toolkit.js.org/
- **Material-UI**: https://mui.com/
- **Tailwind CSS**: https://tailwindcss.com/

---

## 💡 Tips

- The application comes pre-loaded with sample data
- Dark mode toggle is in the settings page
- All data is stored locally in SQLite
- The Redux store manages global state
- API calls are cached using RTK Query for better performance

---

## 🤝 Need Help?

If you encounter any issues:

1. Check that both servers are running
2. Verify environment variables are set correctly
3. Check browser console for errors
4. Check terminal output for server errors
5. Try restarting both servers

---

**Happy Inventory Management! 📦✨**

