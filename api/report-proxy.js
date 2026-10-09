export default async function handler(req, res) {
    const TARGET_URL = 'https://report-bot-leze.onrender.com';
    // Use the API key from Vercel Environment Variables.
    const API_KEY = process.env.VITE_REPORT_API_KEY || process.env.REPORT_API_KEY;

    if (!API_KEY) {
        console.error("Missing API Key on Server");
        return res.status(500).json({ success: false, error: "Server Configuration Error: Missing API Key" });
    }

    const { endpoint } = req.query;
    if (!endpoint) {
        return res.status(400).json({ success: false, error: "Missing endpoint parameter" });
    }

    // Capture client IP to forward to the backend for accurate rate limiting
    const clientIp = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.socket?.remoteAddress;

    try {
        const fetchOptions = {
            method: req.method,
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': API_KEY,
            }
        };

        if (clientIp) {
            fetchOptions.headers['X-Forwarded-For'] = clientIp;
        }

        if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
            fetchOptions.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
        }

        // Reconstruct query parameters (excluding our custom 'endpoint' param)
        const urlParams = new URLSearchParams();
        for (const [key, value] of Object.entries(req.query)) {
            if (key !== 'endpoint') {
                urlParams.append(key, value);
            }
        }
        
        const queryString = urlParams.toString();
        const finalUrl = `${TARGET_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;

        const response = await fetch(finalUrl, fetchOptions);
        
        let data;
        const textData = await response.text();
        
        try {
            data = textData ? JSON.parse(textData) : { success: response.ok };
        } catch (e) {
            console.error("Non-JSON response from Render:", textData);
            data = { success: false, error: "Server returned an invalid response", details: textData.substring(0, 100) };
        }
        
        return res.status(response.status).json(data);
    } catch (error) {
        console.error("Proxy Error:", error);
        return res.status(500).json({ success: false, error: "Internal Server Error while reaching Report Bot" });
    }
}
