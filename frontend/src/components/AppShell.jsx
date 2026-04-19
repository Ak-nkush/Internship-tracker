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
          <div className="brand__icon">IT</div>
          <div>
            <span>Internship</span>
            <strong>Tracker</strong>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `nav-item${isActive ? " nav-item--active" : ""}`}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/applications"
            className={({ isActive }) => `nav-item${isActive ? " nav-item--active" : ""}`}
          >
            Applications
          </NavLink>
          {action}
          <button className="nav-item" type="button" onClick={logout}>
            Logout
          </button>
        </nav>
      </aside>

      <main className="dashboard-main">
        <header className="topbar">
          <div>
            <p className="topbar__greeting">{getGreeting(user?.name)}</p>
            <h1>{title}</h1>
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
