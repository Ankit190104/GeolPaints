# Goel Paints and Hardware Store (ਗੋਇਲ ਪੈਂਟਸ ਅਤੇ ਹਾਰਡਵੇਅਰ ਸਟੋਰ)

A full-stack **MERN** (MongoDB, Express, React, Node.js) web application for **Goel Paints and Hardware Store**, located in Sector 70, Mohali, Punjab.

---

## 🏬 Business Details

- **Store Name:** Goel Paints and Hardware Store (ਗੋਇਲ ਪੈਂਟਸ ਅਤੇ ਹਾਰਡਵੇਅਰ ਸਟੋਰ)
- **Address:** Booth No. 4, Sector 70, Sahibzada Ajit Singh Nagar (Mohali), Punjab 160071
- **Phone:** `094175 11727` | **WhatsApp:** `+91 9417511727`
- **Business Hours:** Monday – Saturday: `9:00 AM – 8:30 PM` | Sunday: `Closed` *(Editable in code with `[CONFIRM WITH OWNER]` tags)*
- **Google Rating:** 4.1 Stars (60+ Reviews)
- **Highlights:** Ample parking space in front of shop, genuine brand products (Asian Paints, Nerolac, Dr. Fixit, Fevicol, Jaquar), competitive wholesale pricing, prompt home delivery across Mohali.

---

## 📁 Project Structure

```
d:\hardwereweb\
├── client/                      # React (Vite) Frontend
│   ├── src/
│   │   ├── components/         # Reusable UI Components
│   │   │   ├── Navbar.jsx          # Header with English/Punjabi toggle & Call button
│   │   │   ├── Hero.jsx            # Hero section with headline & quick CTA buttons
│   │   │   ├── WhyUs.jsx           # Value proposition cards (Quality, Price, Delivery, Parking)
│   │   │   ├── ProductCatalog.jsx  # Dynamic product catalog with category filter & search
│   │   │   ├── ShadePalette.jsx    # Paint color shade swatch strip & WhatsApp enquiry
│   │   │   ├── BulkOrderSection.jsx# Contractor & builder bulk enquiry form
│   │   │   ├── ReviewsSection.jsx  # Google reviews summary & customer review submission
│   │   │   ├── VisitUs.jsx         # Address, Google map iframe & directions link
│   │   │   ├── Footer.jsx          # Footer with developer credit line & navigation
│   │   │   ├── FloatingActions.jsx # Mobile floating Call & WhatsApp buttons
│   │   │   ├── SEO.jsx             # React Helmet Async meta tags & Schema JSON-LD
│   │   │   └── ProtectedRoute.jsx  # Route guard for Admin dashboard
│   │   ├── context/
│   │   │   ├── LanguageContext.jsx # i18n Context for EN / Punjabi switching
│   │   │   └── AuthContext.jsx     # Admin JWT authentication context
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Public landing page
│   │   │   ├── Login.jsx           # Admin login page
│   │   │   └── AdminDashboard.jsx  # Shop owner dashboard (Products, Shades, Enquiries, Reviews)
│   │   ├── utils/
│   │   │   ├── api.js              # Axios instance configured with base URL & JWT header
│   │   │   └── translations.js     # Bilingual dictionary (English & Punjabi)
│   │   ├── App.jsx                 # Application router & providers
│   │   ├── index.css               # Tailwind CSS imports & custom utility classes
│   │   └── main.jsx                # React DOM entry point
│   ├── .env.example                # Example client environment variables
│   ├── index.html                  # HTML template with Google Fonts (Poppins & Noto Sans Gurmukhi)
│   ├── package.json                # Frontend dependencies
│   ├── tailwind.config.js          # Tailwind styling configuration
│   └── vite.config.js              # Vite server & proxy configuration
│
├── server/                      # Node.js + Express Backend
│   ├── config/
│   │   └── db.js                   # MongoDB Mongoose connection config
│   ├── controllers/
│   │   ├── authController.js       # Admin authentication & profile
│   │   ├── productController.js    # Product CRUD operations
│   │   ├── shadeController.js      # Paint shade CRUD operations
│   │   ├── reviewController.js     # Customer reviews & moderation
│   │   └── enquiryController.js    # Enquiry submission & status tracking
│   ├── middleware/
│   │   ├── authMiddleware.js       # JWT bearer token verification middleware
│   │   └── errorMiddleware.js      # Global 404 & Express error handler
│   ├── models/
│   │   ├── Admin.js                # Admin user schema
│   │   ├── Product.js              # Product schema (name_en, name_pa, price, category, etc.)
│   │   ├── Shade.js                # Paint shade schema (name, hex, code, category)
│   │   ├── Review.js               # Customer review schema (name, rating, text, approved)
│   │   └── Enquiry.js              # Enquiry schema (name, phone, message, type, status)
│   ├── routes/
│   │   ├── authRoutes.js           # Auth routes (/api/auth)
│   │   ├── productRoutes.js        # Product routes (/api/products)
│   │   ├── shadeRoutes.js          # Shade routes (/api/shades)
│   │   ├── reviewRoutes.js         # Review routes (/api/reviews)
│   │   └── enquiryRoutes.js        # Enquiry routes (/api/enquiries with rate limit)
│   ├── .env.example                # Example server environment variables
│   ├── package.json                # Backend dependencies
│   ├── seed.js                     # Seed script for initial admin & sample products/shades
│   └── server.js                   # Express application entry point
│
├── package.json                 # Monorepo root package configuration
└── README.md                    # Complete project documentation
```

