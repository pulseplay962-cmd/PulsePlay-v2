import { Link } from "react-router-dom";

import BrandCard from "../components/ui/BrandCard";
import BrandButton from "../components/ui/BrandButton";

export default function Disclaimer() {
  return (
    <main className="min-h-[72vh] px-4 py-10 text-white sm:px-6 sm:py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <BrandCard
          scan
          status="LEGAL / CONTENT NOTICE"
          className="overflow-hidden p-0"
        >
          <div className="border-b border-cyan-500/20 bg-gradient-to-r from-cyan-950/20 via-transparent to-purple-950/20 p-7 md:p-10">
            <p className="text-xs font-black uppercase tracking-[0.4em] text-cyan-400">
              PulsePlay Network // Content Notice
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-[-0.03em] pp-gradient-text md:text-6xl">
              Game Imagery &amp; Copyright Disclaimer
            </h1>

            <p className="mt-5 max-w-3xl leading-7 text-slate-400">
              PulsePlay uses a mixture of official, licensed, original, and
              illustrative visual material across its gaming content.
            </p>
          </div>

          <div className="space-y-8 p-7 md:p-10">
            <section>
              <h2 className="text-2xl font-black text-white">
                Third-Party Game Imagery
              </h2>

              <p className="mt-4 leading-7 text-slate-400">
                Some images, artwork, screenshots, promotional materials, or
                other visual references displayed on PulsePlay.online may
                depict or reference video games, characters, publishers,
                developers, or other third-party properties.
              </p>

              <p className="mt-4 leading-7 text-slate-400">
                Unless otherwise stated, these materials are not owned by
                PulsePlay.online and are presented for informational,
                editorial, commentary, promotional, or illustrative purposes.
              </p>
            </section>

            <section className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">
              <h2 className="text-xl font-black text-cyan-300">
                Visual Representation Notice
              </h2>

              <p className="mt-3 leading-7 text-slate-300">
                Images used to represent a game may not necessarily be official
                screenshots or promotional images from the actual game. They
                may include illustrative, AI-generated, licensed, stock, or
                otherwise sourced imagery intended to represent the subject
                matter.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white">
                Ownership &amp; Trademarks
              </h2>

              <p className="mt-4 leading-7 text-slate-400">
                All applicable names, characters, logos, artwork, trademarks,
                and other intellectual property remain the property of their
                respective owners. PulsePlay.online does not claim ownership
                of third-party intellectual property.
              </p>

              <p className="mt-4 leading-7 text-slate-400">
                The appearance of a game, company, character, logo, product,
                or other third-party property on PulsePlay.online does not
                imply sponsorship, endorsement, affiliation, or partnership
                unless expressly stated.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white">
                Use of Visual Materials
              </h2>

              <p className="mt-4 leading-7 text-slate-400">
                Where applicable, PulsePlay seeks to use imagery that is
                original, licensed, permitted, publicly available for the
                intended use, or otherwise used in accordance with applicable
                copyright law.
              </p>

              <p className="mt-4 leading-7 text-slate-400">
                This notice is provided to identify third-party ownership and
                clarify that illustrative imagery should not be interpreted as
                an official game screenshot or publisher-provided asset unless
                specifically identified as such.
              </p>
            </section>

            <section className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6">
              <h2 className="text-xl font-black text-purple-300">
                Copyright Concerns
              </h2>

              <p className="mt-3 leading-7 text-slate-300">
                If you are a copyright or intellectual-property owner and
                believe material appearing on PulsePlay.online has been used
                improperly, please contact us through the site's Contact page
                so the matter can be reviewed.
              </p>

              <div className="mt-6">
                <Link to="/contact">
                  <BrandButton variant="secondary">
                    CONTACT PULSEPLAY
                  </BrandButton>
                </Link>
              </div>
            </section>

            <div className="border-t border-white/10 pt-6">
              <p className="text-xs leading-6 text-slate-600">
                This page is a general informational notice and is not legal
                advice. Copyright and trademark rights can vary by material,
                jurisdiction, and context.
              </p>
            </div>
          </div>
        </BrandCard>
      </div>
    </main>
  );
}
