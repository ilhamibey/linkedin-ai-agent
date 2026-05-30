export async function searchJobs(query: string) {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;

  const url = `https://api.adzuna.com/v1/api/jobs/fr/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=10&what=${encodeURIComponent(
    query
  )}&content-type=application/json`;

  const response = await fetch(url);

  const data = await response.json();

  return data.results || [];
}