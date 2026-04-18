import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
            <h1>{title}</h1>
            <p>{subtitle || `Welcome back, ${user?.name || "Student"}.`}</p>
          </div>
          <div className="topbar__profile">
            <div className="profile-chip">
              <span>{user?.name?.[0] || "U"}</span>
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