---

## ⚡ Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, Lucide React, React Router v6, Axios, React Helmet Async.
- **Backend:** Node.js, Express.js, Mongoose, JWT Auth, Bcrypt.js, Cors, Helmet, Express Rate Limit, Express Validator.
- **Database:** MongoDB (Local or MongoDB Atlas).

---

## 🚀 Local Development Setup

### 1. Prerequisites
- **Node.js:** v18.x or higher
- **MongoDB:** Installed locally OR a MongoDB Atlas cluster URI string.

### 2. Configure Environment Variables

#### Server Environment (`server/.env`):
Create a `.env` file in the `server` folder by copying `server/.env.example`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/goel_paints
JWT_SECRET=goel_paints_super_secret_jwt_key_2026_mohali
ADMIN_EMAIL=admin@goelpaints.com
ADMIN_PASSWORD=admin123
```

#### Client Environment (`client/.env`):
Create a `.env` file in the `client` folder by copying `client/.env.example`:
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_WHATSAPP_NUMBER=919417511727
VITE_STORE_PHONE=094175 11727
```

### 3. Install Dependencies & Seed Database

In the root directory, run:
```bash
# Install dependencies for both server and client
npm run install-all

# Seed database with sample products, paint shades, reviews, and admin account
npm run seed
```

### 4. Run Development Servers

Open two terminal windows:

**Terminal 1 (Backend Server):**
```bash
cd server
npm run dev
# Server starts at http://localhost:5000
```

**Terminal 2 (Frontend Client):**
```bash
cd client
npm run dev
# Vite dev server starts at http://localhost:3000
```

---

## 🔑 Admin Dashboard Access

- **URL:** `http://localhost:3000/admin` (or click the shield icon in navbar / login button)
- **Default Email:** `admin@goelpaints.com`
- **Default Password:** `admin123`

### Admin Features (Mobile Friendly):
1. **Products Management:** Add new items, upload/link image URLs, toggle in-stock / out-of-stock badge with 1-click, edit prices, delete items.
2. **Paint Shades Management:** Add custom color swatches (HEX color picker), shade codes, edit & delete shades.
3. **Enquiries:** View customer bulk and general enquiry submissions, mark as contacted, click direct WhatsApp reply.
4. **Reviews Moderation:** Approve/unapprove customer submitted reviews to make them visible on the public site.

---

## 📝 Editable Locations for Store Owner & Developer

1. **Store Phone & WhatsApp Numbers:**
   - In `client/.env` or `server/seed.js`
   - In `client/src/components/Navbar.jsx`
   - In `client/src/components/VisitUs.jsx`

2. **Opening Hours:**
   - Marked with `[CONFIRM WITH OWNER]` comments in `client/src/components/VisitUs.jsx` and `client/src/components/Footer.jsx`.

3. **Developer Credit Line:**
   - Located in `client/src/components/Footer.jsx` line 12:
     ```js
     const developerName = "Webcraft Solutions";
     const developerPhone = "+91 94175 11727";
     ```

---

## 🌐 Production Deployment Guide

### Step 1: Database Setup (MongoDB Atlas)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free Shared Cluster.
2. Create a Database User (username & password).
3. Under **Network Access**, add IP Access `0.0.0.0/0` (Allow access from anywhere).
4. Copy your Connection String (`mongodb+srv://<username>:<password>@cluster.mongodb.net/goel_paints?retryWrites=true&w=majority`).

### Step 2: Deploy Backend API (Render.com)
1. Push your repository to GitHub.
2. Sign in to [Render](https://render.com) and create a **New Web Service**.
3. Connect your repository and set the **Root Directory** to `server`.
4. Set **Build Command**: `npm install`
5. Set **Start Command**: `node server.js`
6. Add Environment Variables in Render Dashboard:
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = your MongoDB Atlas connection string
   - `JWT_SECRET` = your random secret string
   - `ADMIN_EMAIL` = store owner email
   - `ADMIN_PASSWORD` = strong password
7. Run Seed command on Render shell: `node seed.js`

### Step 3: Deploy Frontend Web App (Vercel or Netlify)
1. Sign in to [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
2. Import your GitHub repository.
3. Set **Root Directory** to `client`.
4. Framework Preset: **Vite**.
5. Set Environment Variables:
   - `VITE_API_BASE_URL` = `https://your-backend-api.onrender.com` (Render URL)
   - `VITE_WHATSAPP_NUMBER` = `919417511727`
   - `VITE_STORE_PHONE` = `094175 11727`
6. Click **Deploy**.

---

## 📜 License & Copyright

© 2026 **Goel Paints and Hardware Store**. All rights reserved.
Developed by **Webcraft Solutions**.
