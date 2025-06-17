require('dotenv').config();
const fs = require('fs');
const path = require('path');
const seedData = require('../data/seedData');
// const fetch = require('node-fetch');
const fetch = (...args) => import('node-fetch').then(mod => mod.default(...args));

const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY;
console.log("OPEN_AI_API_KEY:", OPEN_AI_API_KEY); 

async function getAIExample(idiom, meaning, language = "English") {
  const prompt = `Give me a natural, short example sentence using the idiom "${idiom}" in "${language}". The meaning is "${meaning}". The example should be relevant to the idiom's meaning and should not be a translation of the idiom itself.`;

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
    console.log("API response for idiom:", idiom, data); // Add this line
  if (data.error) {
    console.error('OpenAI API error:', data.error);
  }
  return data.choices?.[0]?.message?.content?.trim() || "No example generated.";
}

async function main() {
  for (let idiom of seedData) {
    // if (!idiom.examples || idiom.examples.length === 0 || idiom.examples[0].startsWith("AI:")) {
    //   console.log(`Generating AI example for: ${idiom.idiom}`);
    //   const aiExample = await getAIExample(idiom.idiom, idiom.meaning, idiom.language);
    //   idiom.examples = [aiExample];
    // }
    console.log(`Generating AI example for: ${idiom.idiom}`);
    const aiExample = await getAIExample(idiom.idiom, idiom.meaning, idiom.language);
    idiom.examples = [aiExample];
  }

  // Write the updated seedData back to the file
  const fileContent = `const seedData = ${JSON.stringify(seedData, null, 2)};\n\nmodule.exports = seedData;\n`;
  fs.writeFileSync(path.join(__dirname, '../data/seedData.js'), fileContent, 'utf8');
  console.log('AI examples generated and seedData.js updated!');
}

main();