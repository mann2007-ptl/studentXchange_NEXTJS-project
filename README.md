# StudentXchange 🎓📦

> **A modern, student-focused second-hand marketplace web application built with Next.js App Router, Tailwind CSS, and MongoDB Atlas.**

Developed as a portfolio showcase project for the **Next.js Project Submission** (Problem Statement 5: *Second-Hand Marketplace for Students*).

---

## 📌 Problem Statement

College students frequently need affordable textbooks, scientific calculators, tech accessories, dorm furniture, bicycles, and study-related supplies. Concurrently, senior and graduating students have unused items they wish to sell, donate, or exchange. 

**StudentXchange** provides a centralized, trustworthy campus marketplace where students can discover items, publish listings, contact student sellers directly, negotiate offers, and manage their marketplace activity from a dedicated dashboard.

---

## 🚀 Live Demo & Links

- **GitHub Repository:** [https://github.com/mann2007-ptl/studentXchange_NEXTJS-project](https://github.com/mann2007-ptl/studentXchange_NEXTJS-project)
- **Deployment Platform:** Vercel

---

## ✨ Core Features

### 1. 📦 Product Listings
- **Full Listing Creation:** Publish items with title, detailed description, price, category, condition, image, campus pickup location, and seller contact info.
- **Campus Categories:** Dedicated classification for *Books & Textbooks, Electronics & Tech, Dorm & Furniture, Stationery & Supplies, Bikes & Transport, and Other*.
- **Listing Types:** Support for **For Sale**, **Free (Giving Away)**, and **Open to Exchange** with distinctive color-coded badges.
- **Item Conditions:** *Brand New (Unopened)*, *Like New*, *Good*, and *Fair*.
- **Lifecycle Statuses:** Items track *Available*, *Reserved*, and *Sold* states with immediate visual indicators.

### 2. 🔍 Marketplace Discovery & Search
- **Instant Search:** Real-time search across item titles and descriptions.
- **Faceted Filters:** Interactive category pills and condition dropdown filters.
- **Price & Date Sorting:** Sort listings by *Newest First*, *Price: Low to High*, and *Price: High to Low*.
- **Product Details View:** High-resolution preview, complete specs, campus pickup location, and an automatic **Similar Items** recommendation section.

### 3. 👤 Student Seller Profiles
- **Verified Seller Cards:** Display seller name, verified student badge, university email, and phone number.
- **Direct Contacts:** 1-click `mailto:` and `tel:` links for direct communication without intermediate barriers.
- **Pickup Locations:** Exact dorm, hostel wing, library floor, or campus gate specified for safe in-person exchanges.

### 4. 💬 Structured Enquiries & Offers
- **Make an Offer Modal:** Interactive modal allowing buyers to propose a custom offer price and optional message.
- **Offer Status Tracking:** Proposals are tracked in real-time as `Pending`, `Accepted`, or `Rejected`.
- **Seller Controls:** Direct **Accept** (green) and **Reject** (red) decision buttons in the dashboard.

### 5. ❤️ Favorites & Saved Items
- **1-Click Bookmark:** Save or remove items using the heart toggle on product cards and detail pages.
- **Dedicated Saved Page:** View all bookmarked listings at `/saved` with a live item counter badge in the navigation bar.
- **Local Persistence:** Uses browser storage for zero-latency, cross-tab persistence.

### 6. 📊 Seller & Activity Dashboard
- **Overview Metrics:** Summary cards showing *Active Listings*, *Items Sold*, and *Pending Offers*.
- **My Listings Tab:** View all posted items, edit availability, mark items as *Sold*, relist, or delete items.
- **Offers & Enquiries Tab:** Review buyer proposals, offer prices, notes, contact emails, and accept or reject offers.

### 7. ⚡ One-Click Demo Data
- Built-in **"Load Demo Data"** button in the navbar and `/api/seed` endpoint that seeds 8 campus items (calculus books, TI-84 calculator, bicycle, dorm lamp, etc.) and sample offers instantly.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | Next.js 16 (App Router) |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS 4 |
| **Icons** | Lucide React |
| **Backend API** | Next.js Route Handlers (`src/app/api/...`) & Express.js |
| **Database** | MongoDB Atlas (Cloud) with Mongoose ODM |
| **Deployment** | Vercel Serverless Platform |
| **Language** | TypeScript / JavaScript |

---

## 📂 Project Architecture

```
studentxchange/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── listings/          # GET all / POST create listings
│   │   │   │   └── [id]/          # GET single / PUT update / DELETE listing
│   │   │   ├── offers/            # GET all / POST create offers
│   │   │   │   └── [id]/          # PUT accept/reject / DELETE offer
│   │   │   └── seed/              # POST seed sample campus listings
│   │   ├── dashboard/             # Seller metrics, listings & offers management
│   │   ├── listings/[id]/         # Product detail view & similar items
│   │   ├── saved/                 # Bookmarked favorites page
│   │   ├── sell/                  # Post a new listing form
│   │   ├── layout.tsx             # Root shell with Navbar & Footer
│   │   ├── page.tsx               # Marketplace discovery home
│   │   └── globals.css            # Tailwind CSS design tokens
│   ├── components/
│   │   ├── Navbar.tsx             # Sticky navigation with search & live badges
│   │   ├── ListingCard.tsx        # Reusable product card with badges & save toggle
│   │   └── OfferModal.tsx         # Interactive buyer offer submission popup
│   ├── lib/
│   │   └── db.ts                  # Cached MongoDB connection pool for serverless
│   ├── models/
│   │   ├── Listing.ts             # Mongoose listing schema
│   │   └── Offer.ts               # Mongoose offer schema
│   └── types/
│       └── index.ts               # TypeScript interfaces (IListing, IOffer)
│
├── backend/                       # Dedicated Express + Mongoose Backend
│   ├── config/db.js               # Database connection
│   ├── controllers/               # Business logic controllers
│   ├── models/                    # Mongoose schemas
│   ├── routes/                    # Express REST endpoints
│   ├── app.js                     # Express middleware setup
│   └── server.js                  # Express server entry point
│
├── .env.example                   # Environment variable template
├── .gitignore                     # Protection for secrets and node_modules
├── package.json
└── tsconfig.json
```

---

## ⚙️ Getting Started Locally

### 1. Prerequisites
- **Node.js** (v18.x or v20.x recommended)
- **npm** or **yarn**
- **MongoDB** (Local instance or free MongoDB Atlas account)

### 2. Clone the Repository
```bash
git clone https://github.com/mann2007-ptl/studentXchange_NEXTJS-project.git
cd studentXchange_NEXTJS-project/studentxchange
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string
```
*(You can use `mongodb://127.0.0.1:27017/studentxchange` for local MongoDB or your MongoDB Atlas URI).*

### 5. Run the Application
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/listings` | Fetch listings with optional `?search=`, `?category=`, and `?sort=` |
| `POST` | `/api/listings` | Create a new product listing |
| `GET` | `/api/listings/:id` | Fetch full details of a single listing |
| `PUT` | `/api/listings/:id` | Update listing or change status (`Available`/`Sold`) |
| `DELETE` | `/api/listings/:id` | Delete a listing |
| `GET` | `/api/offers` | Fetch all offers (with populated listing info) |
| `POST` | `/api/offers` | Submit an offer on a listing |
| `PUT` | `/api/offers/:id` | Update offer status (`Accepted` or `Rejected`) |
| `DELETE` | `/api/offers/:id` | Remove an offer |
| `POST` | `/api/seed` | Reset and seed database with 8 sample items & 2 offers |

---

## 🔒 Security Best Practices
- **No Credentials in Version Control:** All private database connection strings and passwords are kept in local `.env` files and excluded via `.gitignore`.
- **Input Sanitization:** Structured schemas with typed validation prevent invalid database entries.
- **SSRF & Data Safety:** Client uploads rely on safe public image hosts or verified image links.

---

## 📄 License
This project is open-source and created for academic submission and educational showcase purposes.
