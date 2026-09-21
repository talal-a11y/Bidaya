import { notFound } from "next/navigation";
import { getNotes, getReports } from "@/lib/content";
import { siteUrl } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Sections } from "@/components/Blocks";

// Article template for reports and notes — Article schema with dates (deck §13).
// No entries exist at launch; this route builds nothing until a file appears.
export const dynamicParams = false;

const all = () => [...getReports(), ...getNotes()];

export function generateStaticParams() {
  return all().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = all().find((x) => x.slug === slug);
  return e ? { title: `${e.title} — Bidaya`, description: e.summary, alternates: { canonical: `/papers/${slug}` } } : {};
}

export default async function Entry({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = all().find((x) => x.slug === slug);
  if (!e) notFound();
  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: e.title,
    datePublished: e.date,
    dateModified: e.date,
    author: { "@type": "Organization", name: "Bidaya" },
    publisher: { "@type": "Organization", name: "Bidaya" },
    mainEntityOfPage: `${siteUrl()}/papers/${slug}`,
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
      <Header current="/papers" />
      <main id="main" tabIndex={-1}>
        <article>
          <section className="wrap">
            <h1>{e.title}</h1>
            <p><time dateTime={e.date}>{e.date}</time></p>
          </section>
          <Sections sections={e.sections} />
          {e.sources.length > 0 && (
            <section className="wrap">
              <ul>{e.sources.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
