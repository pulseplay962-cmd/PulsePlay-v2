export default function Contact() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24 text-white">
      <h1 className="text-5xl font-black">
        Contact
      </h1>

      <p className="mt-4 text-gray-400">
        We'd love to hear from you.
      </p>

      <form className="mt-10 space-y-6">

        <input
          type="text"
          placeholder="Name"
          className="w-full rounded-xl border border-cyan-500/20 bg-slate-900 p-4"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-xl border border-cyan-500/20 bg-slate-900 p-4"
        />

        <textarea
          rows={6}
          placeholder="Message"
          className="w-full rounded-xl border border-cyan-500/20 bg-slate-900 p-4"
        />

        <button
          className="rounded-xl bg-cyan-400 px-8 py-4 font-bold text-black"
        >
          Send Message
        </button>

      </form>
    </div>
  );
}