import { notFound } from "next/navigation";
import { getPageByRoute } from "@/lib/content";
import { pageMetadata } from "@/lib/meta";
import Schema from "@/components/Schema";
import HeaderC from "@/directions/c/HeaderC";
import FooterC from "@/directions/c/FooterC";
import HomeC from "@/directions/c/HomeC";

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
      <HeaderC current="/" />
      <main id="main" tabIndex={-1}><HomeC page={page} /></main>
      <FooterC />
    </>
  );
}
