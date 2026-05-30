"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("");
  const [job, setJob] = useState("");

  const [loading, setLoading] = useState(false);

  // results = tableau de jobs
  const [results, setResults] = useState<any[]>([]);

  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      setError("");
      setResults([]);

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          profile,
          job,
        }),
      });

      const data = await response.json();

      console.log("RAW RESPONSE:", data);

      // IMPORTANT
      setResults(data.results || []);
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold">LinkedIn AI Agent</h1>
              <span>BAYSAL Ilhami</span>
          </div>

          <p className="text-zinc-400 mt-2">
            Trouve les meilleurs jobs grâce à l’IA
          </p>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          {/* EMAIL */}
          <input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 outline-none"
          />

          {/* PROFILE */}
          <textarea
            placeholder="Collez votre CV ou profil LinkedIn"
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            className="w-full h-40 p-4 rounded-xl bg-zinc-900 border border-zinc-800 outline-none"
          />

          {/* JOB */}
          <input
            type="text"
            placeholder="Ex: Développeur React"
            value={job}
            onChange={(e) => setJob(e.target.value)}
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 outline-none"
          />

          {/* BUTTON */}
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full p-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Analyse..." : "Analyze"}
          </button>
        </div>

        {/* ERROR */}
        {error && <div className="mt-6 p-4 bg-red-900 rounded-xl">{error}</div>}

        {/* RESULTS */}
        {results.length > 0 && (
          <div className="mt-10 space-y-6">
            <h2 className="text-2xl font-bold">Résultats</h2>

            {results.map((job, index) => (
              /* 
              <a
  href={job.url}
  target="_blank"
  className="inline-block mt-4 text-blue-400"
>
  Voir l'offre →
</a>
              */

              <div
                key={index}
                className="p-6 rounded-2xl bloc-result bg-zinc-900 border border-zinc-800"
              >
                {/* TITLE */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold title-job-searched">{job.job_title}</h3>

                    <p className="text-zinc-400">{job.company}</p>
                  </div>

                  {/* SCORE */}
                  <div className="text-right">
                    <p className="text-3xl font-bold text-green-400">
                      {job.score}%
                    </p>
                    <p className="text-sm text-zinc-500">Match</p>

                    
                  </div>
                </div>

                {/* SUMMARY */}
                <p className="mt-4 text-zinc-300">{job.summary}</p>

                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-blue-400 hover:text-blue-300"
                >
                  Voir l'offre →
                </a>
              </div>
            ))}
          </div>
        )}
        <div className="mt-10">
          <p className="text-sm text-zinc-500">
            BAYSAL Ilhami
          </p>
          <p className="text-sm text-zinc-500">
            <a href="https://www.linkedin.com/in/ilhami-baysal-455b13137/"  target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </p>
          <p className="text-sm text-zinc-500">
            <a href="https://github.com/ilhamibey/"  target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </p>
          <p className="text-sm text-zinc-500">
            ilhami.baysal@yahoo.fr
          </p>
          <p className="text-sm text-zinc-500">
            06 24 20 18 73
          </p>
        </div>
      </div>
    </main>
  );
}
