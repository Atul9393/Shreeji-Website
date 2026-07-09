// supabase-config.js

// Supabase configuration - values can be injected directly or loaded locally
window.SUPABASE_URL = window.SUPABASE_URL || "https://rgzuxchfcmysszcqvkmm.supabase.co";
window.SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || "sb_publishable_JTE1q7p1Ik3WgwAf3UWGoA_M-OnGjyM";

let supabaseClient = null;

// Dynamically load from local .env ONLY during local development (localhost)
async function initSupabase() {
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    if (isLocalhost) {
        try {
            const response = await fetch('/.env');
            if (response.ok) {
                const text = await response.text();
                const lines = text.split('\n');
                for (const line of lines) {
                    const trimmed = line.trim();
                    if (!trimmed || trimmed.startsWith('#')) continue;
                    const parts = trimmed.split('=');
                    if (parts.length >= 2) {
                        const key = parts[0].trim();
                        const val = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
                        if (key === 'SUPABASE_URL') window.SUPABASE_URL = val;
                        if (key === 'SUPABASE_ANON_KEY') window.SUPABASE_ANON_KEY = val;
                    }
                }
            }
        } catch (e) {
            console.log("Local .env file not loaded/accessible:", e.message);
        }
    }

    if (window.SUPABASE_URL && window.SUPABASE_ANON_KEY && typeof supabase !== 'undefined') {
        try {
            supabaseClient = supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
            console.log("Supabase initialized successfully.");
        } catch (e) {
            console.error("Failed to initialize Supabase client:", e);
        }
    } else {
        console.warn("Using Local Storage Fallback Mode. Dynamic database entries will not sync to the cloud.");
    }
}

// Run initialization
initSupabase();

// Wrapper helper to standardize error reporting and response objects
function handleDatabaseError(error) {
    console.error("Database operation failed:", error);
    // User-friendly error message that hides sensitive Postgres database schemas
    return new Error("We encountered a database error. Please verify your inputs and try again.");
}

// Submits a contact form inquiry
async function submitContactForm(data) {
    if (supabaseClient) {
        const { data: resData, error } = await supabaseClient
            .from('contact_inquiries')
            .insert([
                {
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    subject: data.subject || 'General Inquiry',
                    message: data.message,
                    created_at: new Date().toISOString()
                }
            ]);
        if (error) throw handleDatabaseError(error);
        return { success: true, mode: 'supabase', data: resData };
    } else {
        // Fallback: save to LocalStorage so the form works in offline testing
        const inquiries = JSON.parse(localStorage.getItem('contact_inquiries') || '[]');
        const newInquiry = {
            id: 'mock_' + Date.now(),
            ...data,
            created_at: new Date().toISOString()
        };
        inquiries.push(newInquiry);
        localStorage.setItem('contact_inquiries', JSON.stringify(inquiries));
        console.log("Mock saved contact inquiry:", newInquiry);
        return { success: true, mode: 'mock', data: newInquiry };
    }
}

// Submits a manpower job application
async function submitManpowerApplication(data) {
    if (supabaseClient) {
        const { data: resData, error } = await supabaseClient
            .from('manpower_applications')
            .insert([
                {
                    name: data.name,
                    phone: data.phone,
                    skills: data.skills,
                    experience: data.experience,
                    message: data.message,
                    created_at: new Date().toISOString()
                }
            ]);
        if (error) throw handleDatabaseError(error);
        return { success: true, mode: 'supabase', data: resData };
    } else {
        // Fallback: save to LocalStorage
        const applications = JSON.parse(localStorage.getItem('manpower_applications') || '[]');
        const newApp = {
            id: 'mock_' + Date.now(),
            ...data,
            created_at: new Date().toISOString()
        };
        applications.push(newApp);
        localStorage.setItem('manpower_applications', JSON.stringify(applications));
        console.log("Mock saved manpower application:", newApp);
        return { success: true, mode: 'mock', data: newApp };
    }
}

// Make helpers globally available
window.submitContactForm = submitContactForm;
window.submitManpowerApplication = submitManpowerApplication;
