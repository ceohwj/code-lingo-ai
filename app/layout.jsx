import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const siteUrl = "https://code-lingo-ai.vercel.app";
const siteDescription = "Practice Python, SQL, data analysis, AI, and bioinformatics with short daily quizzes, instant explanations, XP, streaks, and adaptive review.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CodeLingo AI | Daily Coding Microlearning",
    template: "%s | CodeLingo AI"
  },
  description: siteDescription,
  applicationName: "CodeLingo AI",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "CodeLingo AI | Daily Coding Microlearning",
    description: siteDescription,
    url: "/",
    siteName: "CodeLingo AI",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "CodeLingo AI | Daily Coding Microlearning",
    description: siteDescription
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
