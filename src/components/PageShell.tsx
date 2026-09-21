import type { Page } from "@/lib/content";
import Header from "@/directions/c/HeaderC";
import Footer from "@/directions/c/FooterC";
import Schema from "./Schema";
import { Sections } from "./Blocks";

export default function PageShell({ page, children }: { page: Page; children?: React.ReactNode }) {
  return (
    <>
      <Schema page={page} />
      <Header current={page.route} />
      <main id="main" tabIndex={-1}>
        <Sections sections={page.sections} />
        {children}
      </main>
      <Footer />
    </>
  );
}
