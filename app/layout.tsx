import type { Metadata } from "next";
import { Playfair_Display, Inter, Josefin_Sans, Orbitron } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const josefin = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Happy Birthday ✦ A Gift From The Knave",
  description:
    "An interactive birthday experience inspired by Arlecchino from Genshin Impact. Complete the trials to unlock your gift.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${playfair.variable} ${inter.variable} ${josefin.variable} ${orbitron.variable} antialiased bg-charcoal-deep text-bone overflow-hidden`}
      >
        <Preloader />
        {children}
      </body>
    </html>
  );
}
