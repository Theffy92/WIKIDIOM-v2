export async function getAIExample(idiom, meaning, language= "English") {
    const prompt = `Give me a natural, short example sentence using the idiom "${idiom}" in "${language}". The meaning is "${meaning}". The example should be relevant to the idiom's meaning and should not be a translation of the idiom itself.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPEN_AI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4.1",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 60,
            temperature: 0.7,
        })
    });

    const data = await response.json();
    return data.choices[0].message?.content?.trim() || "No example generated.";
}