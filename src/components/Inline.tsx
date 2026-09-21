import Link from "next/link";
import type { Inline } from "@/lib/content";

export function InlineNodes({ nodes }: { nodes: Inline[] }) {
  return (
    <>
      {nodes.map((n, i) => {
        switch (n.kind) {
          case "text": return <span key={i}>{n.text}</span>;
          case "strong": return <strong key={i}><InlineNodes nodes={n.children} /></strong>;
          case "em": return <em key={i}><InlineNodes nodes={n.children} /></em>;
          case "link": return <Link key={i} href={n.href}><InlineNodes nodes={n.children} /></Link>;
        }
      })}
    </>
  );
}
