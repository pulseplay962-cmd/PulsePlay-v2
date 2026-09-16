import { useState } from "react";

import BrandCard from "../components/ui/BrandCard";
import BrandButton from "../components/ui/BrandButton";
import { submitPartnershipInquiry } from "../services/partnerships";

const partnershipTypes = [
  "Sponsorship",
  "Product collaboration",
  "Affiliate partnership",
  "Sponsored content",
  "Product review",
  "Giveaway",
  "Creator partnership",
  "Other",
];

export default function Partners() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    company_name: "",
    contact_name: "",
    email: "",
    website: "",
    partnership_type: "Sponsorship",
    message: "",
    campaign_start: "",
    campaign_end: "",
    budget: "",
    how_heard: "",
  });

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await submitPartnershipInquiry({
        ...form,
        website: form.website || undefined,
        campaign_start: form.campaign_start || undefined,
        campaign_end: form.campaign_end || undefined,
        budget: form.budget || undefined,
        how_heard: form.how_heard || undefined,
      });

      setSubmitted(true);
      setForm({
        company_name: "",
        contact_name: "",
        email: "",
        website: "",
        partnership_type: "Sponsorship",
        message: "",
        campaign_start: "",
        campaign_end: "",
        budget: "",
        how_heard: "",
      });
    } catch (err: any) {
      console.error("Partnership inquiry error:", err);
      setError(err?.message || "Unable to submit the partnership request.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-black/40 p-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50";

  return (
    <main className="px-6 py-16 md:py-20">
      <section className="mx-auto max-w-6xl text-center">
        <div className="inline-flex rounded-full px-5 py-2 pp-hud text-sm font-black tracking-[0.25em] text-cyan-300">
          🤝 PARTNERSHIP NETWORK
        </div>

        <h1 className="mt-8 text-5xl font-black pp-gradient-text md:text-6xl">
          PARTNER WITH PULSEPLAY
        </h1>

        <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-400">
          LEVEL UP TOGETHER. PulsePlay.online connects gaming, streaming,
          community, content, and gaming products through one unified command
          center.
        </p>
      </section>

      <section className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          ["🎮", "Gaming-Focused Exposure", "Reach players, creators, and gaming enthusiasts through PulsePlay content and channels."],
          ["📡", "Creator Integration", "Explore Twitch and creator-focused activations built around authentic gaming content."],
          ["📱", "Social Promotion", "Potential campaign support across Facebook, short-form video, Reels, and community content."],
          ["📰", "Editorial Content", "Feature relevant products and brands through gaming guides, reviews, news, and sponsored content."],
          ["🎁", "Community Activations", "Build engagement through giveaways, community events, launches, and special campaigns."],
          ["⚡", "Affiliate Partnerships", "Connect relevant gaming products with the PulsePlay commerce and content ecosystem."],
        ].map(([icon, title, description]) => (
          <BrandCard key={title}>
            <div className="text-3xl">{icon}</div>
            <h2 className="mt-4 text-xl font-black text-white">{title}</h2>
            <p className="mt-3 leading-relaxed text-slate-400">{description}</p>
          </BrandCard>
        ))}
      </section>

      <section className="mx-auto mt-16 max-w-6xl">
        <div className="mb-8 text-center">
          <div className="text-sm font-black tracking-[0.25em] text-purple-400">
            PARTNERSHIP CATEGORIES
          </div>
          <h2 className="mt-3 text-3xl font-black text-white">
            BUILT FOR THE GAMING ECOSYSTEM
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-400">
            PulsePlay is open to relevant opportunities involving gaming
            hardware, peripherals, creator equipment, displays, gaming
            setups, software, and gaming lifestyle products.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {[
            "Gaming Hardware",
            "Gaming Peripherals",
            "Creator Equipment",
            "Gaming Displays",
            "Gaming Setup",
            "Gaming Software",
            "Gaming Lifestyle",
          ].map((category) => (
            <span
              key={category}
              className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-sm font-bold text-cyan-300"
            >
              {category}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-4xl">
        <BrandCard>
          {submitted ? (
            <div className="py-10 text-center">
              <div className="text-5xl">✅</div>
              <h2 className="mt-5 text-3xl font-black text-green-400">
                PARTNERSHIP REQUEST RECEIVED
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-400">
                Thanks for reaching out to PulsePlay. Your opportunity has
                been sent to the partnership queue for review.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <div className="text-sm font-black tracking-[0.25em] text-pink-400">
                  BECOME A PULSEPLAY PARTNER
                </div>
                <h2 className="mt-3 text-3xl font-black text-white">
                  START THE CONVERSATION
                </h2>
                <p className="mt-3 text-slate-400">
                  Tell us about your brand, campaign, product, or creator
                  opportunity. We&apos;ll review the request and follow up with
                  next steps.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <input className={inputClass} placeholder="Company / Brand *" value={form.company_name} onChange={(e) => updateField("company_name", e.target.value)} required />
                  <input className={inputClass} placeholder="Contact Name *" value={form.contact_name} onChange={(e) => updateField("contact_name", e.target.value)} required />
                  <input className={inputClass} type="email" placeholder="Email *" value={form.email} onChange={(e) => updateField("email", e.target.value)} required />
                  <input className={inputClass} type="url" placeholder="Website" value={form.website} onChange={(e) => updateField("website", e.target.value)} />
                  <select className={inputClass} value={form.partnership_type} onChange={(e) => updateField("partnership_type", e.target.value)}>
                    {partnershipTypes.map((type) => <option key={type}>{type}</option>)}
                  </select>
                  <input className={inputClass} placeholder="Estimated Budget (optional)" value={form.budget} onChange={(e) => updateField("budget", e.target.value)} />
                  <input className={inputClass} type="date" aria-label="Campaign start" value={form.campaign_start} onChange={(e) => updateField("campaign_start", e.target.value)} />
                  <input className={inputClass} type="date" aria-label="Campaign end" value={form.campaign_end} onChange={(e) => updateField("campaign_end", e.target.value)} />
                </div>

                <input className={inputClass} placeholder="How did you hear about PulsePlay?" value={form.how_heard} onChange={(e) => updateField("how_heard", e.target.value)} />

                <textarea className={`${inputClass} min-h-40`} placeholder="Tell us about your opportunity *" value={form.message} onChange={(e) => updateField("message", e.target.value)} required />

                {error && <p className="text-sm text-red-400">{error}</p>}

                <BrandButton type="submit" disabled={loading}>
                  {loading ? "TRANSMITTING..." : "BECOME A PULSEPLAY PARTNER"}
                </BrandButton>
              </form>
            </>
          )}
        </BrandCard>
      </section>
    </main>
  );
}
