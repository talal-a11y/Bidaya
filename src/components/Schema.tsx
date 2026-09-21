import type { Page } from "@/lib/content";
import { getGlobal, inlineToText } from "@/lib/content";
import { siteUrl } from "@/lib/site";

// Schema per deck §13: Organization on About; FAQPage on How we work, Where you stand
// and each intent page; Service on each intent page with the published floor, monthly.
export default function Schema({ page }: { page: Page }) {
  const g = getGlobal();
  const base = siteUrl();
  const graphs: Record<string, unknown>[] = [];

  if (page.organizationSchema) {
    graphs.push({
      "@type": "Organization",
      name: g.siteName,
      alternateName: g.alternateName,
      url: base,
      logo: `${base}/brand/png/mark/bidaya-mark-512.png`,
      areaServed: g.areaServed,
      founder: { "@type": "Person", name: g.founder },
    });
  }

  if (page.faqSchema) {
    const faqs = page.sections.flatMap((s) => s.blocks).filter((b) => b.type === "faq");
    const items = faqs.flatMap((f) => (f.type === "faq" ? f.items : [])).map((it) => ({
      "@type": "Question",
      name: inlineToText(it.lead),
      acceptedAnswer: { "@type": "Answer", text: inlineToText(it.rest) },
    }));
    if (items.length) graphs.push({ "@type": "FAQPage", mainEntity: items });
  }

  if (page.serviceSchema) {
    graphs.push({
      "@type": "Service",
      name: page.serviceName ?? page.intent,
      serviceType: page.intent,
      provider: { "@type": "Organization", name: g.siteName },
      areaServed: g.areaServed,
      url: `${base}${page.route}`,
      offers: {
        "@type": "Offer",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: 12000,
          priceCurrency: "AED",
          unitText: "month",
          description: "Monthly engagements from AED 12,000",
        },
      },
    });
  }

  if (!graphs.length) return null;
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graphs });
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
