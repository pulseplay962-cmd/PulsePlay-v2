import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        navigate("/admin");
      }
    }

    checkSession();
  }, [navigate]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);

    navigate("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#05070d] px-6 text-white">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-xl border border-cyan-500/20 bg-[#111827] p-8 shadow-lg shadow-cyan-500/10"
      >
        <h1 className="mb-2 text-3xl font-black text-cyan-400">
          PulsePlay Admin
        </h1>

        <p className="mb-6 text-sm text-gray-400">
          Sign in to manage your gaming platform.
        </p>

        <input
          className="mb-4 w-full rounded-lg bg-[#1f2937] p-3 text-white outline-none ring-cyan-400 focus:ring-2"
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="mb-4 w-full rounded-lg bg-[#1f2937] p-3 text-white outline-none ring-cyan-400 focus:ring-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {message && (
          <p className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
            {message}
          </p>
        )}

        <button
          disabled={loading}
          className="w-full rounded-lg bg-cyan-400 p-3 font-bold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}