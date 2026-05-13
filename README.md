# Shreeji Construction Website

A full-stack website for Shreeji Construction with React frontend and Node.js/Express backend.

## Features
- **Home Page**: Company overview with stats, services preview, client showcase
- **About Page**: Company history, mission, vision, timeline, values, certifications
- **Services Page**: Detailed service descriptions with workforce categories
- **Gallery Page**: Image gallery with category filtering and lightbox
- **Contact Page**: Contact form with backend API + direct contact info

## Tech Stack
- Frontend: React, React Router, Tailwind CSS (via CDN), Lucide React icons
- Backend: Node.js, Express, SQLite3, CORS
- Database: SQLite (contact form submissions)

## Local Development

### Backend
```bash
cd backend
npm install
npm start
```
Server runs on http://localhost:3001

### Frontend
```bash
cd frontend
npm install
npm start
```
Client runs on http://localhost:3000

## Deployment (Render.com - FREE)

1. Create a GitHub repository and push this code
2. Go to [render.com](https://render.com) and sign up (free)
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: shreeji-construction
   - **Runtime**: Node
   - **Build Command**: `cd backend && npm install && cd ../frontend && npm install && npm run build`
   - **Start Command**: `cd backend && node server.js`
6. Click "Create Web Service"
7. Render will provide a free URL like `https://shreeji-construction.onrender.com`

## Free Custom Domain (Freenom)

1. Go to [freenom.com](https://freenom.com)
2. Search for a free domain (e.g., shreejiconstruction.tk, .ml, .ga, .cf, .gq)
3. Register it (free for 12 months, renewable)
4. In Render dashboard, go to your service → Settings → Custom Domains
5. Add your domain and follow DNS instructions
6. Update DNS records in Freenom to point to Render

## API Endpoints
- `GET /api/health` - Health check
- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - Get all contacts (admin)

## Contact
Shreeji Construction
- Phone: +91 95582 48485 / +91 97274 48640
- Email: shreejiconstruction2007@zohomail.in
