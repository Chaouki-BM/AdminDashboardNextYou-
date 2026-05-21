import React, { useState } from "react";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await onLogin({ email, password });
    } catch (requestError) {
      setError(requestError?.message || "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-ui min-h-screen bg-[#000000] text-white">
      <style>{`
        .login-ui .brand-font {
          font-family: "Rajdhani", "Barlow Condensed", sans-serif;
          letter-spacing: 0.04em;
        }

        .login-ui .mono-font {
          font-family: "IBM Plex Mono", "DM Mono", monospace;
        }

        .login-ui .glass {
          background: #1c1c1c;
          border: 0;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(12px);
        }

        .login-ui .ath-bg {
          background-image:
            radial-gradient(circle at 15% 15%, rgba(255, 69, 0, 0.18), transparent 35%),
            radial-gradient(circle at 84% 22%, rgba(255, 69, 0, 0.1), transparent 28%),
            radial-gradient(circle at 34% 89%, rgba(255, 69, 0, 0.12), transparent 35%),
            linear-gradient(140deg, #000000 10%, #0f0f0f 46%, #000000 100%);
          position: relative;
          overflow: hidden;
        }

        .login-ui .ath-bg::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 48px 48px;
          opacity: 0.2;
          mask-image: radial-gradient(circle at 50% 44%, black 20%, transparent 82%);
        }

        .login-ui input {
          border-color: #2a2a2a;
          background-color: #2a2a2a;
          color: #ffffff;
          transition: border-color 180ms ease, box-shadow 180ms ease, background-color 180ms ease;
        }

        .login-ui input:focus {
          border-color: rgba(255, 69, 0, 0.55);
          box-shadow: 0 0 0 3px rgba(255, 69, 0, 0.12);
        }

        .login-ui .fade-up {
          animation: login-fade 350ms ease-out;
        }

        @keyframes login-fade {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="ath-bg relative min-h-screen px-4 py-6 sm:px-8">
        <div className="mx-auto grid min-h-[92vh] w-full max-w-6xl grid-cols-1 items-center gap-6 lg:grid-cols-2">
          <section className="fade-up hidden space-y-6 lg:block">
            <div>
              <p className="brand-font text-sm uppercase tracking-[0.34em] text-[#ff4500]">
                NextYou Admin
              </p>
              <h1 className="brand-font mt-3 text-6xl font-bold leading-[0.9] text-white">
                High-Performance
                <span className="block text-[#ff4500]">Control Center</span>
              </h1>
              <p className="mt-5 max-w-xl text-[#888888]">
                Monitor platform growth, optimize training intelligence, and
                keep fitness operations moving with precision.
              </p>
            </div>

            <div className="grid max-w-xl grid-cols-3 gap-3">
              {[
                { label: "Active Users", value: "14.2K" },
                { label: "Plans Today", value: "1,268" },
                { label: "Check-ins", value: "9,840" },
              ].map((item) => (
                <div key={item.label} className="glass rounded-xl p-3">
                  <p className="mono-font text-2xl text-[#ff4500]">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#888888]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="fade-up glass mx-auto w-full max-w-md rounded-2xl p-5 sm:p-7">
            <div className="mb-6 text-center">
              <p className="brand-font text-xs uppercase tracking-[0.3em] text-[#ff4500]">
                Secure Access
              </p>
              <h2 className="brand-font mt-2 text-3xl font-bold text-white">
                Welcome Back
              </h2>
              <p className="mt-1 text-sm text-[#888888]">
                Sign in to access the NextYou admin dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="mb-1 block text-xs uppercase tracking-[0.14em] text-[#888888]">
                  Email
                </span>
                <div className="relative">
                  <Mail
                    size={15}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border py-2.5 pl-9 pr-3 text-sm outline-none"
                    placeholder="admin@nextyou.app"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-1 block text-xs uppercase tracking-[0.14em] text-[#888888]">
                  Password
                </span>
                <div className="relative">
                  <Lock
                    size={15}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border py-2.5 pl-9 pr-10 text-sm outline-none"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#888888] hover:bg-[#2a2a2a] hover:text-white"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </label>

              {error && (
                <p className="rounded-lg border border-[#ff4500]/25 bg-[#ff4500]/10 px-3 py-2 text-sm text-white">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#ff4500] px-4 py-2.5 text-sm font-bold text-white shadow-[0_0_28px_rgba(255,69,0,0.3)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  "Signing in..."
                ) : (
                  <>
                    Enter Dashboard <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
