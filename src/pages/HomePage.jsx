import React from "react";
import { Link } from "react-router-dom";

const featureCards = [
  {
    title: "Patient Registration",
    text: "Register patients quickly and keep every intake detail organized in one place.",
  },
  {
    title: "Doctor Management",
    text: "Track doctors, specializations, and availability for smoother hospital coordination.",
  },
  {
    title: "Appointment Scheduling",
    text: "Book consultations with clean workflows that work well on desktop and mobile.",
  },
  {
    title: "Centralized Records",
    text: "Maintain a single source of truth for patient notes, care updates, and admin insights.",
  },
];

const highlights = [
  "Responsive landing experience for patients and staff",
  "Simple admin login flow for quick demos",
  "Live dashboard, patient, doctor, and appointment screens",
];

function HomePage() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Modern Medical Platform</span>
          <h1>Manage patients, doctors, and appointments from one responsive system.</h1>
          <p>
            This hospital management website turns the project brief into a working digital
            portal with a polished landing page, admin dashboard, and connected management
            views for day-to-day coordination.
          </p>
          <div className="hero-actions">
            <Link to="/dashboard" className="primary-button">
              Open Dashboard
            </Link>
            <Link to="/login" className="secondary-button">
              Admin Login
            </Link>
          </div>
          <ul className="highlight-list">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="hero-panel">
          <div className="hero-panel-top">
            <span>Today&apos;s Overview</span>
            <strong>Smart hospital operations</strong>
          </div>
          <div className="hero-grid">
            <article>
              <strong>120+</strong>
              <span>Patient records</span>
            </article>
            <article>
              <strong>24/7</strong>
              <span>Care coordination</span>
            </article>
            <article>
              <strong>18</strong>
              <span>Specialists on board</span>
            </article>
            <article>
              <strong>94%</strong>
              <span>Scheduling efficiency</span>
            </article>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <span className="eyebrow">Core Features</span>
          <h2>Built around the hospital management project topic</h2>
          <p>
            The website focuses on the key workflows described in the project: registration,
            storage of patient details, doctor handling, and appointment booking.
          </p>
        </div>
        <div className="feature-grid">
          {featureCards.map((card) => (
            <article key={card.title} className="feature-card">
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block cta-strip">
        <div>
          <span className="eyebrow">Quick Access</span>
          <h2>Ready to explore the operational screens?</h2>
          <p>Use the dashboard to review records or jump straight into appointment booking.</p>
        </div>
        <Link to="/appointments" className="primary-button">
          Schedule Appointment
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
