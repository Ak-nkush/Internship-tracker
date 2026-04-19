import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import client from "../api/client";
import AppShell from "../components/AppShell";

const statCards = [
  { key: "total", label: "Total Applications" },
  { key: "Applied", label: "Applied" },
  { key: "Interview", label: "Interview" },
  { key: "Offer", label: "Offer" },
];

export default function DashboardPage() {
  const [recentApplications, setRecentApplications] = useState([]);
  const [stats, setStats] = useState({ total: 0, Applied: 0, Interview: 0, Offer: 0, Rejected: 0 });
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const [applicationsResponse, statsResponse] = await Promise.all([
        client.get("/applications"),
        client.get("/applications/stats"),
      ]);
      setRecentApplications(applicationsResponse.data.slice(0, 3));
      setStats(statsResponse.data);
    } catch (error) {
      setFormError(error.response?.data?.message || "Unable to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <AppShell
      title="Internship Tracker"
      action={
        <Link className="nav-item" to="/applications">
          Add Application
        </Link>
      }
    >
      <section className="stats-grid">
        {statCards.map((card) => (
          <article className={`stat-card stat-card--${card.key}`} key={card.key}>
            <span>{card.label}</span>
            <strong>{stats[card.key] || 0}</strong>
          </article>
        ))}
      </section>

      <section className="dashboard-panel">
        <div className="dashboard-panel__header">
          <div>
            <h2>Recent applications</h2>
            <p>Your latest activity appears here for a quick overview.</p>
          </div>
          <Link className="primary-button dashboard-link-button" to="/applications">
            Open Applications
          </Link>
        </div>

        {formError && <div className="form-error dashboard-error">{formError}</div>}

        <section className="applications-grid">
          {!loading &&
            recentApplications.map((application) => (
              <article className="application-card" key={application._id}>
                <div className="application-card__header">
                  <div>
                    <h3>{application.company}</h3>
                    <p>{application.role}</p>
                  </div>
                  <span className={`status-badge status-badge--${application.status.toLowerCase()}`}>
                    {application.status}
                  </span>
                </div>

                <div className="application-card__meta">
                  <span>{application.location || "Remote / Flexible"}</span>
                  <span>{new Date(application.appliedDate).toLocaleDateString()}</span>
                </div>

                {application.notes && <p className="application-card__notes">{application.notes}</p>}
              </article>
            ))}

          {!loading && recentApplications.length === 0 && (
            <div className="empty-state">
              <div className="empty-state__art"></div>
              <h2>No applications yet</h2>
              <p>Start by adding your first internship application.</p>
            </div>
          )}
        </section>
      </section>
    </AppShell>
  );
}
