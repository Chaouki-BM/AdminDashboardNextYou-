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
    <div className="landing-ui min-h-screen bg-[#000000] text-white">
      <style>{`
        .landing-ui .brand-font {
          font-family: "Rajdhani", "Barlow Condensed", sans-serif;
          letter-spacing: 0.04em;
        }

        .landing-ui .glass {
          background: #1c1c1c;
          border: 0;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(12px);
        }

        .landing-ui .ath-bg {
          background-image:
            radial-gradient(circle at 15% 15%, rgba(255, 69, 0, 0.18), transparent 35%),
            radial-gradient(circle at 84% 22%, rgba(255, 69, 0, 0.1), transparent 28%),
            radial-gradient(circle at 34% 89%, rgba(255, 69, 0, 0.12), transparent 35%),
            linear-gradient(140deg, #000000 10%, #0f0f0f 46%, #000000 100%);
          position: relative;
          overflow: hidden;
        }

        .landing-ui .ath-bg::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 48px 48px;
          opacity: 0.2;
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
          border-radius: 9999px;
          background: #ff4500;
          color: #ffffff;
          font-size: 0.92rem;
          font-weight: 700;
          padding: 0.625rem 1rem;
          text-decoration: none;
          box-shadow: 0 0 28px rgba(255, 69, 0, 0.28);
          transition: filter 180ms ease;
          cursor: pointer;
        }

        .landing-ui .btn-primary:hover {
          filter: brightness(1.06);
        }

        .landing-ui .btn-outline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          border: 1px solid #2a2a2a;
          background: #2a2a2a;
          color: #ffffff;
          font-size: 0.92rem;
          font-weight: 700;
          padding: 0.625rem 1rem;
          text-decoration: none;
          transition: border-color 180ms ease, box-shadow 180ms ease;
          cursor: pointer;
        }

        .landing-ui .btn-outline:hover {
          border-color: rgba(255, 69, 0, 0.55);
          box-shadow: 0 0 0 3px rgba(255, 69, 0, 0.12);
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
            <div className="glass grid h-10 w-10 place-items-center rounded-xl text-[#ff4500]">
              <span className="brand-font text-lg font-bold">N</span>
            </div>
            <div>
              <p className="brand-font text-[11px] uppercase tracking-[0.3em] text-[#ff4500]">
                NextYou Platform
              </p>
              <h1 className="brand-font text-2xl font-bold text-white">
                NextYou
              </h1>
            </div>
          </header>

          <section className="fade-up glass rounded-2xl p-5 sm:p-7">
            <p className="brand-font text-xs uppercase tracking-[0.3em] text-[#ff4500]">
              Performance Workspace
            </p>
            <h2 className="brand-font mt-3 text-4xl font-bold leading-[0.9] text-white sm:text-6xl">
              A single control center for growth, users, and operations.
            </h2>
            <p className="mt-4 max-w-3xl text-[#888888]">
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
              <p className="brand-font text-xs uppercase tracking-[0.3em] text-[#ff4500]">
                Core Features
              </p>
              <h3 className="brand-font mt-1 text-3xl font-bold text-white">
                Built for team velocity
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {FEATURES.map(({ icon: Icon, title, description }) => (
                <article key={title} className="glass rounded-2xl p-5">
                  <div className="mb-3 inline-flex rounded-lg bg-[#2a2a2a] p-2 text-[#ff4500]">
                    <Icon size={18} />
                  </div>
                  <h4 className="brand-font text-xl font-semibold text-white">
                    {title}
                  </h4>
                  <p className="mt-2 text-[#888888]">{description}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="download" className="fade-up">
            <div className="mb-3">
              <p className="brand-font text-xs uppercase tracking-[0.3em] text-[#ff4500]">
                Mobile App
              </p>
              <h3 className="brand-font mt-1 text-3xl font-bold text-white">
                Download NextYou on mobile
              </h3>
            </div>

            <div className="glass grid gap-5 rounded-2xl p-5 md:grid-cols-[auto_1fr] md:items-center">
              <div className="rounded-xl border border-[#ff4500]/35 bg-[#1c1c1c] p-3 shadow-[0_0_24px_rgba(255,69,0,0.18)]">
                <QRCodeSVG
                  value={APK_URL}
                  size={190}
                  level="M"
                  bgColor="#1C1C1C"
                  fgColor="#FF4500"
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
            <h3 className="brand-font text-3xl font-bold text-white">
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
