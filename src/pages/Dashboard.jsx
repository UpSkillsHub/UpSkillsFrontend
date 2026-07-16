import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usersApi, coursesApi, enrollmentsApi, reportsApi } from "../api/resources.js";
import { pickArray, pickCount } from "../api/extract.js";
import { useAuth } from "../context/AuthContext.jsx";
import Icon from "../components/dashboard/icons.jsx";

const roleStyle = {
  super_admin: "bg-purple-100 text-purple-700",
  admin: "bg-brand-100 text-brand-700",
  trainer: "bg-blue-100 text-blue-700",
  student: "bg-emerald-100 text-emerald-700",
};

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ users: null, courses: null, enrollments: null, reports: null });
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    Promise.allSettled([
      usersApi.list(),
      coursesApi.list(),
      enrollmentsApi.list(),
      reportsApi.list(),
    ]).then(([u, c, e, r]) => {
      if (!alive) return;
      const users = u.status === "fulfilled" ? pickArray(u.value, "users") : [];
      const courses = c.status === "fulfilled" ? pickArray(c.value, "courses") : [];
      const enrolls = e.status === "fulfilled" ? pickArray(e.value, "enrollments") : [];
      const reports = r.status === "fulfilled" ? pickArray(r.value, "reports") : [];
      setStats({
        users: u.status === "fulfilled" ? pickCount(u.value, users) : "—",
        courses: c.status === "fulfilled" ? pickCount(c.value, courses) : "—",
        enrollments: e.status === "fulfilled" ? pickCount(e.value, enrolls) : "—",
        reports: r.status === "fulfilled" ? pickCount(r.value, reports) : "—",
      });
      setRecentUsers(users.slice(-6).reverse());
      setLoading(false);
    });
    return () => { alive = false; };
  }, []);

  const cards = [
    { label: "Total users", value: stats.users, icon: "programs", color: "bg-brand-600" },
    { label: "Courses", value: stats.courses, icon: "code", color: "bg-blue-600" },
    { label: "Enrollments", value: stats.enrollments, icon: "dashboard", color: "bg-emerald-600" },
    { label: "Reports", value: stats.reports, icon: "report", color: "bg-purple-600" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-brand-dark">Admin overview</h1>
        <p className="mt-1 text-sm text-slate-500">Welcome back, {user?.name || "Admin"}. Here's what's happening across Up Skills Hub.</p>
      </div>

      {/* Stat cards */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
            <span className={`grid h-10 w-10 place-items-center rounded-xl ${c.color} text-white`}>
              <Icon name={c.icon} className="h-5 w-5" stroke />
            </span>
            <p className="mt-4 text-3xl font-extrabold text-brand-dark">
              {loading ? "…" : (c.value ?? 0)}
            </p>
            <p className="text-sm text-slate-500">{c.label}</p>
          </div>
        ))}
      </section>

      {/* Recent users */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-brand-dark">Recent users</h2>
          <Link to="/dashboard/users" className="text-sm font-semibold text-brand-600 hover:text-brand-700">View all →</Link>
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-100 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Role</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={3} className="px-5 py-8 text-center text-slate-400">Loading…</td></tr>
              ) : recentUsers.length > 0 ? (
                recentUsers.map((m, i) => (
                  <tr key={m.id ?? m._id ?? i} className="border-b border-slate-50 last:border-0">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-slate-200 text-xs font-semibold text-slate-600">
                          {(m.name || "?").charAt(0).toUpperCase()}
                        </span>
                        <span className="font-medium text-slate-700">{m.name || "—"}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-slate-500">{m.email || "—"}</td>
                    <td className="px-5 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${roleStyle[m.role] || "bg-slate-100 text-slate-600"}`}>
                        {m.role || "student"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={3} className="px-5 py-8 text-center text-slate-400">No users found (or the backend is still waking up).</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
