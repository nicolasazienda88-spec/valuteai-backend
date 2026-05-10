import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { title, description, condition } = req.body;

  try {

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{
        role: "user",
        content: `
Valuta oggetto:

Titolo: ${title}
Descrizione: ${description}
Condizione: ${condition}

Rispondi con:
- prezzo minimo
- prezzo massimo
- spiegazione breve
        `
      }]
    });

    res.status(200).json({
      result: response.choices[0].message.content
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
