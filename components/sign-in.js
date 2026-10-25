"use client";

import { useLanguage } from "./app-shell";

export function SignIn() {
  const { copy } = useLanguage();

  return (
    <div className="welcome-layout">
      <section className="welcome-copy" aria-labelledby="welcome-heading">
        <span className="preview-badge"><span className="status-dot" aria-hidden="true" />{copy.preview}</span>
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1 id="welcome-heading">{copy.headline}</h1>
        <p className="intro">{copy.intro}</p>
        <div className="foundation-note">
          <span className="foundation-symbol" aria-hidden="true">↗</span>
          <div><h2>{copy.scopeTitle}</h2><p>{copy.scopeText}</p></div>
        </div>
      </section>

      <section className="sign-in-card" aria-labelledby="sign-in-heading">
        <span className="card-icon" aria-hidden="true">↳</span>
        <h2 id="sign-in-heading">{copy.signIn}</h2>
        <p className="card-intro">{copy.signInIntro}</p>
        <form onSubmit={(event) => event.preventDefault()} aria-describedby="auth-dependency">
          <fieldset disabled>
            <legend className="sr-only">{copy.unavailable}</legend>
            <label htmlFor="email">{copy.email}</label>
            <input id="email" type="email" autoComplete="username" placeholder="—" />
            <label htmlFor="password">{copy.password}</label>
            <input id="password" type="password" autoComplete="current-password" placeholder="—" />
            <button className="sign-in-button" type="submit">{copy.unavailable}<span aria-hidden="true">→</span></button>
          </fieldset>
        </form>
        <div id="auth-dependency" className="dependency-notice" role="note">
          <span className="notice-symbol" aria-hidden="true">i</span>
          <div><h3>{copy.authTitle}</h3><p>{copy.authText}</p></div>
        </div>
        <p className="sign-in-footnote">{copy.signInFootnote}</p>
      </section>
    </div>
  );
}
