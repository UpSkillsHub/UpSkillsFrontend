import { useEffect, useState } from "react";
import { coursesApi } from "../../api/resources.js";
import { pickArray } from "../../api/extract.js";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    coursesApi
      .list()
      .then((res) => setCourses(pickArray(res, "courses")))
      .catch(() => setError("Couldn't load courses. The backend may be waking up — try again in a moment."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-brand-dark">Courses</h1>
        <p className="mt-1 text-sm text-slate-500">{loading ? "Loading…" : `${courses.length} total`}</p>
      </div>

      {error && <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-700">{error}</p>}

      {loading ? (
        <p className="text-sm text-slate-400">Loading courses…</p>
      ) : courses.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c, i) => (
            <div key={c.id ?? c._id ?? i} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-800">{c.title || "Untitled course"}</h3>
                {c.status && (
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">{c.status}</span>
                )}
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-slate-500">{c.description || "No description."}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span>{c.duration ? `${c.duration}` : c.level || "—"}</span>
                <span className="font-semibold text-brand-600">
                  {c.price != null ? `${c.currency || "$"}${c.price}` : "Free"}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-400">No courses found (or the backend is still waking up).</p>
      )}
    </div>
  );
}
