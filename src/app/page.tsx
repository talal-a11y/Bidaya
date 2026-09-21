import { notFound } from "next/navigation";
import { getPageByRoute } from "@/lib/content";
import { pageMetadata } from "@/lib/meta";
import Schema from "@/components/Schema";
import HeaderB from "@/directions/b/HeaderB";
import FooterB from "@/directions/b/FooterB";
import HomeB from "@/directions/b/HomeB";

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
      <HeaderB current="/" />
      <main id="main" tabIndex={-1}><HomeB page={page} /></main>
      <FooterB />
    </>
  );
}
