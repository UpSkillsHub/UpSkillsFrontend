import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { coursesApi } from "../api/resources.js";
import { SectionHeading } from "../components/Section.jsx";
import CourseCard from "../components/CourseCard.jsx";

function extractList(res) {
  const d = res?.data ?? res;
  const list = d?.courses ?? d?.results ?? d;
  return Array.isArray(list) ? list : [];
}

export default function CategoryCourses() {
  const { category } = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    coursesApi
      .list(category === "all" ? undefined : { category })
      .then((res) => {
        let list = extractList(res);
        if (category !== "all") {
          list = list.filter(
            (c) => (c.category || "").toLowerCase() === category.toLowerCase(),
          );
        }
        setCourses(list);
      })
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, [category]);

  const title = category === "all" ? "All courses" : `${category} courses`;

  return (
    <div className="container-page py-16">
      <SectionHeading eyebrow="Category" title={title[0].toUpperCase() + title.slice(1)} />
      {loading ? (
        <p className="mt-10 text-slate-500">Loading…</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.length > 0 ? (
            courses.map((c) => <CourseCard key={c.id ?? c._id} course={c} />)
          ) : (
            <p className="text-slate-500">No courses in this category yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
