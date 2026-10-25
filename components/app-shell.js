"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { domains, messages } from "../lib/content.mjs";

const LanguageContext = createContext(null);

export function useLanguage() {
  return useContext(LanguageContext);
}

export function AppShell({ children }) {
  const pathname = usePathname();
  const [language, setLanguage] = useState("sw");
  const [menuOpen, setMenuOpen] = useState(false);
  const copy = messages[language];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, copy }}>
      <a className="skip-link" href="#main-content">{copy.skip}</a>
      <div className="app-shell">
        <aside className="sidebar">
          <Link className="brand" href="/" onClick={() => setMenuOpen(false)} aria-label="HIMSSON">
            <span className="brand-mark" aria-hidden="true">H<span /></span>
            <span className="brand-name">HIMSSON<small>{copy.product}</small></span>
          </Link>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="domain-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span aria-hidden="true">☰</span> {copy.menu}
          </button>
          <nav id="domain-navigation" className={`domain-navigation ${menuOpen ? "is-open" : ""}`} aria-label={copy.navigation}>
            <p className="nav-label">{copy.navigation}</p>
            <Link className={`nav-link home-link ${pathname === "/" ? "is-active" : ""}`} href="/" aria-current={pathname === "/" ? "page" : undefined} onClick={() => setMenuOpen(false)}>
              <span className="nav-home-icon" aria-hidden="true">⌂</span><span>{copy.home}</span>
            </Link>
            <div className="nav-divider" />
            {domains.map((domain) => {
              const href = `/domains/${domain.id}`;
              const active = pathname === href;
              return (
                <Link key={domain.id} className={`nav-link ${active ? "is-active" : ""}`} href={href} aria-current={active ? "page" : undefined} onClick={() => setMenuOpen(false)}>
                  <span className="nav-number" aria-hidden="true">{domain.number}</span>
                  <span>{domain.name[language]}</span>
                </Link>
              );
            })}
          </nav>
          <div className="sidebar-note">
            <span className="status-dot" aria-hidden="true" />
            <div><strong>{copy.preview}</strong><span>{copy.noData}</span></div>
          </div>
          <p className="sidebar-footer">{copy.footer}</p>
        </aside>

        <div className="workspace">
          <header className="topbar">
            <div className="school-context" aria-label={copy.schoolLabel}>
              <span className="school-icon" aria-hidden="true">⌂</span>
              <div><span className="organization-label">{copy.organization}</span><strong>{copy.school}</strong></div>
              <span className="context-lock" title={copy.schoolDependency} aria-hidden="true">—</span>
            </div>
            <div className="header-actions">
              <button className="language-button" type="button" aria-label={copy.switchLanguage} onClick={() => setLanguage(language === "sw" ? "en" : "sw")}>
                <span aria-hidden="true">◎</span> {language === "sw" ? "English" : "Kiswahili"}
              </button>
              <span className="signed-out"><span className="account-dot" aria-hidden="true" />{copy.signedOut}</span>
            </div>
          </header>
          <main id="main-content" className="main-content" tabIndex={-1}>{children}</main>
          <footer className="workspace-footer"><span>{copy.footer}</span><span>{copy.foundation}</span></footer>
        </div>
      </div>
    </LanguageContext.Provider>
  );
}
