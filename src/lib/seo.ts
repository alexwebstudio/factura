import type { Metadata } from "next";
import { site } from "@/content/site";
import { faq } from "@/content/faq";

const OG_DEFAULT = { url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name} — ${site.slogan}` };

type MetaInput = {
  title: string;
  description: string;
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
  type?: "website" | "article";
  noindex?: boolean;
};

export function buildMetadata({ title, description, path, image, type = "website", noindex }: MetaInput): Metadata {
  const img = image ?? OG_DEFAULT;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "ru_RU",
      siteName: site.name,
      url: path,
      title,
      description,
      images: [img],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: img.url, alt: img.alt }],
    },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  };
}

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

export function organizationJsonLd() {
  const org = {
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/icon.svg"),
    slogan: site.slogan,
    email: site.contacts.email,
    telephone: site.contacts.phone,
    sameAs: [site.contacts.telegram, site.contacts.instagram],
  };
  const business = {
    "@type": "HomeAndConstructionBusiness",
    "@id": absoluteUrl("/#business"),
    name: `${site.name} · ${site.descriptor}`,
    url: site.url,
    image: absoluteUrl("/opengraph-image"),
    description: site.description,
    telephone: site.contacts.phone,
    email: site.contacts.email,
    areaServed: site.regions,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contacts.address,
      addressLocality: site.city,
      addressCountry: "KZ",
    },
    parentOrganization: { "@id": absoluteUrl("/#organization") },
  };
  return { "@context": "https://schema.org", "@graph": [org, business] };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
