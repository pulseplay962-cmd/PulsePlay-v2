import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    window.location.href = "/admin";
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#05070d] text-white">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-xl border border-cyan-500/20 bg-[#111827] p-8"
      >
        <h1 className="mb-6 text-3xl font-black text-cyan-400">
          PulsePlay Admin
        </h1>

        <input
          className="mb-4 w-full rounded bg-[#1f2937] p-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="mb-4 w-full rounded bg-[#1f2937] p-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {message && (
          <p className="mb-4 text-red-400">
            {message}
          </p>
        )}

        <button
          disabled={loading}
          className="w-full rounded bg-cyan-500 p-3 font-bold text-black hover:bg-cyan-400"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
