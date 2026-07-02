// supabase-config.js

// Supabase configuration - REPLACE these with your actual Supabase project credentials if available
window.SUPABASE_URL = window.SUPABASE_URL || "";
window.SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || "";

let supabaseClient = null;

if (window.SUPABASE_URL && window.SUPABASE_ANON_KEY && typeof supabase !== 'undefined') {
    try {
        supabaseClient = supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
        console.log("Supabase initialized successfully.");
    } catch (e) {
        console.error("Failed to initialize Supabase client:", e);
    }
} else {
    console.warn("Supabase credentials missing or script not loaded. Running in local storage fallback mode.");
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
        if (error) throw error;
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
        if (error) throw error;
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
