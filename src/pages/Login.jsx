import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { AuthShell, Field, PasswordField } from "../components/authUI.jsx";
import { IconMail, IconLock, IconArrow } from "../components/icons.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form);
      navigate("/coming-soon");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      brandTitle="Welcome Back!"
      brandText="To stay connected with us, please log in with your personal information."
      features={["Hands-on, practical courses", "Learn from working practitioners", "Real projects & internships"]}
      ctaText="Don't have an account yet?"
      ctaLabel="Sign up"
      ctaTo="/register"
    >
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-brand-dark">Welcome</h1>
        <p className="mt-1 text-sm text-slate-500">Log in to your account to continue.</p>
      </div>
      {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-2.5 text-center text-sm text-red-600">{error}</p>}
      <form onSubmit={submit} className="mt-6 space-y-4">
        <Field icon={IconMail} name="email" type="email" value={form.email} onChange={handle} placeholder="Email" required style={{ animationDelay: "0.1s" }} />
        <PasswordField icon={IconLock} name="password" value={form.password} onChange={handle} placeholder="Password" required style={{ animationDelay: "0.2s" }} />
        <button disabled={loading} className="btn-primary anim-rise w-full rounded-full" style={{ animationDelay: "0.3s" }}>
          {loading ? "Logging in…" : "Log in"}
          {!loading && <IconArrow className="h-4 w-4" />}
        </button>
      </form>
      <p className="mt-6 text-center text-sm">
        <Link to="/forgot-password" className="font-semibold text-red-500 transition hover:text-red-600">
          Forgot password?
        </Link>
      </p>
      <p className="mt-2 text-center text-sm text-slate-500 lg:hidden">
        No account? <Link to="/register" className="font-semibold text-brand-600">Sign up</Link>
      </p>
    </AuthShell>
  );
}
