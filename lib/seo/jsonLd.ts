import { brand } from "@/config/brand";
import type { CaseStudy, Service } from "@/lib/payload/queries";

const baseUrl = brand.url.replace(/\/$/, "");

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    legalName: brand.legalName,
    url: baseUrl,
    description: brand.description,
    email: brand.email,
    telephone: brand.phone,
    address: {
      "@type": "PostalAddress",
      addressCountry: "GB",
    },
    sameAs: Object.values(brand.social).filter(Boolean),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.name,
    url: baseUrl,
    description: brand.description,
    publisher: {
      "@type": "Organization",
      name: brand.legalName,
    },
  };
}

export function breadcrumbJsonLd(crumbs: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: c.name,
      item: `${baseUrl}${c.href}`,
    })),
  };
}

export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    url: `${baseUrl}/services/${service.slug}`,
    provider: {
      "@type": "Organization",
      name: brand.name,
      url: baseUrl,
    },
  };
}

export function caseStudyJsonLd(cs: CaseStudy) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.title,
    description: cs.summary,
    url: `${baseUrl}/work/${cs.slug}`,
    datePublished: cs.publishedAt,
    author: {
      "@type": "Organization",
      name: brand.name,
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: brand.legalName,
    },
    about: cs.client,
  };
}
