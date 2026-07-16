import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { AuthShell, Field, PasswordField } from "../components/authUI.jsx";
import { IconMail, IconLock, IconUser, IconArrow, IconCheck } from "../components/icons.jsx";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Password rules + strength
  const pwd = form.password;
  const checks = {
    length: pwd.length >= 8,
    number: /[0-9]/.test(pwd),
    symbol: /[^A-Za-z0-9]/.test(pwd),
    letter: /[a-z]/.test(pwd) && /[A-Z]/.test(pwd),
  };
  const score = Object.values(checks).filter(Boolean).length;
  const strength = pwd.length === 0 ? null : score <= 1 ? "Weak" : score === 2 ? "Fair" : score === 3 ? "Good" : "Strong";
  const strengthBar = { Weak: "w-1/4 bg-red-500", Fair: "w-2/4 bg-orange-500", Good: "w-3/4 bg-yellow-500", Strong: "w-full bg-green-500" };
  const strengthText = { Weak: "text-red-500", Fair: "text-orange-500", Good: "text-yellow-600", Strong: "text-green-600" };
  const confirmTouched = form.confirm.length > 0;
  const passwordsMatch = confirmTouched && form.confirm === form.password;

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!(checks.length && checks.number && checks.symbol)) {
      setError("Password must be at least 8 characters and include a number and a symbol.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const name = `${form.firstName} ${form.lastName}`.trim();
      await register({ name, email: form.email, password: form.password, role: "student" });
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const Req = ({ ok, children }) => (
    <li className={`flex items-center gap-1.5 ${ok ? "text-green-600" : "text-slate-400"}`}>
      <span className={`grid h-4 w-4 place-items-center rounded-full text-[10px] ${ok ? "bg-green-100" : "bg-slate-100"}`}>
        {ok ? <IconCheck className="h-2.5 w-2.5" /> : "•"}
      </span>
      {children}
    </li>
  );

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
        <h1 className="animate-gradient bg-gradient-to-r from-brand-800 via-blue-500 to-brand-800 bg-[length:200%_auto] bg-clip-text text-3xl font-extrabold text-transparent dark:from-white dark:via-blue-300 dark:to-white">Create account</h1>
        <p className="mt-1 text-sm text-slate-500">Start learning job-ready skills today.</p>
      </div>
      {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-2.5 text-center text-sm text-red-600">{error}</p>}
      <form onSubmit={submit} className="mt-6 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field icon={IconUser} name="firstName" value={form.firstName} onChange={handle} placeholder="First name" required style={{ animationDelay: "0.1s" }} />
          <Field icon={IconUser} name="lastName" value={form.lastName} onChange={handle} placeholder="Last name" required style={{ animationDelay: "0.14s" }} />
        </div>
        <Field icon={IconMail} name="email" type="email" value={form.email} onChange={handle} placeholder="Email" required style={{ animationDelay: "0.18s" }} />

        <div>
          <PasswordField icon={IconLock} name="password" value={form.password} onChange={handle} placeholder="Password" required style={{ animationDelay: "0.26s" }} />
          {strength && (
            <div className="mt-2 px-1">
              <div className="flex items-center justify-between">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div className={`h-full rounded-full transition-all duration-300 ${strengthBar[strength]}`} />
                </div>
                <span className={`ml-3 text-xs font-semibold ${strengthText[strength]}`}>{strength}</span>
              </div>
              <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                <Req ok={checks.length}>At least 8 characters</Req>
                <Req ok={checks.number}>Contains a number</Req>
                <Req ok={checks.symbol}>Contains a symbol</Req>
                <Req ok={checks.letter}>Upper &amp; lower case</Req>
              </ul>
            </div>
          )}
        </div>

        <div>
          <PasswordField icon={IconLock} name="confirm" value={form.confirm} onChange={handle} placeholder="Confirm password" required style={{ animationDelay: "0.34s" }} />
          {confirmTouched && (
            <p className={`mt-1.5 px-1 text-xs font-medium ${passwordsMatch ? "text-green-600" : "text-red-500"}`}>
              {passwordsMatch ? "✓ Passwords match" : "✕ Passwords do not match"}
            </p>
          )}
        </div>

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
