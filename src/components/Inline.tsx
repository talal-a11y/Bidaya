import Link from "next/link";
import type { Inline } from "@/lib/content";

// Arabic runs inside Latin copy are set in a face that carries Arabic (Readex Pro),
// bolder and a little larger, so بداية never falls back to a broken system glyph.
const AR = /([؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿][؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿\s]*[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]|[؀-ۿ])/g;

function Text({ text }: { text: string }) {
  const parts = text.split(AR);
  return <>{parts.map((p, i) => (i % 2 === 1 ? <span key={i} lang="ar" className="ar">{p}</span> : p))}</>;
}

export function InlineNodes({ nodes }: { nodes: Inline[] }) {
  return (
    <>
      {nodes.map((n, i) => {
        switch (n.kind) {
          case "text": return <span key={i}><Text text={n.text} /></span>;
          case "strong": return <strong key={i}><InlineNodes nodes={n.children} /></strong>;
          case "em": return <em key={i}><InlineNodes nodes={n.children} /></em>;
          case "link": return <Link key={i} href={n.href}><InlineNodes nodes={n.children} /></Link>;
        }
      })}
    </>
  );
}
