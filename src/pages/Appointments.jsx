import React from "react";
import { useMemo, useState } from "react";
import PageIntro from "../components/PageIntro";
import StatusBanner from "../components/StatusBanner";
import useHospitalData from "../hooks/useHospitalData";
import API from "../services/api";

const initialForm = {
  patientId: "",
  doctorId: "",
  date: "",
  time: "",
  status: "Scheduled",
};

function Appointments() {
  const appointments = useHospitalData("/appointments");
  const patients = useHospitalData("/patients");
  const doctors = useHospitalData("/doctors");
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "info", message: "" });
  const [saving, setSaving] = useState(false);

  const combinedError = appointments.error || patients.error || doctors.error;

  const timeline = useMemo(
    () =>
      [...appointments.data].sort((a, b) => {
        const left = `${a.date}T${a.time}`;
        const right = `${b.date}T${b.time}`;
        return left.localeCompare(right);
      }),
    [appointments.data]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setStatus({ type: "info", message: "" });

    try {
      const response = await API.post("/appointments", form);
      appointments.setData((current) => [response.data, ...current]);
      setForm(initialForm);
      setStatus({ type: "success", message: "Appointment scheduled successfully." });
    } catch (err) {
      setStatus({
        type: "error",
        message: err.response?.data?.message || "Unable to create appointment.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="management-page">
      <PageIntro
        eyebrow="Appointments"
        title="Schedule and review consultations"
        description="Connect patient records with doctors and maintain a simple appointment pipeline."
      />

      <StatusBanner type="error" message={combinedError} />

      <section className="content-grid">
        <article className="panel-card">
          <div className="panel-head">
            <h2>Book appointment</h2>
            <span>Assign doctor and patient</span>
          </div>
          <StatusBanner type={status.type} message={status.message} />
          <form className="form-grid" onSubmit={handleSubmit}>
            <label>
              <span>Patient</span>
              <select name="patientId" value={form.patientId} onChange={handleChange}>
                <option value="">Select patient</option>
                {patients.data.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Doctor</span>
              <select name="doctorId" value={form.doctorId} onChange={handleChange}>
                <option value="">Select doctor</option>
                {doctors.data.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Date</span>
              <input name="date" type="date" value={form.date} onChange={handleChange} />
            </label>
            <label>
              <span>Time</span>
              <input name="time" type="time" value={form.time} onChange={handleChange} />
            </label>
            <label>
              <span>Status</span>
              <select name="status" value={form.status} onChange={handleChange}>
                <option>Scheduled</option>
                <option>Confirmed</option>
                <option>Completed</option>
              </select>
            </label>
            <button type="submit" className="primary-button">
              {saving ? "Saving..." : "Create Appointment"}
            </button>
          </form>
        </article>

        <article className="panel-card">
          <div className="panel-head">
            <h2>Appointment timeline</h2>
            <span>{appointments.loading ? "Loading..." : `${timeline.length} appointments`}</span>
          </div>
          <div className="list-stack">
            {timeline.length ? (
              timeline.map((appointment) => (
                <div key={appointment.id} className="list-item">
                  <div>
                    <strong>{appointment.patientName}</strong>
                    <span>
                      {appointment.doctorName} · {appointment.date} · {appointment.time}
                    </span>
                  </div>
                  <span className="pill">{appointment.status}</span>
                </div>
              ))
            ) : (
              <p>{appointments.loading ? "Loading appointments..." : "No appointments booked yet."}</p>
            )}
          </div>
        </article>
      </section>
    </div>
  );
}

export default Appointments;
