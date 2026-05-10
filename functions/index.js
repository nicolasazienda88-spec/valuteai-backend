const functions = require("firebase-functions");
const OpenAI = require("openai");

// 🔐 API KEY SOLO BACKEND
const openai = new OpenAI({
  apiKey: "IL_TUO_NOME"
});

exports.analyzeItem = functions.https.onRequest(async (req, res) => {

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).send("");
  }

  const { title, description, condition } = req.body;

  const prompt = `
Sei un esperto di valutazione oggetti usati.

Titolo: ${title}
Descrizione: ${description}
Condizione: ${condition}

Rispondi con:
- prezzo minimo
- prezzo massimo
- breve spiegazione
`;

  try {

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: prompt }
      ]
    });

    const result = response.choices[0].message.content;

    return res.json({ result });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

});