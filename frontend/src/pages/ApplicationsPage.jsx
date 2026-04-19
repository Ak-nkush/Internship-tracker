import { useEffect, useState } from "react";
import AppShell from "../components/AppShell";
import ApplicationModal from "../components/ApplicationModal";
import client from "../api/client";

const filters = ["All", "Applied", "Interview", "Offer", "Rejected"];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [openModal, setOpenModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchApplications = async (filterValue = selectedFilter) => {
    setLoading(true);
    try {
      const { data } = await client.get("/applications", { params: { status: filterValue } });
      setApplications(data);
    } catch (error) {
      setFormError(error.response?.data?.message || "Unable to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications(selectedFilter);
  }, [selectedFilter]);

  const handleCreateOrUpdate = async (payload) => {
    setFormError("");
    try {
      if (editingItem) {
        await client.put(`/applications/${editingItem._id}`, payload);
      } else {
        await client.post("/applications", payload);
      }
      setOpenModal(false);
      setEditingItem(null);
      fetchApplications(selectedFilter);
    } catch (error) {
      setFormError(error.response?.data?.message || "Unable to save application");
    }
  };

  const handleDelete = async (id) => {
    try {
      await client.delete(`/applications/${id}`);
      fetchApplications(selectedFilter);
    } catch (error) {
      setFormError(error.response?.data?.message || "Unable to delete application");
    }
  };

  return (
    <AppShell
      title="Applications"
      subtitle="Manage every internship application in one dedicated workspace."
      action={
        <button
          className="nav-item"
          type="button"
          onClick={() => {
            setEditingItem(null);
            setOpenModal(true);
          }}
        >
          <svg className="nav-icon" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6"/>
            <path d="M10 7v6M7 10h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          Add Application
        </button>
      }
    >
      <section className="toolbar">
        <select value={selectedFilter} onChange={(event) => setSelectedFilter(event.target.value)}>
          {filters.map((filter) => (
            <option key={filter}>{filter}</option>
          ))}
        </select>
        <button
          className="primary-button"
          type="button"
          onClick={() => {
            setEditingItem(null);
            setOpenModal(true);
          }}
        >
          Add Application
        </button>
      </section>

      {formError && <div className="form-error dashboard-error">{formError}</div>}

      <section className="applications-grid">
        {!loading &&
          applications.map((application) => (
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

              <div className="application-card__actions">
                <button
                  className="ghost-button"
                  type="button"
                  onClick={() => {
                    setEditingItem(application);
                    setOpenModal(true);
                  }}
                >
                  Edit
                </button>
                <button className="danger-button" type="button" onClick={() => handleDelete(application._id)}>
                  Delete
                </button>
              </div>
            </article>
          ))}

        {!loading && applications.length === 0 && (
          <div className="empty-state">
            <div className="empty-state__art"></div>
            <h2>No applications yet</h2>
            <p>Start by adding your first internship application.</p>
          </div>
        )}
      </section>

      <ApplicationModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditingItem(null);
        }}
        onSubmit={handleCreateOrUpdate}
        editingItem={editingItem}
      />
    </AppShell>
  );
}
