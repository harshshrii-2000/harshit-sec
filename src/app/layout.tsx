import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harshit Shrivastav | Cyber Security Student & Ethical Hacking Enthusiast",
  description: "Portfolio of Harshit Shrivastav – B.Tech CSE (Cyber Security) student at Galgotias University. Specialized in Web Security, Ethical Hacking, Digital Forensics, OSINT and Network Security.",
  keywords: ["Harshit Shrivastav", "Cyber Security", "Ethical Hacking", "Digital Forensics", "OSINT", "Galgotias University", "Portfolio"],
  authors: [{ name: "Harshit Shrivastav" }],
  openGraph: {
    title: "Harshit Shrivastav | Cyber Security Portfolio",
    description: "Passionate about securing digital systems, exploring vulnerabilities, and building safer technologies.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
