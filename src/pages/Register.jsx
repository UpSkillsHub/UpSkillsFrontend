import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { AuthShell, Field, PasswordField } from "../components/authUI.jsx";
import { IconMail, IconLock, IconUser, IconArrow, IconCheck } from "../components/icons.jsx";

export default function Register() {
  const { register, logout } = useAuth();
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
      // Account is saved, but the student portal isn't live — don't keep them signed in.
      await logout();
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
      brandTitle="Hello, Employer!"
      brandText="Create an employer account to post tasks and hire trained talent from Up Skills Hub."
      features={["Post tasks in minutes", "Hire reviewed, job-ready trainees", "Pay securely when work is delivered"]}
      ctaText="Already have an account?"
      ctaLabel="Log in"
      ctaTo="/login"
    >
      <div className="text-center">
        <h1 className="animate-gradient bg-gradient-to-r from-brand-800 via-blue-500 to-brand-800 bg-[length:200%_auto] bg-clip-text text-3xl font-extrabold text-transparent dark:from-white dark:via-blue-300 dark:to-white">Create employer account</h1>
        <p className="mt-1 text-sm text-slate-500">Post tasks and hire our talent.</p>
      </div>

      {/* Continue with Google */}
      <button
        type="button"
        onClick={() => setError("Google sign-up is coming soon. Please use your email for now.")}
        className="mt-6 flex h-12 w-full items-center justify-center gap-3 rounded-2xl border-2 border-slate-200 bg-white text-sm font-semibold text-slate-700 transition-all duration-300 ease-apple hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-soft active:scale-[0.98] dark:border-white/15 dark:bg-white/5 dark:text-slate-100"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5">
          <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.9Z" />
          <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.5 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1A12 12 0 0 0 12 24Z" />
          <path fill="#FBBC05" d="M5.4 14.4a7.2 7.2 0 0 1 0-4.6V6.7H1.4a12 12 0 0 0 0 10.8l4-3.1Z" />
          <path fill="#EA4335" d="M12 4.8c1.8 0 3.4.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.4 6.7l4 3.1C6.3 6.9 8.9 4.8 12 4.8Z" />
        </svg>
        Continue with Google
      </button>

      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
        <span className="text-xs font-medium uppercase tracking-wide text-slate-400">or</span>
        <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
      </div>

      {/* Trainee redirect notice */}
      <div className="rounded-2xl bg-blue-50 px-4 py-3 text-center text-[13px] leading-relaxed text-blue-800 ring-1 ring-blue-100 dark:bg-blue-500/10 dark:text-blue-200 dark:ring-blue-500/20">
        Are you a trainee or intern?{" "}
        <Link to="/registration" className="font-bold underline underline-offset-2">
          Use the registration form
        </Link>{" "}
        to enroll and get your Trainee ID.
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
