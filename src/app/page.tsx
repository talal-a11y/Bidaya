import { notFound } from "next/navigation";
import { getPageByRoute } from "@/lib/content";
import { pageMetadata } from "@/lib/meta";
import Schema from "@/components/Schema";
import HeaderA from "@/directions/a/HeaderA";
import FooterA from "@/directions/a/FooterA";
import HomeA from "@/directions/a/HomeA";

export function generateMetadata() {
  const page = getPageByRoute("/");
  return page ? pageMetadata(page) : {};
}

export default function Home() {
  const page = getPageByRoute("/");
  if (!page) notFound();
  return (
    <>
      <Schema page={page} />
      <HeaderA current="/" />
      <main id="main" tabIndex={-1}><HomeA page={page} /></main>
      <FooterA />
    </>
  );
}
