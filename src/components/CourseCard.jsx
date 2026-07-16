import { Link } from "react-router-dom";
import { useCurrency } from "../context/CurrencyContext.jsx";

export default function CourseCard({ course }) {
  const { formatPrice } = useCurrency();
  const id = course.id ?? course._id;
  return (
    <Link to={`/courses/${id}`} className="card card-hover group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-brand-100 to-brand-400">
        <div className="absolute inset-0 bg-brand-900/0 transition-colors duration-500 group-hover:bg-brand-900/10" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        {course.category && <span className="badge mb-3 w-fit">{course.category}</span>}
        <h3 className="text-base font-semibold text-slate-800 transition-colors duration-300 group-hover:text-brand-700">
          {course.title || "Untitled course"}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-slate-500">
          {course.description || "No description yet."}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-slate-50 pt-4">
          <span className="text-sm font-bold text-brand-dark">{formatPrice(course.price)}</span>
          <span className="text-sm font-semibold text-brand-600 transition-transform duration-300 group-hover:translate-x-1">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
