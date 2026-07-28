import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SYNAPSE SOCIETY — AI Innovation Sprint",
  description:
    "Official technical society of the CSE Department. M.Tech Orientation — AI Innovation Sprint. Learn. Build. Innovate. Grow.",
  keywords: [
    "Synapse Society",
    "AI Innovation Sprint",
    "CSE Department",
    "M.Tech Orientation",
    "Hackathon",
  ],
  authors: [{ name: "Synapse Society" }],
  openGraph: {
    title: "SYNAPSE SOCIETY — AI Innovation Sprint",
    description:
      "Enter the Synapse OS. M.Tech Orientation AI Innovation Sprint.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-bg-primary text-text-primary font-body antialiased overflow-x-hidden">
        {/* Scan Line Overlay */}
        <div className="scan-line-overlay" />
        {children}
      </body>
    </html>
  );
}
