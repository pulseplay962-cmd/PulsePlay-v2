import { useEffect, useState } from "react";

import BrandCard from "../../components/ui/BrandCard";
import { supabase } from "../../lib/supabase";

type PartnershipInquiry = {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  website?: string;
  partnership_type: string;
  message: string;
  campaign_start?: string;
  campaign_end?: string;
  budget?: string;
  how_heard?: string;
  status: string;
  admin_notes?: string;
  created_at: string;
};

const statuses = ["New", "Contacted", "Negotiating", "Active Partner", "Closed"];

export default function Partnerships() {
  const [inquiries, setInquiries] = useState<PartnershipInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadInquiries() {
    try {
      setLoading(true);
      setError("");

      const { data, error: queryError } = await supabase
        .from("partnership_inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (queryError) throw queryError;
      setInquiries(data || []);
    } catch (err) {
      console.error("Failed to load partnership inquiries:", err);
      setError("Unable to load partnership inquiries right now.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadInquiries();
  }, []);

  async function updateStatus(id: string, status: string) {
    const { error: updateError } = await supabase
      .from("partnership_inquiries")
      .update({ status })
      .eq("id", id);

    if (updateError) {
      console.error("Failed to update partnership status:", updateError);
      setError("Unable to update the partnership status.");
      return;
    }

    setInquiries((current) =>
      current.map((inquiry) =>
        inquiry.id === id ? { ...inquiry, status } : inquiry
      )
    );
  }

  return (
    <main>
      <section className="mb-10">
        <div className="text-sm font-black tracking-[0.25em] text-cyan-400">
          🤝 PARTNERSHIP CONTROL CENTER
        </div>
        <h1 className="mt-3 text-4xl font-black pp-gradient-text">
          Partnerships
        </h1>
        <p className="mt-3 max-w-3xl text-slate-400">
          Review incoming brand opportunities and manage partnership requests.
        </p>
      </section>

      {loading && (
        <BrandCard>
          <div className="flex items-center gap-3 text-slate-400">
            <span className="pp-live-dot" /> Loading partnership inquiries...
          </div>
        </BrandCard>
      )}

      {!loading && error && (
        <BrandCard>
          <p className="text-red-400">{error}</p>
        </BrandCard>
      )}

      {!loading && !error && inquiries.length === 0 && (
        <BrandCard>
          <h2 className="text-2xl font-black text-white">No Partnership Requests</h2>
          <p className="mt-3 text-slate-400">
            New partnership inquiries will appear here when brands submit the public form.
          </p>
        </BrandCard>
      )}

      {!loading && inquiries.length > 0 && (
        <div className="space-y-5">
          {inquiries.map((inquiry) => (
            <BrandCard key={inquiry.id}>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="text-xs font-black tracking-[0.2em] text-purple-400">
                      {inquiry.partnership_type}
                    </div>
                    <h2 className="mt-2 text-2xl font-black text-white">
                      {inquiry.company_name}
                    </h2>
                    <p className="mt-1 text-cyan-300">
                      {inquiry.contact_name} • {inquiry.email}
                    </p>
                    {inquiry.website && (
                      <a
                        href={inquiry.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-sm text-slate-400 hover:text-cyan-300"
                      >
                        {inquiry.website}
                      </a>
                    )}
                  </div>

                  <select
                    value={inquiry.status}
                    onChange={(e) => updateStatus(inquiry.id, e.target.value)}
                    className="rounded-xl border border-cyan-400/20 bg-black/50 p-3 font-bold text-white"
                  >
                    {statuses.map((status) => <option key={status}>{status}</option>)}
                  </select>
                </div>

                <div className="rounded-xl border border-white/5 bg-black/20 p-4">
                  <p className="whitespace-pre-wrap leading-relaxed text-slate-300">
                    {inquiry.message}
                  </p>
                </div>

                <div className="grid gap-3 text-sm text-slate-400 md:grid-cols-4">
                  <div><span className="font-bold text-slate-300">Budget:</span> {inquiry.budget || "Not provided"}</div>
                  <div><span className="font-bold text-slate-300">Start:</span> {inquiry.campaign_start || "Not provided"}</div>
                  <div><span className="font-bold text-slate-300">End:</span> {inquiry.campaign_end || "Not provided"}</div>
                  <div><span className="font-bold text-slate-300">Source:</span> {inquiry.how_heard || "Not provided"}</div>
                </div>

                <div className="border-t border-white/10 pt-3 text-xs text-slate-500">
                  Received {new Date(inquiry.created_at).toLocaleString()}
                </div>
              </div>
            </BrandCard>
          ))}
        </div>
      )}
    </main>
  );
}
