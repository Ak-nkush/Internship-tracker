import { useEffect, useState } from "react";

const initialForm = {
  company: "",
  role: "",
  status: "Applied",
  location: "",
  link: "",
  notes: "",
  appliedDate: "",
};

export default function ApplicationModal({ open, onClose, onSubmit, editingItem }) {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (editingItem) {
      setFormData({
        company: editingItem.company || "",
        role: editingItem.role || "",
        status: editingItem.status || "Applied",
        location: editingItem.location || "",
        link: editingItem.link || "",
        notes: editingItem.notes || "",
        appliedDate: editingItem.appliedDate ? editingItem.appliedDate.slice(0, 10) : "",
      });
    } else {
      setFormData(initialForm);
    }
  }, [editingItem, open]);

  if (!open) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <h3>{editingItem ? "Update application" : "Add new application"}</h3>
            <p>Keep your internship pipeline up to date.</p>
          </div>
          <button className="ghost-button" onClick={onClose} type="button">
            Close
          </button>
        </div>

        <form className="application-form" onSubmit={handleSubmit}>
          <input name="company" placeholder="Company name" value={formData.company} onChange={handleChange} required />
          <input name="role" placeholder="Role title" value={formData.role} onChange={handleChange} required />
          <select name="status" value={formData.status} onChange={handleChange}>
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
          <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
          <input name="appliedDate" type="date" value={formData.appliedDate} onChange={handleChange} required />
          <input name="link" placeholder="Application link" value={formData.link} onChange={handleChange} />
          <textarea name="notes" placeholder="Notes" rows="4" value={formData.notes} onChange={handleChange} />
          <button className="primary-button" type="submit">
            {editingItem ? "Save changes" : "Create application"}
          </button>
        </form>
      </div>
    </div>
  );
}
