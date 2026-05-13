# 🏗️ Shreeji Construction Website — Complete Deployment Guide

## 📦 Project Overview

A professional full-stack website for **Shreeji Construction** with:
- **Frontend**: React + Tailwind CSS (responsive, professional industrial design)
- **Backend**: Node.js + Express + SQLite (contact form API)
- **Database**: SQLite (stores contact form submissions)
- **Images**: 14 industrial construction images for gallery

## 🚀 Deployment Options (All FREE)

---

## OPTION 1: Render.com (Recommended — Full-Stack, Free Forever)

**Render** provides free web services with custom domains, HTTPS, and no credit card required. citeweb_search:24#0

### Step 1: Push to GitHub

```bash
# Create a new GitHub repository
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/shreeji-construction.git
git push -u origin main
```

### Step 2: Deploy on Render

1. Go to [render.com](https://render.com) and sign up (free, no credit card)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `shreeji-construction`
   - **Runtime**: `Node`
   - **Build Command**: `cd backend && npm install && cd ../frontend && npm install && npm run build`
   - **Start Command**: `cd backend && node server.js`
   - **Plan**: Free
5. Click **"Create Web Service"**
6. Render will provide a free URL: `https://shreeji-construction.onrender.com`

**Note**: Free services spin down after 15 min of inactivity. They restart automatically on the next request (takes ~1 min). citeweb_search:24#6

### Step 3: Add Custom Domain (FREE)

**Option A: Free Subdomain from Render**
- Your app gets `your-app-name.onrender.com` automatically

**Option B: Connect Your Own Domain**
1. In Render dashboard → Your Service → Settings → Custom Domains
2. Add your domain (e.g., from Namecheap ~$1-3/year, or free alternatives)
3. Follow DNS instructions
4. Render handles SSL automatically

---

## OPTION 2: Netlify + Separate Backend (Free Static + Free Backend)

### Frontend on Netlify (Free)

1. Build the React app locally:
```bash
cd frontend
npm install
npm run build
```

2. Go to [netlify.com](https://netlify.com), sign up (free, no credit card)
3. Drag and drop the `frontend/build` folder
4. Netlify gives you a free URL with HTTPS

**Features**: 100 GB bandwidth, 300 build minutes/month, custom domains, no ads. citeweb_search:24#0

### Backend on Render or Railway (Free)

Deploy the `backend` folder separately on Render as a Web Service.

Update frontend API calls to point to your backend URL.

---

## OPTION 3: Vercel (Frontend) + Render (Backend)

### Frontend on Vercel (Free)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com), import your repo
3. Set root directory to `frontend`
4. Deploy — gets free `.vercel.app` domain

**Features**: Global edge network, serverless functions, 100 GB bandwidth. citeweb_search:24#0

### Backend on Render (Free)

Same as Option 1 backend deployment.

---

## 🌐 Free Custom Domain Options

### 1. Render Subdomain (Instant, Free)
- `shreeji-construction.onrender.com`
- No setup needed, included with free tier

### 2. Namecheap (~$1-3/year for .xyz, .store)
- Most affordable paid option
- Full ownership and control
- Professional for business use

### 3. EU.org (Free, but requires approval)
- Apply at [eu.org](https://nic.eu.org)
- Free forever, but 3-7 day approval process
- Good for non-commercial projects

### ⚠️ Note on Freenom
Freenom (.tk, .ml, .ga, .cf, .gq) has stopped new registrations as of 2023-2024 and existing domains face reliability issues. Not recommended for business use. citeweb_search:24#3web_search:24#7

---

## 📁 Project Structure

```
shreeji-website/
├── backend/
│   ├── package.json          # Express, SQLite, CORS dependencies
│   ├── server.js             # API server + static file serving
│   └── .env                  # Environment variables
├── frontend/
│   ├── package.json          # React, Router, Lucide icons
│   ├── public/
│   │   ├── index.html        # HTML template with Tailwind CDN
│   │   └── images/           # 14 gallery images
│   └── src/
│       ├── index.js          # React entry point
│       ├── App.js            # Router setup
│       ├── index.css         # Global styles
│       ├── components/
│       │   ├── Navbar.js     # Responsive navigation
│       │   └── Footer.js     # Site footer
│       └── pages/
│           ├── Home.js       # Hero, stats, services preview, clients, CTA
│           ├── About.js      # Story, mission, vision, timeline, values
│           ├── Services.js   # Manpower, fabrication, maintenance details
│           ├── Gallery.js    # Filterable image gallery with lightbox
│           └── Contact.js    # Contact form + info + map
├── package.json              # Root package for Render
├── render.yaml               # Render deployment config
├── README.md                 # Documentation
└── .gitignore
```

---

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/contact` | Submit contact form (stores in SQLite) |
| GET | `/api/contacts` | Get all submissions (admin) |

---

## 🎨 Design Features

- **Color Scheme**: Professional navy (#0a1929) + amber accent (#f59e0b)
- **Typography**: Inter (body) + Playfair Display (headings)
- **Responsive**: Mobile-first, works on all devices
- **Animations**: Fade-in, hover effects, smooth scrolling
- **Gallery**: Category filtering + lightbox modal
- **Contact Form**: Full validation + backend storage + success feedback

---

## ✅ Pre-Deployment Checklist

- [ ] All 5 pages created and routed
- [ ] Contact form submits to backend successfully
- [ ] Gallery images display correctly
- [ ] Mobile responsive (test on phone)
- [ ] All company data is accurate (GST, MSME, contact info)
- [ ] Images optimized and loaded
- [ ] No console errors

---

## 📞 Support

**Shreeji Construction**
- Phone: +91 95582 48485 / +91 97274 48640
- Email: shreejiconstruction2007@zohomail.in
- Address: Plot No. 855/859, Shivay Bungalow, Bhavnagar, Gujarat

---

*Built with ❤️ for Shreeji Construction | Est. 2007*
