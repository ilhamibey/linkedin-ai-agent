export async function fetchJobs() {
  const token = process.env.APIFY_API_TOKEN;

  const response = await fetch(
    `https://api.apify.com/v2/acts/Tqf2jTDfxkqpSzWIV/runs?token=${token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keywords: "React developer",
        location: "France",
        maxItems: 20,
      }),
    }
  );

  const data = await response.json();

  return data;
}