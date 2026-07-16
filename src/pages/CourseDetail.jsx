import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { coursesApi, enrollmentsApi } from "../api/resources.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useCurrency } from "../context/CurrencyContext.jsx";
import Reveal from "../components/Reveal.jsx";

function extractOne(res) {
  const d = res?.data ?? res;
  return d?.course ?? d ?? res;
}

export default function CourseDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { formatUSD, formatRWF } = useCurrency();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const [enrolling, setEnrolling] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    coursesApi
      .get(id)
      .then((res) => setCourse(extractOne(res)))
      .catch(() => setError("Course not found or backend unavailable."));
  }, [id]);

  const enroll = async () => {
    if (!user) {
      setMessage("Please log in to enroll.");
      return;
    }
    setEnrolling(true);
    try {
      await enrollmentsApi.create({ courseId: id });
      setMessage("You're enrolled! 🎉");
    } catch (e) {
      setMessage(e?.response?.data?.message || "Enrollment failed.");
    } finally {
      setEnrolling(false);
    }
  };

  if (error) return <div className="container-page py-20 text-red-500">{error}</div>;
  if (!course) return <div className="container-page py-20 text-slate-500">Loading…</div>;

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-brand-50 to-white" />
      <div className="container-page relative py-16">
        <Link to="/courses" className="text-sm font-medium text-brand-600">← Back to courses</Link>
        <div className="mt-6 grid gap-10 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <div className="aspect-video w-full rounded-3xl bg-gradient-to-br from-brand-200 to-brand-500 shadow-lift" />
            <h1 className="mt-8 text-3xl font-extrabold sm:text-4xl">{course.title}</h1>
            <p className="mt-4 leading-relaxed text-slate-600">{course.description}</p>
          </Reveal>
          <Reveal delay={120}>
            <aside className="card sticky top-24 p-7">
              {Number(course.price) > 0 ? (
                <>
                  <p className="text-3xl font-extrabold text-brand-dark">{formatUSD(course.price)}</p>
                  <p className="mt-1 text-sm text-slate-500">{formatRWF(course.price)}</p>
                </>
              ) : (
                <p className="text-3xl font-extrabold text-brand-dark">Free</p>
              )}
              <button onClick={enroll} disabled={enrolling} className="btn-primary mt-5 w-full">
                {enrolling ? "Enrolling…" : "Enroll now"}
              </button>
              {message && <p className="mt-3 text-sm text-slate-600">{message}</p>}
            </aside>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
