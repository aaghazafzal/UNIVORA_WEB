export const getAIResponse = async (messages) => {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ messages })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("AI API Error:", errorData);
            if (response.status === 500 && errorData.error === 'API key not configured') {
                return "System Error: Univora AI is currently offline. (API Key missing in environment).";
            }
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.choices && data.choices.length > 0) {
            return data.choices[0].message.content;
        } else {
            throw new Error("Invalid response format from AI");
        }
    } catch (error) {
        console.error("AI Service Error:", error);
        return "I'm sorry, I'm currently experiencing network issues. Please try again later.";
    }
};
