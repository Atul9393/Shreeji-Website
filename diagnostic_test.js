/**
 * Supabase Connection Diagnostic Script
 * Runs tests to check if Supabase is configured and connects successfully.
 */

const fs = require('fs');
const path = require('path');

// 1. Check Configuration
console.log("=== STEP 1: Checking Configuration ===");

let supabaseUrl = process.env.SUPABASE_URL;
let supabaseKey = process.env.SUPABASE_ANON_KEY;

// Check if there is a .env file
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
    console.log("Found .env file. Loading variables...");
    const envContent = fs.readFileSync(envPath, 'utf8');
    const urlMatch = envContent.match(/SUPABASE_URL\s*=\s*["']?(.*?)["']?(\s|$)/);
    const keyMatch = envContent.match(/SUPABASE_ANON_KEY\s*=\s*["']?(.*?)["']?(\s|$)/);
    if (urlMatch && urlMatch[1]) supabaseUrl = urlMatch[1].trim();
    if (keyMatch && keyMatch[1]) supabaseKey = keyMatch[1].trim();
} else {
    console.log("No .env file found in the project root.");
}

// Check supabase-config.js configuration
const configPath = path.join(__dirname, 'supabase-config.js');
if (fs.existsSync(configPath)) {
    console.log("Reading supabase-config.js configurations...");
    const configContent = fs.readFileSync(configPath, 'utf8');
    const urlMatch = configContent.match(/window\.SUPABASE_URL\s*=\s*window\.SUPABASE_URL\s*\|\|\s*["'](.*?)["']/);
    const keyMatch = configContent.match(/window\.SUPABASE_ANON_KEY\s*=\s*window\.SUPABASE_ANON_KEY\s*\|\|\s*["'](.*?)["']/);
    
    if (urlMatch && urlMatch[1]) {
        console.log(`supabase-config.js SUPABASE_URL: "${urlMatch[1]}"`);
        if (!supabaseUrl) supabaseUrl = urlMatch[1];
    }
    if (keyMatch && keyMatch[1]) {
        console.log(`supabase-config.js SUPABASE_ANON_KEY: "${keyMatch[1].substring(0, 10)}..."`);
        if (!supabaseKey) supabaseKey = keyMatch[1];
    }
}

console.log("\nResolved Credentials:");
console.log(`- SUPABASE_URL: ${supabaseUrl ? supabaseUrl : "NOT CONFIGURED (Empty)"}`);
console.log(`- SUPABASE_ANON_KEY: ${supabaseKey ? "[LOADED]" : "NOT CONFIGURED (Empty)"}`);

// 2. Connection Test
console.log("\n=== STEP 2: Connection Test ===");

if (!supabaseUrl || !supabaseKey) {
    console.error("Status: Configuration Error / Authentication Error");
    console.error("Reason: Missing Supabase credentials. Cannot perform connection test.");
    process.exit(1);
}

// Attempt simple read operation
const testConnection = async () => {
    try {
        console.log(`Attempting to contact Supabase REST endpoint: ${supabaseUrl}/rest/v1/`);
        // Using built-in fetch (Node 18+) to avoid external dependencies
        const response = await fetch(`${supabaseUrl}/rest/v1/contact_inquiries?select=*&limit=1`, {
            headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`
            }
        });
        
        if (response.ok) {
            console.log("Status: Active");
            console.log("Successfully connected and authenticated with Supabase. Read operation succeeded.");
            const data = await response.json();
            console.log("Data sample:", data);
        } else {
            const errText = await response.text();
            let parsedErr;
            try { parsedErr = JSON.parse(errText); } catch(e) {}
            
            if (parsedErr && parsedErr.code === 'PGRST205') {
                console.log("Status: Active (Authenticated)");
                console.log("Authentication: SUCCESSFUL!");
                console.log("Database Connection: SUCCESSFUL!");
                console.log("Note: The connection is active and valid, but the table 'contact_inquiries' does not exist in your database schema yet.");
                console.log("Please create the tables as specified in the README.md to enable form submissions.");
            } else {
                console.error("Status: Authentication Error / Connection Failed");
                console.error(`HTTP Status: ${response.status} ${response.statusText}`);
                console.error("Details:", errText);
            }
        }
    } catch (error) {
        console.error("Status: Authentication Error / Connection Failed");
        console.error("Error Detail:", error.message);
    }
};

testConnection();
