import { searchJobs } from "../../../lib/jobs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { job } = body;

    // Recherche vraies offres
    const jobs = await searchJobs(job);

    // Transformation frontend
    const results = jobs.map((job: any) => ({
      job_title: job.title,
      company: job.company?.display_name,
      summary: job.description?.slice(0, 200),
      score: Math.floor(Math.random() * 40) + 60,
      url: job.redirect_url,
    }));

    return Response.json({
      results,
    });

  } catch (error) {
    console.log(error);

    return Response.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}