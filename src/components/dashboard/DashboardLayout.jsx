import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { usersApi } from "../../api/resources.js";
import Icon from "./icons.jsx";

const navItems = [
  { to: "/dashboard", label: "Overview", icon: "dashboard", end: true },
  { to: "/dashboard/users", label: "Users", icon: "programs" },
  { to: "/dashboard/courses", label: "Courses", icon: "code" },
];

const bottomItems = [
  { to: "/dashboard/reports", label: "Reports", icon: "report" },
  { to: "/dashboard/settings", label: "Settings", icon: "settings" },
];

function extractList(res) {
  const d = res?.data ?? res;
  const list = d?.users ?? d?.results ?? d;
  return Array.isArray(list) ? list : [];
}

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [team, setTeam] = useState([]);

  useEffect(() => {
    usersApi
      .list()
      .then((res) => setTeam(extractList(res).slice(0, 4)))
      .catch(() => setTeam([]));
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
      isActive ? "bg-brand-light text-brand" : "text-slate-700 hover:bg-slate-50"
    }`;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-100 bg-white px-4 py-6 md:flex">
        <div className="flex items-center gap-2 px-2 text-lg font-extrabold text-brand-dark">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-white">U</span>
          Admin Portal
        </div>

        <nav className="mt-8 space-y-1">
          {navItems.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={linkClass}>
              <Icon name={n.icon} className="h-5 w-5" />
              {n.label}
            </NavLink>
          ))}
        </nav>

        <p className="mt-8 px-3 text-xs font-medium uppercase tracking-wide text-slate-400">Teams</p>
        <ul className="mt-2 space-y-3 px-3">
          {team.length > 0 ? (
            team.map((m) => (
              <li key={m.id ?? m._id} className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-slate-200 text-xs font-semibold text-slate-600">
                  {(m.name || "?").charAt(0).toUpperCase()}
                </span>
                <span className="text-sm">
                  <span className="block font-medium text-slate-700">{m.name || "Member"}</span>
                  <span className="block text-xs text-slate-400">{m.role || "Member"}</span>
                </span>
              </li>
            ))
          ) : (
            <li className="text-xs text-slate-400">No team members yet.</li>
          )}
        </ul>

        <div className="mt-auto space-y-1 pt-8">
          {bottomItems.map((n) => (
            <NavLink key={n.to} to={n.to} className={linkClass}>
              <Icon name={n.icon} className="h-5 w-5" />
              {n.label}
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50"
          >
            <Icon name="logout" className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="flex items-center gap-4 border-b border-slate-100 bg-white px-6 py-3">
          <div className="relative flex-1 max-w-xl">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Icon name="search" className="h-4 w-4" stroke />
            </span>
            <input
              type="search"
              placeholder="Search…"
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm focus:border-brand focus:outline-none"
            />
          </div>
          <button className="text-slate-500 hover:text-brand"><Icon name="mail" className="h-5 w-5" stroke /></button>
          <button className="text-slate-500 hover:text-brand"><Icon name="bell" className="h-5 w-5" stroke /></button>
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-brand text-sm font-semibold text-white">
              {(user?.name || "U").charAt(0).toUpperCase()}
            </span>
            <span className="hidden text-sm font-medium text-slate-700 sm:block">{user?.name || "User"}</span>
          </div>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
