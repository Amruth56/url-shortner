import "./globals.css";
import Header from "../components/Header";

export const metadata = {
  title: "TinyLink",
  description: "A minimal URL shortener built with Next.js + MongoDB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <Header />
        <main className="max-w-5xl mx-auto py-8 px-4">
          {children}
        </main>
      </body>
    </html>
  );
}
