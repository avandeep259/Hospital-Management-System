import React from "react";
function PageIntro({ eyebrow, title, description }) {
  return (
    <section className="page-intro">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}

export default PageIntro;
