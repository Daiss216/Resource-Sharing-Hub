import { useState } from "react";
import { auth, googleProvider, db } from "../firebase/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "../auth/AuthContext";

const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
const courses = [
  "MBA BA",
  "M.SC DSA",
  "M.Tech AI & DS",
  "M.Tech BDA",
  "M.Tech DS",
];

export function AuthButtonInNavbar() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-600 max-w-[140px] truncate">
          {user.displayName}
        </span>
        <button
          onClick={() => signOut(auth)}
          className="px-3 py-1.5 rounded-full text-xs bg-slate-100 hover:bg-slate-200"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-1.5 rounded-full text-xs bg-sky-500 text-white hover:bg-sky-600"
      >
        Login / Sign up
      </button>
      {open && <AuthModal onClose={() => setOpen(false)} />}
    </>
  );
}

function AuthModal({ onClose }) {
  const [step, setStep] = useState("google"); // google → details
  const [tempUser, setTempUser] = useState(null);
  const [semester, setSemester] = useState(3);
  const [course, setCourse] = useState("M.Tech AI & DS");
  const [role, setRole] = useState("junior"); // junior | senior | admin
  const [saving, setSaving] = useState(false);

  const handleGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const u = result.user;
      const ref = doc(db, "users", u.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        // already have extra data
        onClose();
      } else {
        // new user → collect semester/course/role
        setTempUser(u);
        setStep("details");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed. Check console.");
    }
  };

  const handleSaveDetails = async () => {
    if (!tempUser) return;
    setSaving(true);
    try {
      const ref = doc(db, "users", tempUser.uid);
      await setDoc(ref, {
        uid: tempUser.uid,
        name: tempUser.displayName || "",
        email: tempUser.email,
        photoURL: tempUser.photoURL || "",
        semester,
        course,
        role, // "junior" / "senior" / "admin"
        createdAt: new Date(),
      });
      onClose();
    } catch (e) {
      console.error(e);
      alert("Could not save details.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-lg p-5 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-semibold text-slate-900">
            {step === "google"
              ? "Sign in to Dept Notes Hub"
              : "Tell us about you"}
          </h2>
          <button onClick={onClose} className="text-slate-400 text-lg">
            ×
          </button>
        </div>

        {step === "google" && (
          <>
            <p className="text-xs text-slate-600">
              Use your college Google account to sign in. You’ll only fill
              details once.
            </p>
            <button
              onClick={handleGoogle}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm hover:bg-slate-50"
            >
              <span>🔐</span>
              <span>Continue with Google</span>
            </button>
          </>
        )}

        {step === "details" && (
          <div className="space-y-3">
            <p className="text-xs text-slate-600">
              Hi {tempUser?.displayName || ""}! Select your semester, course and
              whether you are a junior, senior or admin.
            </p>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                Semester
              </label>
              <select
                value={semester}
                onChange={(e) => setSemester(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200"
              >
                {semesters.map((s) => (
                  <option key={s} value={s}>
                    Semester {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                Course
              </label>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200"
              >
                {courses.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">Role</label>
              <div className="flex gap-2 text-xs">
                {["junior", "senior", "admin"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`flex-1 px-3 py-1.5 rounded-full border ${
                      role === r
                        ? "bg-sky-500 text-white border-sky-500"
                        : "bg-slate-50 text-slate-700 border-slate-200"
                    }`}
                  >
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <button
              disabled={saving}
              onClick={handleSaveDetails}
              className="w-full rounded-xl bg-sky-500 text-white text-sm py-2.5 hover:bg-sky-600 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save & continue"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
