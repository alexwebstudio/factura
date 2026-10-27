import type { Metadata, Viewport } from "next";
import { CustomScrollbar } from "@/components/layout/CustomScrollbar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Preloader } from "@/components/layout/Preloader";
import { preloaderScript } from "@/lib/preloader";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { LeadModalProvider } from "@/components/forms/LeadModal";
import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/content/site";
import { pages } from "@/content/pages";
import { fontVariables } from "@/lib/fonts";
import { organizationJsonLd } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: pages.home.title, template: `%s — ${site.name}` },
  description: pages.home.description,
  applicationName: site.name,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: { locale: "ru_RU", siteName: site.name, type: "website" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

export const viewport: Viewport = {
  themeColor: "#E9E6DF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Включает начальные состояния reveal-анимаций и прелоадер (раз за сессию) только при работающем JS */}
        <script dangerouslySetInnerHTML={{ __html: preloaderScript }} />
      </head>
      <body>
        <Preloader />
        <a
          href="#content"
          className="fixed left-4 top-4 z-[200] -translate-y-24 rounded-full bg-espresso px-5 py-3 text-[15px] font-medium text-on-dark transition-transform focus:translate-y-0"
        >
          Перейти к содержимому
        </a>
        <SmoothScroll>
          <LeadModalProvider>
            <Header />
            <CustomScrollbar />
            <div id="page-root">
              <main id="content" tabIndex={-1} className="outline-none">
                {children}
              </main>
              <Footer />
            </div>
          </LeadModalProvider>
        </SmoothScroll>
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
