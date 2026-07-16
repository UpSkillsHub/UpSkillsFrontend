import { useEffect, useState } from "react";
import { usersApi } from "../../api/resources.js";
import { pickArray } from "../../api/extract.js";

const roleStyle = {
  super_admin: "bg-purple-100 text-purple-700",
  admin: "bg-brand-100 text-brand-700",
  trainer: "bg-blue-100 text-blue-700",
  student: "bg-emerald-100 text-emerald-700",
};

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");

  useEffect(() => {
    usersApi
      .list()
      .then((res) => setUsers(pickArray(res, "users")))
      .catch(() => setError("Couldn't load users. The backend may be waking up — try again in a moment."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = users.filter((u) =>
    `${u.name || ""} ${u.email || ""} ${u.role || ""}`.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-dark">Users</h1>
          <p className="mt-1 text-sm text-slate-500">{loading ? "Loading…" : `${users.length} registered`}</p>
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, email, role…"
          className="w-64 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm focus:border-brand-500 focus:outline-none"
        />
      </div>

      {error && <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-700">{error}</p>}

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="px-5 py-8 text-center text-slate-400">Loading users…</td></tr>
            ) : filtered.length > 0 ? (
              filtered.map((u, i) => (
                <tr key={u.id ?? u._id ?? i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-200 text-xs font-semibold text-slate-600">
                        {(u.name || "?").charAt(0).toUpperCase()}
                      </span>
                      <span className="font-medium text-slate-700">{u.name || "—"}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-slate-500">{u.email || "—"}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${roleStyle[u.role] || "bg-slate-100 text-slate-600"}`}>
                      {u.role || "student"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-400">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={4} className="px-5 py-8 text-center text-slate-400">No users match your search.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
