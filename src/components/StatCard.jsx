import React from "react";
function StatCard({ label, value, tone = "blue" }) {
  return (
    <article className={`stat-card stat-${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

export default StatCard;
