// Small inline icon set for the dashboard, so we don't add an icon dependency.
const paths = {
  dashboard: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
  programs:
    "M2 4h20v12H2V4zm0 14h20v2H2v-2zm7-9v5l4-2.5L9 9z",
  tasks:
    "M9 2a3 3 0 00-3 3H4a2 2 0 00-2 2v13a2 2 0 002 2h16a2 2 0 002-2V7a2 2 0 00-2-2h-2a3 3 0 00-3-3H9zm0 2h6a1 1 0 011 1v1H8V5a1 1 0 011-1z",
  report:
    "M6 2h9l5 5v13a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2zm8 1.5V8h4.5L14 3.5zM8 13h8v2H8v-2zm0 4h8v2H8v-2z",
  settings:
    "M12 8a4 4 0 100 8 4 4 0 000-8zm9 4a7 7 0 00-.1-1.2l2-1.6-2-3.4-2.4 1a7 7 0 00-2-1.2l-.4-2.6H9.9l-.4 2.6a7 7 0 00-2 1.2l-2.4-1-2 3.4 2 1.6A7 7 0 003 12c0 .4 0 .8.1 1.2l-2 1.6 2 3.4 2.4-1a7 7 0 002 1.2l.4 2.6h4.2l.4-2.6a7 7 0 002-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2z",
  logout:
    "M16 17v-3H9v-4h7V7l5 5-5 5zM14 2a2 2 0 012 2v2h-2V4H5v16h9v-2h2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h9z",
  search: "M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z",
  mail: "M4 4h16v16H4V4zm0 2l8 5 8-5",
  bell: "M12 22a2 2 0 002-2h-4a2 2 0 002 2zm6-6V11a6 6 0 10-12 0v5l-2 2v1h16v-1l-2-2z",
  code: "M8 6l-6 6 6 6M16 6l6 6-6 6",
  arrow: "M7 17L17 7M17 7H8M17 7v9",
};

export default function Icon({ name, className = "h-5 w-5", stroke = false }) {
  const d = paths[name];
  if (!d) return null;
  if (stroke) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d={d} />
    </svg>
  );
}
