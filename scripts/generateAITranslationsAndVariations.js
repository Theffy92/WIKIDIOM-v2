require('dotenv').config();
const fs = require('fs');
const path = require('path');
const seedData = require('../data/seedData');
const fetch = (...args) => import('node-fetch').then(mod => mod.default(...args));

const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY;
if (!OPEN_AI_API_KEY) {
  console.error("OPEN_AI_API_KEY is not set in the environment variables.");
  process.exit(1);
}   

async function getAITranslation(example, targetLanguage){
    const prompt = `Translate the following sentence to ${targetLanguage}, making sure to use a neutral, widely understood version of the idiom. Avoid regional slang or country-specific phrases-use language that would be understood by speakers of "${targetLanguage}" in any country. Keep the idiomatic meaning: "${example}". Ensure the translation is natural and idiomatic in the target language.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPEN_AI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4.1",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 60,
            temperature: 0.7,
        })
    });

    const data = await response.json();
    if (data.error) {
        console.error('OpenAI API error:', data.error);
        return "No translation generated.";
    }
    return data.choices?.[0]?.message?.content?.trim() || "No translation generated.";
}

// Function to generate example variations of an idiom
async function getAIVariationExample(mainExample, variation, country, language){
    const prompt = `Generate a natural, short example sentence using the idiom "${variation}" in "${language}" for speakers in ${country}. The main example is: "${mainExample}". The variation should be relevant to the idiom's meaning and should not be a translation of the idiom itself.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPEN_AI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4.1",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 60,
            temperature: 0.7,
        })
    });

    const data = await response.json();
    if (data.error) {
        console.error('OpenAI API error:', data.error);
        return "No variation example generated.";
    }
    return data.choices?.[0]?.message?.content?.trim() || "No variation example generated.";
}

console.log("Script started");
async function main() {
    for (let idiom of seedData) {
        console.log(`Processing idiom: ${idiom.idiom}`);
        // Generate AI translations for each example
        idiom.examplesTranslation = [];
        for (const ex of idiom.examples) {
            let targetLanguage = idiom.language === "English" ? "Spanish" : "English";
            const translation = await getAITranslation(ex, targetLanguage);
            idiom.examplesTranslation.push(translation);
        }

        // Generate AI variations for each idiom
        if (idiom.countryVariations) {
            for (const lang in idiom.countryVariations) {
                for (const variation of idiom.countryVariations[lang]) {
                    variation.examples = [];
                    for (const ex of idiom.examples) {
                        console.log(`Adapting: ${ex} to ${variation.variation} (${lang}, ${variation.country})`);
                        const adaptedExample = await getAIVariationExample(ex, variation.variation, variation.country, lang);
                        variation.examples.push(adaptedExample);
                    }
                }
            }
        }
    }

    
    // Write the updated seedData back to the file
    const fileContent = `const seedData = ${JSON.stringify(seedData, null, 2)};\n\nmodule.exports = seedData;\n`;
    fs.writeFileSync(path.join(__dirname, '../data/seedData.js'), fileContent, 'utf8');
    console.log('AI translations and variations generated and seedData.js updated!');
}

main().then(() => console.log("Script finished"));