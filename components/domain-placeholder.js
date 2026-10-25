"use client";

import Link from "next/link";
import { domains } from "../lib/content.mjs";
import { useLanguage } from "./app-shell";

export function DomainPlaceholder({ domainId }) {
  const { language, copy } = useLanguage();
  const domain = domains.find((entry) => entry.id === domainId);

  return (
    <section className="domain-page" aria-labelledby="domain-heading">
      <div className="domain-breadcrumb">{copy.domainLabel} {domain.number}<span>/</span>{copy.placeholder}</div>
      <h1 id="domain-heading">{domain.name[language]}</h1>
      <div className="placeholder-card">
        <span className="placeholder-number" aria-hidden="true">{domain.number}</span>
        <span className="preview-badge">{copy.placeholder}</span>
        <h2>{copy.placeholderTitle}</h2>
        <p>{copy.placeholderText}</p>
        <div className="foundation-note">
          <div><h3>{copy.dependencyTitle}</h3><p>{copy.dependencyText}</p></div>
        </div>
        <Link className="back-link" href="/">← {copy.back}</Link>
      </div>
    </section>
  );
}
