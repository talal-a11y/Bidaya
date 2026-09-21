import { notFound } from "next/navigation";
import { getPageByRoute } from "@/lib/content";
import { pageMetadata } from "@/lib/meta";
import PageShell from "@/components/PageShell";

export function generateMetadata() {
  const page = getPageByRoute("/");
  return page ? pageMetadata(page) : {};
}

export default function Home() {
  const page = getPageByRoute("/");
  if (!page) notFound();
  return <PageShell page={page} />;
}
