import { notFound } from "next/navigation";
import { getPageByRoute } from "@/lib/content";
import { pageMetadata } from "@/lib/meta";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Schema from "@/components/Schema";
import Hero from "@/components/Hero";
import WorldCanvas from "@/components/WorldCanvas";
import { Sections } from "@/components/Blocks";

export function generateMetadata() {
  const page = getPageByRoute("/");
  return page ? pageMetadata(page) : {};
}

export default function Home() {
  const page = getPageByRoute("/");
  if (!page) notFound();
  const [hero, ...rest] = page.sections;
  return (
    <>
      <Schema page={page} />
      <WorldCanvas />
      <div className="page">
        <Header current="/" />
        <main id="main" tabIndex={-1}>
          <Hero blocks={hero.blocks} />
          <Sections sections={rest} />
        </main>
        <Footer />
      </div>
    </>
  );
}
