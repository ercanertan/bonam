import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import { Loader } from "@/components/motion/loader";
import { ScrollController } from "@/components/motion/scroll-controller";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/content/site";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} | Automatic Driving Lessons in North London`,
    template: `%s | ${site.name}`,
  },
  description:
    "Patient, one-to-one automatic driving lessons in North London for learners of all abilities, especially nervous drivers. Barnet, Tottenham, Wood Green and Enfield.",
};

// Runs before first paint: skip the intro if it already played this session.
const introScript = `try{if(sessionStorage.getItem('bonam-intro'))document.documentElement.classList.add('intro-seen')}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      suppressHydrationWarning
      className={`no-js ${anton.variable} ${inter.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body className="flex min-h-svh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-20 focus:z-[60] focus:rounded-button focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <ScrollController />
        <Loader />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
