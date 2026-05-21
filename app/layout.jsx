import "./globals.css";

export const metadata = {
  title: "CodeLingo AI",
  description: "Duolingo-style microlearning for Python, SQL, data, machine learning, and AI."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
