import { supabase } from "@/lib/supabase";

export default async function Dashboard() {

  const { data } = await supabase
    .from("analyses")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-8">
        Analysis History
      </h1>

      <div className="space-y-6">
        {data?.map((item) => (
          <div
            key={item.id}
            className="bg-zinc-900 p-6 rounded-xl"
          >
            <p className="text-sm text-zinc-400">
              {item.user_email}
            </p>

            <pre className="mt-4 whitespace-pre-wrap">
              {JSON.stringify(item.result, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </main>
  );
}