export default function AuthHero() {
  return (
    <div className="auth-hero">
      <div className="auth-hero__badge">Internship Tracker</div>
      <h1>Manage your internship journey efficiently</h1>
      <p>
        Track applications, interviews, offers, and rejections in one calm workspace
        designed for students.
      </p>

      <div className="hero-illustration">
        <div className="hero-card hero-card--large">
          <span className="hero-card__title">24 Applications</span>
          <span className="hero-card__meta">Across design, frontend, and data roles</span>
        </div>
        <div className="hero-card hero-card--small">
          <span className="hero-dot hero-dot--blue"></span>
          <span>Interview this week</span>
        </div>
        <div className="hero-card hero-card--small hero-card--offset">
          <span className="hero-dot hero-dot--green"></span>
          <span>Offer pipeline growing</span>
        </div>
      </div>
    </div>
  );
}
