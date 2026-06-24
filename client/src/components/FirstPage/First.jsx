import React from "react";
import "../../components/FirstPage/first.css";
import { useNavigate } from "react-router-dom";

const First = () => {
  const navigate = useNavigate();

  return (
    <div className="hero">
      {/* Hero section */}
      <div className="hero__content">
        <div className="hero__badge">☁️ Personal Cloud Storage</div>
        <h1 className="hero__title">
          Your files,
          <span className="hero__title-grad"> anywhere</span>
          <br />
          you go
        </h1>
        <p className="hero__desc">
          Store, manage and access all your documents, photos and files from any
          device — securely and instantly.
        </p>
        <div className="hero__actions">
          <button
            className="hero__btn hero__btn--primary"
            onClick={() => navigate("/registration")}
          >
            Get started free
          </button>
          <button
            className="hero__btn hero__btn--ghost"
            onClick={() => navigate("/login")}
          >
            Sign in
          </button>
        </div>
      </div>

      {/* Steps section */}
      <div className="steps">
        <p className="steps__label">How it works</p>
        <h2 className="steps__title">Three steps to your cloud</h2>
        <div className="steps__list">
          <div className="steps__connector" />
          {[
            {
              num: "01",
              icon: "👤",
              name: "Create account",
              text: "Register in seconds and get 8 GB of personal cloud space for free",
            },
            {
              num: "02",
              icon: "📤",
              name: "Upload files",
              text: "Drag & drop or browse — any format, any size",
            },
            {
              num: "03",
              icon: "✨",
              name: "Enjoy",
              text: "Access, share and manage your files from any device, anytime",
            },
          ].map((s) => (
            <div className="steps__item" key={s.num}>
              <div className="steps__bubble">
                <span className="steps__bubble-icon">{s.icon}</span>
              </div>
              <div className="steps__num">{s.num}</div>
              <div className="steps__name">{s.name}</div>
              <div className="steps__text">{s.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features section */}
      <div className="feats">
        {[
          {
            icon: "🔒",
            grad: "#667eea,#764ba2",
            title: "Secure",
            text: "Your files are visible only to you. No one else can access your personal storage",
          },
          {
            icon: "⚡",
            grad: "#f093fb,#f5576c",
            title: "Fast",
            text: "Files upload in seconds. Watch the progress bar and get on with your day",
          },
          {
            icon: "🌐",
            grad: "#4facfe,#00f2fe",
            title: "Anywhere",
            text: "Open your cloud from a phone, tablet or laptop — everything is always in sync",
          },
          {
            icon: "📁",
            grad: "#43e97b,#38f9d7",
            title: "Organised",
            text: "Create folders, sort by name or date, and find any file in seconds with search",
          },
        ].map((f) => (
          <div className="feats__card" key={f.title}>
            <div
              className="feats__icon"
              style={{ background: `linear-gradient(135deg, ${f.grad})` }}
            >
              {f.icon}
            </div>
            <div className="feats__body">
              <div className="feats__title">{f.title}</div>
              <div className="feats__text">{f.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default First;
