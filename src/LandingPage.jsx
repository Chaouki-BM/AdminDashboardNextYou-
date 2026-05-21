import { BarChart3, Bell, Dumbbell, Users } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useNavigate } from "react-router-dom";

const APK_URL =
  "https://my-app-releases-nextyou.s3.eu-west-3.amazonaws.com/app-release-v1.apk";

const FEATURES = [
  {
    icon: Users,
    title: "User Monitoring",
    description:
      "Track active members, account status, and key engagement signals in real time.",
  },
  {
    icon: Dumbbell,
    title: "Plan Management",
    description:
      "Manage workout plans and content updates from one control surface.",
  },
  {
    icon: BarChart3,
    title: "Analytics Snapshot",
    description:
      "Review growth metrics and operational trends with clear visual summaries.",
  },
  {
    icon: Bell,
    title: "Action Alerts",
    description:
      "Stay responsive with immediate visibility into priority notifications.",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-ui min-h-screen bg-[#0A0A0F] text-zinc-100">
      <style>{`
        .landing-ui .brand-font {
          font-family: "Rajdhani", "Barlow Condensed", sans-serif;
          letter-spacing: 0.04em;
        }

        .landing-ui .glass {
          background: linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.015));
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 24px 45px rgba(2, 5, 15, 0.58);
          backdrop-filter: blur(14px);
        }

        .landing-ui .ath-bg {
          background-image:
            radial-gradient(circle at 15% 15%, rgba(56, 84, 182, 0.34), transparent 35%),
            radial-gradient(circle at 84% 22%, rgba(198,241,53,0.17), transparent 28%),
            radial-gradient(circle at 34% 89%, rgba(58, 112, 240, 0.18), transparent 35%),
            linear-gradient(140deg, #07080f 10%, #0a1222 46%, #070b16 100%);
          position: relative;
          overflow: hidden;
        }

        .landing-ui .ath-bg::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
          opacity: 0.32;
          mask-image: radial-gradient(circle at 50% 44%, black 20%, transparent 82%);
        }

        .landing-ui .fade-up {
          animation: landing-fade 350ms ease-out;
        }

        .landing-ui .btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          border: 0;
          border-radius: 0.5rem;
          background: #c6f135;
          color: #10120e;
          font-size: 0.92rem;
          font-weight: 600;
          padding: 0.625rem 1rem;
          text-decoration: none;
          box-shadow: 0 0 28px rgba(198,241,53,0.3);
          transition: filter 180ms ease;
          cursor: pointer;
        }

        .landing-ui .btn-primary:hover {
          filter: brightness(1.1);
        }

        .landing-ui .btn-outline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 0.5rem;
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.05);
          color: #f4f4f5;
          font-size: 0.92rem;
          font-weight: 600;
          padding: 0.625rem 1rem;
          text-decoration: none;
          transition: border-color 180ms ease, box-shadow 180ms ease;
          cursor: pointer;
        }

        .landing-ui .btn-outline:hover {
          border-color: rgba(198,241,53,0.55);
          box-shadow: 0 0 0 3px rgba(198,241,53,0.12);
        }

        .landing-ui .btn-outline:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        @keyframes landing-fade {
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
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-4">
          <header className="fade-up flex items-center gap-3">
            <div className="glass grid h-10 w-10 place-items-center rounded-xl text-lime-300">
              <span className="brand-font text-lg font-bold">N</span>
            </div>
            <div>
              <p className="brand-font text-[11px] uppercase tracking-[0.3em] text-lime-300">
                NextYou Platform
              </p>
              <h1 className="brand-font text-2xl font-bold text-zinc-100">
                NextYou
              </h1>
            </div>
          </header>

          <section className="fade-up glass rounded-2xl p-5 sm:p-7">
            <p className="brand-font text-xs uppercase tracking-[0.3em] text-lime-300">
              Performance Workspace
            </p>
            <h2 className="brand-font mt-3 text-4xl font-bold leading-[0.9] text-zinc-100 sm:text-6xl">
              A single control center for growth, users, and operations.
            </h2>
            <p className="mt-4 max-w-3xl text-zinc-300">
              NextYou gives your team instant visibility into platform activity,
              plan delivery, and member progress so every decision stays fast,
              informed, and consistent.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                className="btn-primary"
                type="button"
                onClick={() => navigate("/login")}
              >
                Go to Login
              </button>
              <a className="btn-outline" href="#download">
                Download Mobile App
              </a>
            </div>
          </section>

          <section className="fade-up">
            <div className="mb-3">
              <p className="brand-font text-xs uppercase tracking-[0.3em] text-lime-300">
                Core Features
              </p>
              <h3 className="brand-font mt-1 text-3xl font-bold text-zinc-100">
                Built for team velocity
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {FEATURES.map(({ icon: Icon, title, description }) => (
                <article key={title} className="glass rounded-2xl p-5">
                  <div className="mb-3 inline-flex rounded-lg bg-lime-300/10 p-2 text-lime-300">
                    <Icon size={18} />
                  </div>
                  <h4 className="brand-font text-xl font-semibold text-zinc-100">
                    {title}
                  </h4>
                  <p className="mt-2 text-zinc-400">{description}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="download" className="fade-up">
            <div className="mb-3">
              <p className="brand-font text-xs uppercase tracking-[0.3em] text-lime-300">
                Mobile App
              </p>
              <h3 className="brand-font mt-1 text-3xl font-bold text-zinc-100">
                Download NextYou on mobile
              </h3>
            </div>

            <div className="glass grid gap-5 rounded-2xl p-5 md:grid-cols-[auto_1fr] md:items-center">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <QRCodeSVG
                  value={APK_URL}
                  size={190}
                  level="M"
                  bgColor="#FFFFFF"
                  fgColor="#10120E"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  className="btn-primary"
                  href={APK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Android APK
                </a>
                <button className="btn-outline" type="button" disabled>
                  iOS App
                </button>
                <a
                  className="btn-outline"
                  href={APK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Direct Download
                </a>
              </div>
            </div>
          </section>

          <section className="fade-up glass grid justify-items-center gap-4 rounded-2xl p-6 text-center">
            <h3 className="brand-font text-3xl font-bold text-zinc-100">
              Ready to continue?
            </h3>
            <button
              className="btn-primary"
              type="button"
              onClick={() => navigate("/login")}
            >
              Go to Login
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
