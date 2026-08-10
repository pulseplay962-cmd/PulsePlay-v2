import { useEffect, useState } from "react";

import BrandCard from "../../components/ui/BrandCard";

import { supabase } from "../../lib/supabase";

type CommunitySignup = {
  id: string;
  name?: string;
  email?: string;
  created_at?: string;
};

export default function CommunitySignups() {
  const [signups, setSignups] = useState<CommunitySignup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSignups() {
      try {
        setLoading(true);
        setError("");

        const { data, error } = await supabase
          .from("community_signups")
          .select("*")
          .order("created_at", {
            ascending: false,
          });

        if (error) {
          throw error;
        }

        setSignups(data || []);
      } catch (err) {
        console.error("Failed to load community signups:", err);

        setError(
          "Unable to load community signups right now."
        );
      } finally {
        setLoading(false);
      }
    }

    loadSignups();
  }, []);

  return (
    <main>
      <section className="mb-10">
        <h1 className="text-4xl font-black pp-gradient-text">
          Community Signups
        </h1>

        <p className="mt-3 max-w-3xl text-slate-400">
          View people who have signed up to join the PulsePlay
          community.
        </p>
      </section>

      {loading && (
        <BrandCard>
          <div className="flex items-center gap-3">
            <span className="pp-live-dot" />

            <p className="text-slate-400">
              Loading community signups...
            </p>
          </div>
        </BrandCard>
      )}

      {!loading && error && (
        <BrandCard>
          <h2 className="text-xl font-bold text-red-400">
            Unable to Load Signups
          </h2>

          <p className="mt-3 text-slate-400">
            {error}
          </p>
        </BrandCard>
      )}

      {!loading && !error && signups.length === 0 && (
        <BrandCard>
          <h2 className="text-2xl font-bold text-white">
            No Community Signups
          </h2>

          <p className="mt-3 text-slate-400">
            No community signups have been submitted yet.
          </p>
        </BrandCard>
      )}

      {!loading && !error && signups.length > 0 && (
        <div className="space-y-4">
          {signups.map((signup) => (
            <BrandCard key={signup.id}>
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-black text-white">
                    {signup.name || "Unnamed"}
                  </h2>

                  {signup.email && (
                    <p className="mt-1 text-cyan-300">
                      {signup.email}
                    </p>
                  )}
                </div>

                {signup.created_at && (
                  <p className="text-sm text-slate-500">
                    {new Date(
                      signup.created_at
                    ).toLocaleString()}
                  </p>
                )}
              </div>
            </BrandCard>
          ))}
        </div>
      )}
    </main>
  );
}