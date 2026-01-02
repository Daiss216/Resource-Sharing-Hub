export function HomePage() {
  return (
    <div className="grid gap-6 md:grid-cols-[2fr,1.3fr] items-start">
      {/* Hero */}
      <section className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs text-slate-600 shadow-sm border border-slate-100">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Built for our department
        </div>

        <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight">
          All your{" "}
          <span className="bg-gradient-to-r from-sky-500 via-rose-500 to-violet-500 bg-clip-text text-transparent">
            notes & PYQs
          </span>{" "}
          in one cosy shelf.
        </h2>

        <p className="text-sm sm:text-base text-slate-600 max-w-xl">
          No more digging through WhatsApp groups. Search by semester, subject
          and type, and find exactly what you need in a few clicks.
        </p>

        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2.5 rounded-xl bg-sky-500 text-white text-sm font-medium shadow-sm hover:bg-sky-600 transition">
            Browse resources
          </button>
          <button className="px-4 py-2.5 rounded-xl bg-sky-500 text-white text-sm font-medium shadow-sm hover:bg-sky-600 transition">
            Upload notes
          </button>
        </div>

        {/* Pill cards */}
        <div className="grid gap-3 sm:grid-cols-3 mt-4">
          <StatCard label="Semesters covered" value="I – VIII" color="from-sky-400 to-sky-500" />
          <StatCard label="Resource types" value="Notes • PYQs • Links" color="from-rose-400 to-rose-500" />
          <StatCard label="Made for" value="AI & DS Dept" color="from-violet-400 to-violet-500" />
        </div>
      </section>

      {/* Illustration / mood card */}
      <aside className="space-y-3">
        <div className="rounded-3xl bg-white/80 border border-slate-100 shadow-sm p-4 sm:p-5">
          <div className="flex gap-3 items-start">
            <div className="mt-1 h-9 w-9 rounded-2xl bg-gradient-to-tr from-amber-300 via-pink-300 to-sky-300 flex items-center justify-center text-lg">
              📚
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-slate-900 text-sm">
                One hub for every batch
              </h3>
              <p className="text-xs text-slate-600">
                Seniors can drop their best notes and PYQs here so juniors never
                have to DM 20 people for “that one PDF”.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-sky-100 via-rose-100 to-violet-100 border border-white shadow-inner p-4 space-y-2">
          <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
            Coming soon
          </p>
          <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
            <li>Sign in with your college Google ID</li>
            <li>AI‑powered tagging for uploads</li>
            <li>Smart search across all notes</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className="rounded-2xl bg-white/80 border border-slate-100 shadow-sm p-3 flex flex-col gap-1">
      <span className="text-[11px] uppercase tracking-wide text-slate-500">
        {label}
      </span>
      <span
        className={`inline-flex rounded-full bg-gradient-to-r ${color} text-white text-xs px-3 py-1 font-medium`}
      >
        {value}
      </span>
    </div>
  );
}
