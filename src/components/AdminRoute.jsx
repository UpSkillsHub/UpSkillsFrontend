import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Guards the admin portal: waits for the auth check, sends anonymous users to
// login, and non-admins to the coming-soon page.
export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return <div className="grid min-h-screen place-items-center text-slate-500">Loading…</div>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role !== "admin" && user.role !== "super_admin") {
    return <Navigate to="/coming-soon" replace />;
  }
  return children;
}
