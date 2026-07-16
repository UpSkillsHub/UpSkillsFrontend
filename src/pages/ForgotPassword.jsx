import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthShell, Field } from "../components/authUI.jsx";
import { IconMail, IconArrow, IconKey, IconCheck } from "../components/icons.jsx";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    // No reset endpoint yet — show a confirmation. Wire to the backend when ready.
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 700);
  };

  return (
    <AuthShell
      brandTitle="Forgot your password?"
      brandText="It happens. Enter your email and we'll help you get back into your account."
      features={["Secure account recovery", "Quick and simple", "Back to learning in minutes"]}
      ctaText="Remembered your password?"
      ctaLabel="Log in"
      ctaTo="/login"
    >
      <div className="text-center">
        <span className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600">
          <IconKey className="h-7 w-7" />
        </span>
        <h1 className="animate-gradient bg-gradient-to-r from-brand-800 via-blue-500 to-brand-800 bg-[length:200%_auto] bg-clip-text text-3xl font-extrabold text-transparent dark:from-white dark:via-blue-300 dark:to-white">Reset password</h1>
        <p className="mt-1 text-sm text-slate-500">Enter your email and we'll send you a reset link.</p>
      </div>

      {sent ? (
        <div className="anim-rise mt-8 rounded-2xl bg-brand-50 p-6 text-center">
          <span className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-brand-600 text-white">
            <IconCheck className="h-6 w-6" />
          </span>
          <p className="text-sm font-medium text-brand-dark">Check your inbox</p>
          <p className="mt-1 text-sm text-slate-500">
            If an account exists for <span className="font-medium">{email}</span>, a reset link is on its way.
          </p>
          <Link to="/login" className="btn-primary mt-6 w-full rounded-full">Back to log in</Link>
        </div>
      ) : (
        <>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <Field icon={IconMail} name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required style={{ animationDelay: "0.1s" }} />
            <button disabled={loading} className="btn-primary anim-rise w-full rounded-full" style={{ animationDelay: "0.2s" }}>
              {loading ? "Sending…" : "Send reset link"}
              {!loading && <IconArrow className="h-4 w-4" />}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-500 lg:hidden">
            Remembered it? <Link to="/login" className="font-semibold text-brand-600">Log in</Link>
          </p>
        </>
      )}
    </AuthShell>
  );
}
