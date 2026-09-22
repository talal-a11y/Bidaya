import { notFound } from "next/navigation";
import Link from "next/link";
import { getGlobal, getNotes, getPageByRoute, getPages, getReports } from "@/lib/content";
import { pageMetadata } from "@/lib/meta";
import PageShell from "@/components/PageShell";
import PageB from "@/directions/b/PageB";
import AudienceB from "@/directions/b/AudienceB";
import HeaderB from "@/directions/b/HeaderB";
import FooterB from "@/directions/b/FooterB";
import Schema from "@/components/Schema";
import styles from "./page.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPages().filter((p) => p.route !== "/").map((p) => ({ slug: p.route.slice(1) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPageByRoute(`/${slug}`);
  return page ? pageMetadata(page) : {};
}

// Reports and notes: the list replaces the launch-state paragraph once a file exists in
// content/reports/ or content/notes/. Template per the deck: number · title · month year · one line · Read.
function EntryList() {
  const g = getGlobal();
  const reports = getReports();
  const notes = getNotes();
  if (!reports.length && !notes.length) return null;
  const month = (d: string) => new Date(d).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  return (
    <section className={`wrap ${styles.entries}`}>
      <ul>
        {[...reports, ...notes].map((e) => (
          <li key={e.slug}>
            <p>
              {e.number && <strong>Report {e.number}</strong>}
              {e.number && " · "}
              <Link href={`/papers/${e.slug}`}>{e.title}</Link>
              {" · "}<time dateTime={e.date}>{month(e.date)}</time>
              {" · "}{e.summary}{" "}
              <Link href={`/papers/${e.slug}`} className="btn btn-text">{g.fields.reportsListRead}</Link>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPageByRoute(`/${slug}`);
  if (!page) notFound();
  if (page.route !== "/start" && !page.hidden) {
    return (
      <>
        <Schema page={page} />
        <HeaderB current={page.route} />
        <main id="main" tabIndex={-1}>{page.audience ? <AudienceB page={page} /> : <PageB page={page} />}</main>
        <FooterB />
      </>
    );
  }
  return (
    <PageShell page={page}>
      {page.route === "/papers" && <EntryList />}
    </PageShell>
  );
}
