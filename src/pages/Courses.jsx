import { useEffect, useState } from "react";
import { coursesApi } from "../api/resources.js";
import CourseCard from "../components/CourseCard.jsx";
import Reveal from "../components/Reveal.jsx";

function extractList(res) {
  const d = res?.data ?? res;
  const list = d?.courses ?? d?.results ?? d;
  return Array.isArray(list) ? list : [];
}

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    coursesApi
      .list()
      .then((res) => setCourses(extractList(res)))
      .catch(() => setError("Could not load courses. Is the backend running?"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = courses.filter((c) =>
    (c.title || "").toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-brand-50 to-white" />
      <div className="container-page relative py-20">
        <Reveal className="max-w-2xl">
          <span className="badge">Catalog</span>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">Our Courses</h1>
          <p className="mt-4 text-lg text-slate-600">
            Browse every program we offer — taught by practitioners, built for real jobs.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-8">
          <div className="relative max-w-md">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">⌕</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses…"
              className="input pl-9"
            />
          </div>
        </Reveal>

        {loading && <p className="mt-12 text-slate-500">Loading…</p>}
        {error && <p className="mt-12 text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.length > 0 ? (
              filtered.map((c, i) => (
                <Reveal key={c.id ?? c._id} delay={(i % 3) * 80}>
                  <CourseCard course={c} />
                </Reveal>
              ))
            ) : (
              <p className="text-slate-500">No courses found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
