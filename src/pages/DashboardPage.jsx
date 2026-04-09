import React from "react";
import PageIntro from "../components/PageIntro";
import StatCard from "../components/StatCard";
import StatusBanner from "../components/StatusBanner";
import useHospitalData from "../hooks/useHospitalData";

function DashboardPage() {
  const patients = useHospitalData("/patients");
  const doctors = useHospitalData("/doctors");
  const appointments = useHospitalData("/appointments");

  const recentAppointments = appointments.data.slice(0, 3);
  const combinedError = patients.error || doctors.error || appointments.error;

  return (
    <div className="dashboard-page">
      <PageIntro
        eyebrow="Control Center"
        title="Hospital dashboard"
        description="Track registrations, doctor availability, and appointment activity from a single responsive workspace."
      />

      <StatusBanner type="error" message={combinedError} />

      <section className="stats-grid">
        <StatCard label="Patients" value={patients.loading ? "..." : patients.data.length} />
        <StatCard label="Doctors" value={doctors.loading ? "..." : doctors.data.length} tone="teal" />
        <StatCard
          label="Appointments"
          value={appointments.loading ? "..." : appointments.data.length}
          tone="green"
        />
      </section>

      <section className="content-grid">
        <article className="panel-card">
          <div className="panel-head">
            <h2>Recent appointments</h2>
            <span>Live operational activity</span>
          </div>
          {appointments.loading ? (
            <p>Loading appointments...</p>
          ) : recentAppointments.length ? (
            <div className="list-stack">
              {recentAppointments.map((appointment) => (
                <div key={appointment.id} className="list-item">
                  <div>
                    <strong>{appointment.patientName}</strong>
                    <span>
                      {appointment.doctorName} · {appointment.date} at {appointment.time}
                    </span>
                  </div>
                  <span className="pill">{appointment.status}</span>
                </div>
              ))}
            </div>
          ) : (
            <p>No appointments scheduled yet.</p>
          )}
        </article>

        <article className="panel-card">
          <div className="panel-head">
            <h2>Platform summary</h2>
            <span>Hospital management focus areas</span>
          </div>
          <div className="summary-list">
            <div>
              <strong>Patient records</strong>
              <p>Capture age, contact, condition, and care notes with a compact registration flow.</p>
            </div>
            <div>
              <strong>Doctor directory</strong>
              <p>Maintain provider details, specialization, and availability in one place.</p>
            </div>
            <div>
              <strong>Appointment pipeline</strong>
              <p>Schedule consultations with simple, mobile-friendly forms and status tracking.</p>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}

export default DashboardPage;
