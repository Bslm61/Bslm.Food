# 🍕 Bslm.Food — Food Delivery Platform

A complete full-stack food delivery application with three main components: a robust backend API, a modern client interface, and an intuitive admin dashboard.

## Table of Contents

- [Overview](#overview)
- [Features](#features) 
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Configuration](#configuration)
- [Quick Start Guide](#quick-start-guide)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Bslm.Food is a full-stack food delivery platform that demonstrates common patterns in modern web development. It allows customers to browse a restaurant catalog, manage their shopping cart, and place orders, while providing administrators with a control panel to manage food items and orders.

**Real-world use case:** An excellent example for learning how to build an e-commerce application with React, Tailwind CSS, REST API, JWT authentication, MongoDB, and Vite.

---

## Features

### 🛒 Frontend (Client)
- ✅ Browse and search for food items
- ✅ Real-time shopping cart management
- ✅ Complete order system
- ✅ User authentication (JWT)
- ✅ Order history and tracking
- ✅ Responsive design (mobile & desktop)

### 👨‍💼 Admin Panel
- ✅ Add/edit/delete food items
- ✅ Manage categories
- ✅ Order overview
- ✅ Order status tracking
- ✅ Dashboard with statistics

### 🔧 Backend
- ✅ Secure RESTful API
- ✅ JWT authentication
- ✅ Image upload functionality
- ✅ Stripe integration (payments)
- ✅ MongoDB management
- ✅ CORS enabled

---

## Tech Stack

### Backend
| Technology | Usage |
|---|---|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM for MongoDB |
| **JWT** | Stateless authentication |
| **Stripe** | Payment processing |
| **Nodemon** | Hot reload during dev |

### Frontend & Admin
| Technology | Usage |
|---|---|
| **React 18+** | UI framework |
| **Vite** | Build tool & dev server |
| **Axios** | HTTP client |
| **React Router** | SPA navigation |
| **TailwindCSS** | Styling (if applicable) |

---

## Prerequisites

Before you get started, make sure you have:

- ✅ **Node.js** (version 16+ recommended)
  ```bash
  node --version
  ```
- ✅ **npm** or **yarn**
  ```bash
  npm --version
  ```
- ✅ **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cloud)
- ✅ **Git**

### Optional external accounts
- Stripe account for payments ([stripe.com](https://stripe.com))
- MongoDB Atlas for cloud database

---

## Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Bslm61/bslm-food.git
cd bslm-food
```

### 2️⃣ Backend Configuration

```bash
cd backend
npm install
```

**Create `.env` file:**

```env
# Server port
PORT=4000

# MongoDB Connection String
# Format: mongodb+srv://username:password@cluster.mongodb.net/database
# Or local: mongodb://localhost:27017/bslm-food
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/bslm-food

# JWT Secret (generate a strong key)
JWT_SECRET=your_super_secret_jwt_key_here_min_32_chars

# Stripe (optional, for payments)
STRIPE_SECRET=sk_test_xxxxxxxxxxxxx
STRIPE_PUBLIC=pk_test_xxxxxxxxxxxxx

# Email (optional, for notifications)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

**⚠️ Important Security Note:** Never commit `.env` files. They are already in `.gitignore`.

**Start the backend:**

```bash
npm run server
```

✅ Backend running on `http://localhost:4000`

### 3️⃣ Frontend Configuration (Client)

```bash
cd ../Frontend
npm install
```

**Create `.env` file (if needed):**

```env
VITE_API_URL=http://localhost:4000/api
```

**Start development server:**

```bash
npm run dev
```

✅ Frontend accessible at `http://localhost:5173`

### 4️⃣ Admin Panel Configuration

```bash
cd ../admin
npm install
```

**Create `.env` file (if needed):**

```env
VITE_API_URL=http://localhost:4000/api
```

**Start development server:**

```bash
npm run dev
```

✅ Admin panel accessible at `http://localhost:5174`

---

## Project Structure

```
bslm-food/
│
├── backend/                          # Express API + MongoDB
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── models/                       # Mongoose schemas
│   │   ├── User.js
│   │   ├── Food.js
│   │   └── Order.js
│   ├── routes/                       # API endpoints
│   │   ├── authRoutes.js
│   │   ├── foodRoutes.js
│   │   └── orderRoutes.js
│   ├── controllers/                  # Business logic
│   ├── middleware/                   # Auth, validation, etc.
│   ├── uploads/                      # Uploaded images
│   ├── .env                         # Environment variables (not versioned)
│   ├── server.js                    # Entry point
│   └── package.json
│
├── Frontend/                         # Client App (React + Vite)
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   ├── pages/                   # Pages (Home, Cart, Orders, etc)
│   │   ├── context/
│   │   │   └── StoreContext.jsx    # Global state + API URL
│   │   ├── services/
│   │   │   └── api.js              # API calls (Axios)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env                         # Environment variables (not versioned)
│   ├── vite.config.js
│   └── package.json
│
├── admin/                            # Admin Panel (React + Vite)
│   ├── src/
│   │   ├── components/              # Admin components
│   │   ├── pages/                   # Pages (Dashboard, Foods, Orders)
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env                         # Environment variables (not versioned)
│   ├── vite.config.js
│   └── package.json
│
├── .gitignore                       # Files to ignore (*.env, node_modules)
├── README.md                        # This file
└── LICENSE
```

---

## API Documentation

### Base URL
```
http://localhost:4000/api
```

### 🔐 Authentication

**Register**
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

Response (200):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Login**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

---

### 🍔 Foods

**Get all food items**
```http
GET /api/foods
```

Response (200):
```json
{
  "success": true,
  "foods": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Burger Deluxe",
      "price": 12.99,
      "category": "burgers",
      "image": "/images/burger.jpg",
      "description": "Delicious burger with cheese and bacon"
    }
  ]
}
```

**Add food item (Admin only)**
```http
POST /api/foods
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "name": "Pizza Margherita",
  "price": 14.99,
  "category": "pizzas",
  "description": "Classic pizza",
  "image": <file>
}
```

**Delete food item (Admin only)**
```http
DELETE /api/foods/:id
Authorization: Bearer <token>
```

---

### 🛒 Orders

**Create an order**
```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "foodId": "507f1f77bcf86cd799439011",
      "quantity": 2
    }
  ],
  "deliveryAddress": "123 Peace Street, Casablanca",
  "totalPrice": 29.98
}
```

**Get my orders**
```http
GET /api/orders/myorders
Authorization: Bearer <token>
```

**Get all orders (Admin only)**
```http
GET /api/orders
Authorization: Bearer <token>
```

---

## Configuration

### Backend Environment Variables

| Variable | Description | Example |
|---|---|---|
| `PORT` | Server port | `4000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | JWT secret key (min 32 chars) | `your_secret_key_here` |
| `STRIPE_SECRET` | Stripe secret key | `sk_test_...` |
| `STRIPE_PUBLIC` | Stripe public key | `pk_test_...` |
| `NODE_ENV` | Environment | `development` or `production` |

### Frontend/Admin Environment Variables

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | API base URL | `http://localhost:4000/api` |

### Generate a secure JWT secret

```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or in Python
python3 -c "import secrets; print(secrets.token_hex(32))"
```

---

## Quick Start Guide

### Scenario: You are a customer

1. **Visit** `http://localhost:5173`
2. **Sign up** with your email and password
3. **Browse available food items**
4. **Add items to cart** that you like
5. **Place an order** with your delivery address
6. **Track your order** in the order history

### Scenario: You are an administrator

1. **Visit** `http://localhost:5174`
2. **Login** with an admin account
3. **Add food items** with images and prices
4. **Manage categories** for your restaurant
5. **View incoming orders**
6. **Update order statuses**

---

## Troubleshooting

### ❌ "Cannot connect to MongoDB"

**Symptom:** Backend logs show "MongoDB connection failed"

**Solutions:**
1. Verify MongoDB is running
   ```bash
   # If MongoDB local
   mongod
   ```
2. Check `MONGO_URI` in `.env`
3. If using MongoDB Atlas, whitelist your IP
4. Verify your MongoDB credentials

---

### ❌ "Frontend shows empty list / API errors"

**Symptom:** Frontend displays empty list or console errors

**Solutions:**
1. Ensure backend is running on `http://localhost:4000`
   ```bash
   curl http://localhost:4000/api/foods
   ```
2. Verify `VITE_API_URL` is correct in frontend `.env`
3. Reload browser after backend restart
4. Open browser console (F12) to see detailed errors

---

### ❌ "CORS errors"

**Symptom:** "No 'Access-Control-Allow-Origin' header" error

**Solution:** 
CORS should be enabled in the backend. If not, check `server.js`:

```javascript
const cors = require('cors');
app.use(cors());
```

---

### ❌ "Nodemon not restarting"

**Symptom:** Changes don't take effect

**Solution:**
```bash
# Ensure nodemon is installed
npm install -D nodemon

# Check script in package.json
# "server": "nodemon server.js"
```

---

### ❌ "Port 4000/5173 already in use"

**Symptom:** "Address already in use" error

**Solution:**
```bash
# Find process using the port
lsof -i :4000

# Or change PORT in .env
PORT=4001
```

---

### ✅ Verify everything works

```bash
# 1. Backend
curl http://localhost:4000/api/foods

# Should return:
# {"success": true, "foods": [...]}

# 2. Frontend
# Visit http://localhost:5173
# You should see the home page

# 3. Admin
# Visit http://localhost:5174
# You should see the admin dashboard
```

---

## Available Scripts

### Backend
```bash
npm run server      # Start with nodemon (hot reload)
npm start           # Start normally
npm run dev         # Alias for server
```

### Frontend & Admin
```bash
npm run dev         # Start Vite dev server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Check code quality
```

---

## Contributing

We welcome contributions! Here's how to participate:

### 1. Fork the repository
```bash
# On GitHub, click "Fork"
```

### 2. Clone your fork
```bash
git clone https://github.com/YOUR_USERNAME/bslm-food.git
cd bslm-food
```

### 3. Create a feature branch
```bash
git checkout -b feature/your-feature-name
# Or for bugs:
git checkout -b fix/bug-description
```

### 4. Make your changes
```bash
# Edit files, test locally
git add .
git commit -m "Add: clear description of your changes"
```

### 5. Push and create a Pull Request
```bash
git push origin feature/your-feature-name
# Then open a PR on GitHub
```

### Contribution Standards
- ✅ Test your changes locally
- ✅ Write clear commit messages
- ✅ Follow existing code style
- ✅ Document major changes
- ✅ One PR = one feature or bug fix

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

---

## Support & Contact

- 📧 **Issues:** [Open a GitHub issue](https://github.com/Bslm61/bslm-food/issues)
- 👤 **Maintainer:** [Bslm61](https://github.com/Bslm61)
- 📚 **Useful Resources:**
  - [Express Documentation](https://expressjs.com/)
  - [MongoDB Documentation](https://docs.mongodb.com/)
  - [React + Vite](https://vitejs.dev/guide/ssr.html#react)
  - [Stripe Documentation](https://stripe.com/docs)
  - [Node.js Documentation](https://nodejs.org/en)
  - [Tailwind Documentation](https://tailwindcss.com/)

---

## Security Checklist

Before deploying to production:

- ⚠️ **Don't commit `.env` files** (already in `.gitignore`)
- ⚠️ **Generate strong JWT_SECRET** (min 32 characters)
- ⚠️ **Use HTTPS** (not HTTP in production)
- ⚠️ **Configure CORS correctly** (specify allowed domains)
- ⚠️ **Validate and sanitize inputs** on the server
- ⚠️ **Add authorization checks** (user vs admin)
- ⚠️ **Implement rate limiting** for the API
- ⚠️ **Enable production environment variables**

---

**Made with ❤️ by the Bslm.Food community**

Last updated: November 2025
