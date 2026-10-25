import { AppShell } from "../components/app-shell";
import "./globals.css";

export const metadata = {
  title: {
    default: "HIMSSON | School operating platform",
    template: "%s | HIMSSON",
  },
  description: "HIMSSON application foundation. Navigation and sign-in preview only.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }) {
  return (
    <html lang="sw">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
