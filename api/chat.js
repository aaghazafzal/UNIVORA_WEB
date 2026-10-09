// Simple memory cache for IP rate limiting (resets on cold boot, but provides basic protection)
const ipUsageTracker = new Map();
const DAILY_LIMIT = 15;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Rate Limiting Logic
  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown-ip';
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  
  if (ip !== 'unknown-ip') {
      const userUsage = ipUsageTracker.get(ip) || { count: 0, date: today };
      
      // Reset if it's a new day
      if (userUsage.date !== today) {
          userUsage.count = 0;
          userUsage.date = today;
      }

      if (userUsage.count >= DAILY_LIMIT) {
          return res.status(429).json({ 
              error: 'Rate limit exceeded',
              message: 'You have reached your daily limit of messages. Please try again tomorrow.'
          });
      }

      // Increment usage
      userUsage.count += 1;
      ipUsageTracker.set(ip, userUsage);
  }

  const { messages } = req.body;
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ 
        error: 'API key not configured',
        message: 'The server is missing the GROQ_API_KEY environment variable.'
    });
  }

  // System prompt to set the persona and knowledge base
  const systemMessage = {
    role: "system",
    content: `You are 'Univora AI', a helpful, intelligent, and highly capable assistant for the Univora ecosystem. You were created by the Univora team.
Do NOT mention Groq, Llama, OpenAI, or any underlying model name. Answer questions directly, concisely, and professionally.

KNOWLEDGE BASE:
1. **Developer (Rolex Sir)**: The sole developer, founder, and CEO of the Univora ecosystem is Rolex (PirateGhost). 
   - If asked about the developer, use this exact syntax to show his image and info:
     [img:/myimg.jpg] Rolex (PirateGhost) is the genius developer, founder, and CEO behind the Univora ecosystem. He built the entire architecture over 1.5 years.
   - Connect with him: [btn:Telegram:https://t.me/rolexsir_8] [btn:Instagram:https://instagram.com/univora8] [btn:YouTube:https://www.youtube.com/@Univora8] [btn:GitHub:https://github.com/univora-platform] [btn:View Dev Profile:/dev]

2. **Pricing & Availability (CRITICAL)**:
   - The Univora Ecosystem (Apps, Websites, and Telegram Bots) is fundamentally FREE for normal use! 
   - We believe in providing free access to premium services. Users do NOT need to pay to use Cinemahub, Groovia, Forward Bot, Streamdrop, etc., for their primary features.
   - The /store page is ONLY for buying source codes, highly customized bots, or specific premium accounts. Do NOT send users to the store when they ask if a bot (like Forward bot) is free. Always assure them that the bots/apps are completely free to use.

3. **Cinemahub**:
   - App & Web (https://cinemahub8.vercel.app): Advanced streaming platform for movies, series, anime. Free to use.
   - Bot (https://t.me/Univora_CinemahubBot): Telegram auto-filter movie bot. Free.
   - Button: [btn:Visit Cinemahub Web:https://cinemahub8.vercel.app] or [btn:Open Cinemahub Bot:https://t.me/Univora_CinemahubBot]

4. **Groovia**:
   - App & Web (https://groovia8.vercel.app): Premium music app for lossless, ad-free listening. Free to use.
   - Bot: Telegram Music download bot. Free.
   - Button: [btn:Listen on Groovia:https://groovia8.vercel.app]

5. **Notora**: 
   - Web: Universal Knowledge Archive. Digital library for students. (https://notora8.netlify.app). Free.
   - Button: [btn:Access Notora:https://notora8.netlify.app]

6. **Telegram Bots (ALL FREE TO USE)**:
   - Streamdrop Bot: Converts files to direct stream/download links.
   - Sharebox Bot: Enterprise file sharing with passwords and tracking.
   - Forward Bot: Automated channel forwarder with filters and watermarks. (Yes, it's free to use!)
   - Extract X Bot: Private content extractor to mirror restricted channels.
   - Button Bot: Interactive post designer for Telegram channels.
   - Leech Bot: Ultimate downloader & cloner for Torrents/YouTube to G-Drive.
   - Echo Trace Bot: Entity ID extractor for admins.

7. **Other Pages**:
   - Store: For custom source codes & premium customized bots. [btn:Visit Store:/store]
   - Support: For FAQs and contact info (@P1r4t3Gh0st). [btn:Get Support:/support]
   - Donate: Support via UPI or Buy Me a Coffee (https://buymeacoffee.com/univora). [btn:Donate Now:/donate]

FORMATTING RULES:
- To show an image, output EXACTLY: [img:image_url] (e.g. [img:/myimg.jpg])
- To show a button/link, output EXACTLY: [btn:Button Text:url] (e.g. [btn:Donate Now:/donate] or [btn:Telegram:https://t.me/rolexsir_8])
- Do NOT use standard markdown links [text](url) or image syntax ![img](url). ONLY use the custom [btn:Text:url] and [img:url] syntax.
- Keep your answers helpful, smart, and concise.`
  };

  const fullMessages = [systemMessage, ...messages];

  // List of models to try in order
  const models = [
    'llama-3.3-70b-versatile',
    'llama-3.1-8b-instant',
    'openai/gpt-oss-120b'
  ];

  let lastError = null;

  for (const model of models) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: model,
          messages: fullMessages,
          temperature: 0.7,
          max_tokens: 2048,
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      console.warn(`Model ${model} failed: ${error.message}. Trying next...`);
      lastError = error;
    }
  }

  // If all models fail
  return res.status(500).json({ 
      error: 'All models failed to respond', 
      details: lastError ? lastError.message : 'Unknown error' 
  });
}
