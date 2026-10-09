const fetch = require('node-fetch'); // or use native fetch if node 18+

async function test() {
    const payload = {
        service_type: "bot",
        service_name: "Test Bot",
        category_key: "bug",
        description: "This is a test description over 20 characters",
        submitter_name: "Test"
    };

    const res = await fetch('https://report-bot-leze.onrender.com/api/reports/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': 'univora_api_2026_xyz123abcdefg'
        },
        body: JSON.stringify(payload)
    });

    console.log("Status:", res.status);
    const text = await res.text();
    console.log("Response Body:", text);
}

test();
