import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import BrandCard from "../components/ui/BrandCard";
import BrandButton from "../components/ui/BrandButton";

type OrderData = {
  order: {
    reference: string;
    quantity: number;
    amount_total: number;
    currency: string;
    status: string;
    printful_order_id: number | null;
  };
  merchandise: {
    name: string;
    image_url: string | null;
    variant: {
      name: string;
    } | null;
  };
  payment: {
    status: string;
  };
};

export default function MerchandiseSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [data, setData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrder() {
      if (!sessionId) {
        setError("No checkout session was provided.");
        setLoading(false);
        return;
      }

      try {
        const apiUrl =
          import.meta.env.VITE_API_URL ||
          "https://pulseplay-api-yubf.onrender.com";

        const response = await fetch(
          `${apiUrl}/api/checkout/order/${sessionId}`
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.error || "Unable to retrieve order."
          );
        }

        setData(result);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to retrieve order."
        );
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, [sessionId]);

  const amount = data
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: data.order.currency.toUpperCase(),
      }).format(data.order.amount_total / 100)
    : "";

  return (
    <main className="px-6 py-20">
      <section className="mx-auto max-w-4xl">
        <BrandCard className="text-center">
          {loading ? (
            <>
              <div className="text-5xl">⏳</div>

              <p className="mt-6 text-xs font-black uppercase tracking-[0.35em] text-cyan-300">
                Verifying Acquisition
              </p>

              <h1 className="mt-4 text-4xl font-black pp-gradient-text sm:text-5xl">
                LOADING ORDER
              </h1>

              <p className="mt-5 text-slate-400">
                Retrieving your PulsePlay order details...
              </p>
            </>
          ) : error ? (
            <>
              <div className="text-5xl">⚠️</div>

              <p className="mt-6 text-xs font-black uppercase tracking-[0.35em] text-red-300">
                Order Lookup Failed
              </p>

              <h1 className="mt-4 text-4xl font-black pp-gradient-text sm:text-5xl">
                LOADOUT NOT FOUND
              </h1>

              <p className="mt-5 text-slate-400">
                {error}
              </p>

              <div className="mt-8">
                <Link to="/merchandise">
                  <BrandButton>
                    RETURN TO LOCKER
                  </BrandButton>
                </Link>
              </div>
            </>
          ) : data ? (
            <>
              <div className="text-6xl">✅</div>

              <p className="mt-6 text-xs font-black uppercase tracking-[0.35em] text-green-300">
                Acquisition Confirmed
              </p>

              <h1 className="mt-4 text-4xl font-black pp-gradient-text sm:text-5xl">
                LOADOUT ACQUIRED
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-slate-400">
                Your PulsePlay merchandise order has been received
                successfully.
              </p>

              <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5 text-left">
                <p className="text-xs font-black uppercase tracking-widest text-cyan-300">
                  Order Confirmation
                </p>

                <div className="mt-5 flex gap-4">
                  {data.merchandise.image_url && (
                    <img
                      src={data.merchandise.image_url}
                      alt={data.merchandise.name}
                      className="h-24 w-24 rounded-xl object-cover"
                    />
                  )}

                  <div>
                    <p className="font-bold text-white">
                      {data.merchandise.name}
                    </p>

                    {data.merchandise.variant && (
                      <p className="mt-1 text-sm text-slate-400">
                        {data.merchandise.variant.name}
                      </p>
                    )}

                    <p className="mt-1 text-sm text-slate-400">
                      Quantity: {data.order.quantity}
                    </p>
                  </div>
                </div>

                <div className="mt-5 border-t border-cyan-400/10 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">
                      Order Reference
                    </span>

                    <span className="font-bold text-cyan-300">
                      {data.order.reference}
                    </span>
                  </div>

                  <div className="mt-2 flex justify-between text-sm">
                    <span className="text-slate-400">
                      Amount Paid
                    </span>

                    <span className="font-bold text-white">
                      {amount}
                    </span>
                  </div>
                </div>

                <div className="mt-5 border-t border-cyan-400/10 pt-4">
                  <p className="text-xs font-black uppercase tracking-widest text-cyan-300">
                    Fulfillment Status
                  </p>

                  <p className="mt-2 text-sm text-green-300">
                    ✓ Payment confirmed through Stripe
                  </p>

                  <p className="mt-2 text-sm text-slate-300">
                    ✓ Order queued with our production partner
                  </p>
                </div>
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
            </>
          ) : null}
        </BrandCard>
      </section>
    </main>
  );
}
