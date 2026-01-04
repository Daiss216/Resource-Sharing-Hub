import { useAuth } from "../auth/AuthContext";

export function AdminPage() {
  const { user } = useAuth();
  if (!user) {
    return (
      <p className="text-sm text-slate-600">
        Please log in with your Google account to view notes and PYQs.
      </p>
    );
  }
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-slate-900">Admin panel</h2>
      <p className="text-sm text-slate-600">
        This is where you will approve new uploads before they appear in the
        main list. For now, this is just a placeholder.
      </p>
      <div className="rounded-2xl bg-white/80 border border-dashed border-slate-200 p-6 text-sm text-slate-500">
        Connect this page to Firestore later:
        <br />
        <span className="text-xs">
          resources where isApproved == false → Approve / Reject
        </span>
      </div>
    </div>
  );
}
