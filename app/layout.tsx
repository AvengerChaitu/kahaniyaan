import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Pacifico, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import ClientNav from "@/components/ClientNav";
import "./globals.css";

const pacifico = Pacifico({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dadima.app"),
  title: {
    default: "Dadima — Personalized Indian Bedtime Stories for Kids",
    template: "%s | Dadima",
  },
  description:
    "AI-powered bedtime stories personalized for your child in Hindi, Telugu, Tamil, Kannada, Malayalam and 6 more Indian languages. Based on Panchatantra, Birbal, Tenali Raman and more.",
  keywords: [
    "Indian bedtime stories", "Hindi stories for kids", "Telugu stories", "Tamil stories",
    "Panchatantra stories", "Birbal stories", "kids stories", "bedtime stories India",
    "personalized children stories", "AI stories",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://dadima.app",
    siteName: "Dadima",
    title: "Dadima — Personalized Indian Bedtime Stories for Kids",
    description:
      "Generate personalized bedtime stories for your child in Hindi, Telugu, Tamil and 7 more Indian languages.",
    images: [
      {
        url: "/dadima/hero-grandma-reading.png",
        width: 1200,
        height: 630,
        alt: "Dadima — Indian grandmother telling stories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dadima — Personalized Indian Bedtime Stories",
    description: "AI bedtime stories for kids in 10 Indian languages.",
    images: ["/dadima/hero-grandma-reading.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${pacifico.variable} ${plusJakarta.variable}`}>
      <body style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", background: "#FFFBF6" }}>
        <ClerkProvider>
          <ClientNav />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Analytics />
        </ClerkProvider>
      </body>
    </html>
  );
}
