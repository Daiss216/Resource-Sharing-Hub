import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

const dummyResources = [
  {
    id: "1",
    title: "DBMS Unit 3 – Transactions",
    semester: 4,
    subject: "DBMS",
    type: "NOTES",
    year: 2024,
    downloads: 42,
    uploadedBy: "Riya (2024)",
  },
  {
    id: "2",
    title: "OS Midsem PYQ – 2023",
    semester: 5,
    subject: "Operating Systems",
    type: "PYQ",
    year: 2023,
    downloads: 67,
    uploadedBy: "Arjun (2023)",
  },
];

const semesters = [3, 4, 5, 6, 7, 8];
const subjectsBySem = {
  3: ["DSA", "Digital Logic"],
  4: ["DBMS", "OOPs", "Discrete Maths"],
  5: ["Operating Systems", "CN"],
};

const types = ["ALL", "NOTES", "PYQ", "BOOK", "LINK"];

export function BrowsePage() {
  const { user } = useAuth();
  if (!user) {
    return (
      <p className="text-sm text-slate-600">
        Please log in with your Google account to view notes and PYQs.
      </p>
    );
  }

  const [semester, setSemester] = useState(4);
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("ALL");
  const [search, setSearch] = useState("");

  const subjects = subjectsBySem[semester] || [];

  const filtered = dummyResources.filter((r) => {
    if (semester && r.semester !== semester) return false;
    if (subject && r.subject !== subject) return false;
    if (type !== "ALL" && r.type !== type) return false;
    if (search && !r.title.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900">Browse resources</h2>

      {/* Filters */}
      <div className="rounded-2xl bg-white/80 border border-slate-100 shadow-sm p-3 flex flex-wrap gap-3 items-center">
        <select
          value={semester}
          onChange={(e) => {
            const value = Number(e.target.value);
            setSemester(value);
            setSubject("");
          }}
          className="px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
        >
          {semesters.map((sem) => (
            <option key={sem} value={sem}>
              Semester {sem}
            </option>
          ))}
        </select>

        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
        >
          <option value="">All subjects</option>
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <div className="inline-flex bg-slate-100 rounded-full p-1 text-xs">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-3 py-1 rounded-full transition ${
                type === t
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="ml-auto flex-1 min-w-[180px] max-w-xs">
          <div className="relative">
            <input
              type="text"
              placeholder="Search titles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <span className="absolute left-3 top-2.5 text-slate-400 text-sm">
              🔍
            </span>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.length === 0 ? (
          <div className="col-span-full rounded-2xl bg-white/80 border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
            No resources yet for this filter. Ask a senior to upload their notes
            here ✨
          </div>
        ) : (
          filtered.map((r) => <ResourceCard key={r.id} resource={r} />)
        )}
      </div>
    </div>
  );
}

function ResourceCard({ resource }) {
  const colorMap = {
    NOTES: "bg-sky-100 text-sky-700",
    PYQ: "bg-amber-100 text-amber-700",
    BOOK: "bg-emerald-100 text-emerald-700",
    LINK: "bg-violet-100 text-violet-700",
  };

  return (
    <article className="rounded-2xl bg-white/90 border border-slate-100 shadow-sm p-3 flex flex-col gap-2">
      <div className="flex items-start gap-2">
        <div className="mt-1 h-7 w-7 rounded-xl bg-gradient-to-tr from-sky-300 via-rose-300 to-violet-300 flex items-center justify-center text-base">
          📄
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-slate-900 line-clamp-2">
            {resource.title}
          </h3>
          <p className="text-xs text-slate-500">
            Sem {resource.semester} • {resource.subject}
          </p>
        </div>
        <span
          className={`text-[10px] px-2 py-1 rounded-full font-medium ${
            colorMap[resource.type] || "bg-slate-100 text-slate-700"
          }`}
        >
          {resource.type}
        </span>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>{resource.uploadedBy}</span>
        <span>Downloads: {resource.downloads}</span>
      </div>

      <button className="mt-1 w-full text-xs font-medium rounded-xl bg-slate-900/90 text-white py-1.5 hover:bg-slate-900 transition">
        View / Download
      </button>
    </article>
  );
}
