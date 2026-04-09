import React from "react";
import { useState } from "react";
import PageIntro from "../components/PageIntro";
import StatusBanner from "../components/StatusBanner";
import useHospitalData from "../hooks/useHospitalData";
import API from "../services/api";

const initialForm = {
  name: "",
  age: "",
  gender: "Male",
  contact: "",
  condition: "",
  notes: "",
};

function Patients() {
  const { data, loading, error, setData } = useHospitalData("/patients");
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
      const response = await API.post("/patients", form);
      setData((current) => [response.data, ...current]);
      setForm(initialForm);
      setStatus({ type: "success", message: "Patient added successfully." });
    } catch (err) {
      setStatus({
        type: "error",
        message: err.response?.data?.message || "Unable to save patient.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="management-page">
      <PageIntro
        eyebrow="Patients"
        title="Patient registration and record overview"
        description="Add new patients and review stored details in a responsive record table."
      />

      <section className="content-grid">
        <article className="panel-card">
          <div className="panel-head">
            <h2>Add patient</h2>
            <span>Registration form</span>
          </div>
          <StatusBanner type={status.type} message={status.message} />
          <form className="form-grid" onSubmit={handleSubmit}>
            <label>
              <span>Name</span>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Patient name" />
            </label>
            <label>
              <span>Age</span>
              <input name="age" type="number" value={form.age} onChange={handleChange} placeholder="Age" />
            </label>
            <label>
              <span>Gender</span>
              <select name="gender" value={form.gender} onChange={handleChange}>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </label>
            <label>
              <span>Contact</span>
              <input
                name="contact"
                value={form.contact}
                onChange={handleChange}
                placeholder="+91 98765 43210"
              />
            </label>
            <label className="full-span">
              <span>Condition</span>
              <input
                name="condition"
                value={form.condition}
                onChange={handleChange}
                placeholder="Current condition"
              />
            </label>
            <label className="full-span">
              <span>Notes</span>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Additional notes"
                rows="4"
              />
            </label>
            <button type="submit" className="primary-button">
              {saving ? "Saving..." : "Add Patient"}
            </button>
          </form>
        </article>

        <article className="panel-card">
          <div className="panel-head">
            <h2>Patient records</h2>
            <span>{loading ? "Loading..." : `${data.length} patients`}</span>
          </div>
          <StatusBanner type="error" message={error} />
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Contact</th>
                  <th>Condition</th>
                </tr>
              </thead>
              <tbody>
                {data.length ? (
                  data.map((patient) => (
                    <tr key={patient.id}>
                      <td>{patient.id}</td>
                      <td>{patient.name}</td>
                      <td>{patient.age}</td>
                      <td>{patient.contact}</td>
                      <td>{patient.condition}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">{loading ? "Loading records..." : "No patient records available."}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </div>
  );
}

export default Patients;
