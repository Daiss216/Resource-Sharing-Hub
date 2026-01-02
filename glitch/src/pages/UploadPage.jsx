import { useState } from "react";

const semesters = [3, 4, 5, 6, 7, 8];
const types = ["NOTES", "PYQ", "BOOK", "LINK"];

export function UploadPage() {
  const [form, setForm] = useState({
    title: "",
    semester: 4,
    subject: "",
    type: "NOTES",
    year: "",
    description: "",
    linkUrl: "",
  });
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: plug into Firebase Storage + Firestore
    alert("This will upload to Firebase in the next step 🙂");
  };

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <h2 className="text-xl font-semibold text-slate-900">
        Upload notes / PYQs
      </h2>
      <p className="text-sm text-slate-600">
        Help your juniors and classmates by uploading clear, well‑named resources.
      </p>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-white/80 border border-slate-100 shadow-sm p-4 space-y-3"
      >
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700">
            Title
          </label>
          <input
            required
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g., DBMS Unit 3 – Transactions"
            className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              Semester
            </label>
            <select
              name="semester"
              value={form.semester}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  semester: Number(e.target.value),
                }))
              }
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              {semesters.map((sem) => (
                <option key={sem} value={sem}>
                  Semester {sem}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              Type
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700">
            Subject
          </label>
          <input
            required
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="e.g., DBMS, OS"
            className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        {form.type === "PYQ" && (
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              Exam year
            </label>
            <input
              name="year"
              value={form.year}
              onChange={handleChange}
              placeholder="e.g., 2023"
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700">
            Short description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            placeholder="What does this cover? Any important topics?"
            className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        {form.type === "LINK" ? (
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              Resource link
            </label>
            <input
              name="linkUrl"
              value={form.linkUrl}
              onChange={handleChange}
              placeholder="Paste Google Drive / YouTube / blog link"
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
        ) : (
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              Upload file (PDF preferred)
            </label>
            <label className="flex items-center gap-2 px-3 py-2 text-sm rounded-xl border border-dashed border-slate-300 bg-slate-50 cursor-pointer hover:border-sky-400 hover:bg-sky-50 transition">
              <span className="text-lg">📎</span>
              <span className="flex-1 text-xs text-slate-600">
                {fileName || "Click to choose a file"}
              </span>
              <input
                type="file"
                accept=".pdf,image/*"
                className="hidden"
                onChange={handleFile}
              />
            </label>
          </div>
        )}

        <button
          type="submit"
          className="w-full mt-2 rounded-xl bg-gradient-to-r from-sky-500 via-rose-500 to-violet-500 text-white text-sm font-medium py-2.5 shadow-sm hover:brightness-110 transition"
        >
          Save and share with juniors
        </button>
      </form>
    </div>
  );
}
