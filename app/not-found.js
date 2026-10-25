import Link from "next/link";

export default function NotFound() {
  return (
    <section className="domain-page">
      <p className="eyebrow">404</p>
      <h1>Ukurasa haujapatikana</h1>
      <p lang="en">This page does not exist in the application skeleton.</p>
      <Link className="back-link" href="/">Rudi mwanzo / Back to home</Link>
    </section>
  );
}
