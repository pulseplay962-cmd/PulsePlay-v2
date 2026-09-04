import { Link, useSearchParams } from "react-router-dom";
import BrandCard from "../components/ui/BrandCard";
import BrandButton from "../components/ui/BrandButton";

export default function MerchandiseSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <main className="px-6 py-20">
      <section className="mx-auto max-w-4xl">
        <BrandCard className="text-center">
          <div className="text-6xl">✅</div>

          <p className="mt-6 text-xs font-black uppercase tracking-[0.35em] text-green-300">
            Acquisition Confirmed
          </p>

          <h1 className="mt-4 text-4xl font-black pp-gradient-text sm:text-5xl">
            LOADOUT ACQUIRED
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-slate-400">
            Your PulsePlay merchandise order has been received successfully.
            Your order is now being prepared for fulfillment.
          </p>

          <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5 text-left">
            <p className="text-xs font-black uppercase tracking-widest text-cyan-300">
              Order Status
            </p>

            <p className="mt-2 text-sm text-slate-300">
              Payment confirmed through Stripe.
            </p>

            <p className="mt-2 text-sm text-slate-300">
              Fulfillment has been queued with our production partner.
            </p>

            {sessionId && (
              <p className="mt-4 break-all text-xs text-slate-500">
                Reference: {sessionId}
              </p>
            )}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/merchandise">
              <BrandButton>
                RETURN TO LOCKER
              </BrandButton>
            </Link>

            <Link to="/">
              <BrandButton>
                COMMAND CENTER
              </BrandButton>
            </Link>
          </div>
        </BrandCard>
      </section>
    </main>
  );
}
