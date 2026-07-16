import { useEffect, useState } from "react";
import { coursesApi, reportsApi } from "../api/resources.js";
import { useAuth } from "../context/AuthContext.jsx";
import Icon from "../components/dashboard/icons.jsx";

function extractList(res, key) {
  const d = res?.data ?? res;
  const list = d?.[key] ?? d?.results ?? d;
  return Array.isArray(list) ? list : [];
}

export default function Dashboard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    coursesApi
      .list()
      .then((res) => setCourses(extractList(res, "courses").slice(0, 6)))
      .catch(() => setCourses([]));
    reportsApi
      .list()
      .then((res) => setTasks(extractList(res, "reports").slice(0, 5)))
      .catch(() => setTasks([]));
  }, []);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="relative overflow-hidden rounded-2xl bg-indigo-500 p-8 text-white lg:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-200">
            Software Training
          </p>
          <h1 className="mt-3 max-w-md text-2xl font-extrabold leading-snug sm:text-3xl">
            Become a fullstack developer in a short time with our comprehensive courses
          </h1>
          <button className="mt-6 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50">
            Join Now
          </button>
          <div className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 rounded-full bg-indigo-400/40" />
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6">
          <h3 className="text-sm font-semibold text-slate-800">Welcome back</h3>
          <p className="mt-1 text-2xl font-extrabold text-brand-dark">{user?.name || "Learner"}</p>
          <p className="mt-2 text-sm text-slate-500">
            Pick up where you left off and keep building your skills.
          </p>
        </div>
      </section>

      {/* Course cards */}
      <section>
        <div className="flex items-end justify-between">
          <h2 className="text-lg font-bold text-brand-dark">Your programs</h2>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.length > 0 ? (
            courses.map((c) => (
              <div key={c.id ?? c._id} className="rounded-2xl border border-slate-100 bg-white p-5">
                <div className="flex items-center justify-between">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-light text-brand">
                    <Icon name="code" className="h-5 w-5" stroke />
                  </span>
                  <span className="text-xs text-slate-400">
                    {(c.enrollmentCount ?? c.enrollments_count ?? 0)} enrolled
                  </span>
                </div>
                <h3 className="mt-4 font-semibold text-slate-800">{c.title}</h3>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">No programs yet.</p>
          )}
        </div>
      </section>

      {/* Tasks + Content to cover */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-lg font-bold text-brand-dark">Your tasks</h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-100 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-5 py-3 font-medium">Mentor</th>
                  <th className="px-5 py-3 font-medium">Type</th>
                  <th className="px-5 py-3 font-medium">Description</th>
                  <th className="px-5 py-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.length > 0 ? (
                  tasks.map((t, i) => (
                    <tr key={t.id ?? i} className="border-b border-slate-50 last:border-0">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <span className="grid h-7 w-7 place-items-center rounded-full bg-slate-200 text-xs font-semibold text-slate-600">
                            {(t.mentor?.name || t.user?.name || "?").charAt(0).toUpperCase()}
                          </span>
                          <span className="font-medium text-slate-700">
                            {t.mentor?.name || t.user?.name || "Mentor"}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-slate-500">{t.type || t.title || "Task"}</td>
                      <td className="px-5 py-3 text-slate-500">{t.description || t.content || "—"}</td>
                      <td className="px-5 py-3 text-right">
                        <span className="inline-grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-slate-600">
                          <Icon name="arrow" className="h-4 w-4" stroke />
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-5 py-8 text-center text-slate-400">
                      No tasks assigned yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-brand-dark">Content to cover</h2>
          <div className="mt-4 space-y-3 rounded-2xl border border-slate-100 bg-white p-5">
            {courses.slice(0, 4).map((c) => (
              <div key={c.id ?? c._id} className="flex items-center gap-3">
                <span className="h-8 w-8 shrink-0 rounded-full bg-slate-100" />
                <span className="text-sm text-slate-600">{c.title}</span>
              </div>
            ))}
            {courses.length === 0 && (
              <p className="text-sm text-slate-400">Nothing to cover yet.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
