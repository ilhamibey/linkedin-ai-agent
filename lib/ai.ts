import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// ANALYSE MATCH CV / JOB
export async function analyzeMatch(profile: string, job: string) {
  const response = await client.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    {
      role: "system",
      content: `
Tu es un moteur d'analyse automatisé de matching CV / offre.

RÈGLES ABSOLUES :
- Tu ne refuses jamais une analyse
- Tu ne parles jamais de liens externes
- Tu ne poses jamais de questions
- Tu ne fais aucun commentaire hors JSON
- Tu retournes UNIQUEMENT du JSON valide

SORTIE OBLIGATOIRE :

{
  "score": number (0-100),
  "summary": string,
  "missing_skills": string[],
  "strengths": string[],
  "advice": string
}
      `,
    },
    {
      role: "user",
      content: `
PROFILE:
${profile}

JOB:
${job}
      `,
    },
  ],
  temperature: 0.2,
});

  return response.choices[0].message.content;
}