import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { AuthShell, Field, PasswordField } from "../components/authUI.jsx";
import { IconMail, IconLock, IconUser, IconArrow } from "../components/icons.jsx";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await register({ name: form.name, email: form.email, password: form.password, role: "student" });
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      brandTitle="Hello, Student!"
      brandText="Enter your details and start your journey to a real tech career with us."
      features={["Free to get started", "Industry-relevant courses", "Build real, job-ready projects"]}
      ctaText="Already have an account?"
      ctaLabel="Log in"
      ctaTo="/login"
    >
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-brand-dark">Create account</h1>
        <p className="mt-1 text-sm text-slate-500">Start learning job-ready skills today.</p>
      </div>
      {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-2.5 text-center text-sm text-red-600">{error}</p>}
      <form onSubmit={submit} className="mt-6 space-y-4">
        <Field icon={IconUser} name="name" value={form.name} onChange={handle} placeholder="Full name" required style={{ animationDelay: "0.1s" }} />
        <Field icon={IconMail} name="email" type="email" value={form.email} onChange={handle} placeholder="Email" required style={{ animationDelay: "0.18s" }} />
        <PasswordField icon={IconLock} name="password" value={form.password} onChange={handle} placeholder="Password" required style={{ animationDelay: "0.26s" }} />
        <PasswordField icon={IconLock} name="confirm" value={form.confirm} onChange={handle} placeholder="Confirm password" required style={{ animationDelay: "0.34s" }} />
        <button disabled={loading} className="btn-primary anim-rise w-full rounded-full" style={{ animationDelay: "0.42s" }}>
          {loading ? "Creating account…" : "Sign up"}
          {!loading && <IconArrow className="h-4 w-4" />}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500 lg:hidden">
        Already have an account? <Link to="/login" className="font-semibold text-brand-600">Log in</Link>
      </p>
    </AuthShell>
  );
}
