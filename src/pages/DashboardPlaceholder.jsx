export default function DashboardPlaceholder({ title = "Section" }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-12 text-center">
      <h1 className="text-xl font-bold text-brand-dark">{title}</h1>
      <p className="mt-2 text-slate-500">This section is coming soon.</p>
    </div>
  );
}
