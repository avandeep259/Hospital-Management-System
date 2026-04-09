import React from "react";
import { useState } from "react";
import PageIntro from "../components/PageIntro";
import StatusBanner from "../components/StatusBanner";
import useHospitalData from "../hooks/useHospitalData";
import API from "../services/api";

const initialForm = {
  name: "",
  specialization: "",
  contact: "",
  availability: "",
};

function Doctors() {
  const { data, loading, error, setData } = useHospitalData("/doctors");
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "info", message: "" });
  const [saving, setSaving] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setStatus({ type: "info", message: "" });

    try {
      const response = await API.post("/doctors", form);
      setData((current) => [response.data, ...current]);
      setForm(initialForm);
      setStatus({ type: "success", message: "Doctor profile created." });
    } catch (err) {
      setStatus({
        type: "error",
        message: err.response?.data?.message || "Unable to save doctor.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="management-page">
      <PageIntro
        eyebrow="Doctors"
        title="Doctor directory and availability"
        description="Keep physician profiles, specialization data, and shift details organized."
      />

      <section className="content-grid">
        <article className="panel-card">
          <div className="panel-head">
            <h2>Add doctor</h2>
            <span>Profile details</span>
          </div>
          <StatusBanner type={status.type} message={status.message} />
          <form className="form-grid" onSubmit={handleSubmit}>
            <label>
              <span>Name</span>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Doctor name" />
            </label>
            <label>
              <span>Specialization</span>
              <input
                name="specialization"
                value={form.specialization}
                onChange={handleChange}
                placeholder="Cardiology"
              />
            </label>
            <label>
              <span>Contact</span>
              <input
                name="contact"
                value={form.contact}
                onChange={handleChange}
                placeholder="+91 90000 11111"
              />
            </label>
            <label>
              <span>Availability</span>
              <input
                name="availability"
                value={form.availability}
                onChange={handleChange}
                placeholder="Mon-Fri, 9 AM - 5 PM"
              />
            </label>
            <button type="submit" className="primary-button">
              {saving ? "Saving..." : "Add Doctor"}
            </button>
          </form>
        </article>

        <article className="panel-card">
          <div className="panel-head">
            <h2>Doctor roster</h2>
            <span>{loading ? "Loading..." : `${data.length} doctors`}</span>
          </div>
          <StatusBanner type="error" message={error} />
          <div className="card-list">
            {data.length ? (
              data.map((doctor) => (
                <article key={doctor.id} className="mini-card">
                  <strong>{doctor.name}</strong>
                  <span>{doctor.specialization}</span>
                  <span>{doctor.contact}</span>
                  <span>{doctor.availability}</span>
                </article>
              ))
            ) : (
              <p>{loading ? "Loading doctors..." : "No doctors available."}</p>
            )}
          </div>
        </article>
      </section>
    </div>
  );
}

export default Doctors;
