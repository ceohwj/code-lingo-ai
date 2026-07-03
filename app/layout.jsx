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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" }
    ],
    shortcut: "/favicon.ico"
  },
  openGraph: {
    title: "CodeLingo AI | Daily Coding Microlearning",
    description: siteDescription,
    url: "/",
    siteName: "CodeLingo AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CodeLingo AI dashboard with daily mission and learning paths"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeLingo AI | Daily Coding Microlearning",
    description: siteDescription,
    images: [
      {
        url: "/og-image.png",
        alt: "CodeLingo AI dashboard with daily mission and learning paths"
      }
    ]
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
