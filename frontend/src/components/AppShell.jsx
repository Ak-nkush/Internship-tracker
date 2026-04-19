import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function getGreeting(name) {
  const hour = new Date().getHours();
  let timeGreeting;
  if (hour < 12) timeGreeting = "Good morning";
  else if (hour < 17) timeGreeting = "Good afternoon";
  else timeGreeting = "Good evening";
  return `${timeGreeting}, ${name || "Student"} 👋`;
}

export default function AppShell({ title, subtitle, action, children }) {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand__icon">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="2" y="6" width="18" height="13" rx="3" stroke="white" strokeWidth="1.8"/>
              <path d="M7 6V5a4 4 0 018 0v1" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M2 11h18" stroke="white" strokeWidth="1.8" opacity="0.5"/>
              <circle cx="11" cy="11" r="1.5" fill="white"/>
            </svg>
          </div>
          <div className="brand__text">
            <strong>Internship</strong>
            <span>Tracker</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `nav-item${isActive ? " nav-item--active" : ""}`}
          >
            <svg className="nav-icon" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="2" width="7" height="7" rx="2" fill="currentColor" opacity="0.8"/>
              <rect x="11" y="2" width="7" height="7" rx="2" fill="currentColor" opacity="0.5"/>
              <rect x="2" y="11" width="7" height="7" rx="2" fill="currentColor" opacity="0.5"/>
              <rect x="11" y="11" width="7" height="7" rx="2" fill="currentColor" opacity="0.3"/>
            </svg>
            Dashboard
          </NavLink>
          <NavLink
            to="/applications"
            className={({ isActive }) => `nav-item${isActive ? " nav-item--active" : ""}`}
          >
            <svg className="nav-icon" viewBox="0 0 20 20" fill="none">
              <rect x="3" y="2" width="14" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.6"/>
              <path d="M7 7h6M7 10.5h6M7 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Applications
          </NavLink>
          {action}
          <button className="nav-item nav-item--logout" type="button" onClick={logout}>
            <svg className="nav-icon" viewBox="0 0 20 20" fill="none">
              <path d="M8 10h8M13 7l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 4H5a2 2 0 00-2 2v8a2 2 0 002 2h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
            Logout
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-user__avatar">{user?.name?.[0]?.toUpperCase() || "U"}</div>
            <div className="sidebar-user__info">
              <strong>{user?.name || "Student"}</strong>
              <span>{user?.email || ""}</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="topbar">
          <div>
            <h1>{title}</h1>
            <p className="topbar__greeting">{getGreeting(user?.name)}</p>
            {subtitle && <p className="topbar__subtitle">{subtitle}</p>}
          </div>
          <div className="topbar__profile">
            <div className="profile-chip">
              <span>{user?.name?.[0]?.toUpperCase() || "U"}</span>
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
