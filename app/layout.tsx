import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Institute of Practical Business Management | IPBM",
  description:
    "IPBM – India's leading institute for practical business management education. Transform your career with industry-aligned programs, expert mentors, and real-world training.",
  keywords:
    "business management institute, MBA, practical business education, management courses, IPBM",
  openGraph: {
    title: "Institute of Practical Business Management",
    description:
      "Transform your career with industry-aligned programs and expert mentors.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-cream">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-cream font-body antialiased">{children}</body>
    </html>
  );
}
