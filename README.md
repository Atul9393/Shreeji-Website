# Shreeji Construction Corporate Website

A professional, high-fidelity corporate website for Shreeji Construction, specializing in structural steel fabrication, erection, plant maintenance, and specialized technical manpower supply.

## 🎨 Design & Aesthetic
The site is built with an **Industrial Modern** aesthetic using modern typography (Libre Caslon Text & IBM Plex Sans), a clean grid-based layout, and color tokens:
- **Navy Blue** (Primary brand color)
- **Slate** (Neutral structural color)
- **Safety Orange** (High-visibility action/accent color)

## 📂 Project Structure
- `index.html` — Homepage featuring key statistics and capabilities.
- `who_we_are.html` — Corporate history, leadership, and financial growth profiles.
- `services.html` — Specialized capability pillars and featured projects (Tata Semiconductor Project, APH replacements).
- `manpower.html` — Segmented workforce details and dynamic job application portal.
- `compliance.html` — Legal certifications, including GST and MSME registrations.
- `contact.html` — Integrated business contact and inquiry page.
- `supabase-config.js` — Client-side Supabase database connection and submission controllers.
- `images/` — Clean, high-fidelity local image assets (logos and project imagery).

## ⚡ Supabase Configuration
To enable live database logging for contact inquiries and job applications:
1. Open [supabase-config.js](supabase-config.js).
2. Configure your live Supabase credentials:
   ```javascript
   window.SUPABASE_URL = "YOUR_SUPABASE_PROJECT_URL";
   window.SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
   ```
3. Create the following two tables in your Supabase database:
   - **`contact_inquiries`**:
     - `name` (text, required)
     - `email` (text, required)
     - `phone` (text, required)
     - `subject` (text)
     - `message` (text, required)
     - `created_at` (timestamptz)
   - **`manpower_applications`**:
     - `name` (text, required)
     - `phone` (text, required)
     - `skills` (text, required)
     - `experience` (int4, required)
     - `message` (text)
     - `created_at` (timestamptz)

*Note: If no Supabase credentials are configured, the site automatically operates in **Demo Mode**, logging all form entries into browser `LocalStorage` so the forms remain fully interactive for offline testing.*

## 🚀 Local Deployment
Since this is a client-side Tailwind and static HTML application, you can run it directly by opening `index.html` in any web browser, or serve it using a lightweight local server:
```bash
npx serve .
```
