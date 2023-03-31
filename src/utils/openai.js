const fetchOpenAIResponse = async (prompt) => {
    try {
        const response = await fetch('https://api.openai.com/v1/engines/text-davinci-002/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                prompt: prompt,
                max_tokens: 100,
                n: 1,
                stop: null,
                temperature: 0.5,
            }),
        });

        const data = await response.json();
        console.log('API response data:', data);

        if (data.choices && data.choices.length > 0) {
            return data.choices[0].text.trim();
        } else {
            throw new Error('No response from the API');
        }
    } catch (error) {
        console.error('Error fetching OpenAI response:', error);
        return 'An error occurred while processing your request. Please try again.';
    }
};

export default fetchOpenAIResponse;
