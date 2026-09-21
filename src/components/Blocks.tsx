import Link from "next/link";
import type { Block, Button, FormField, Inline, Item, Section } from "@/lib/content";
import { getGlobal } from "@/lib/content";
import styles from "./Blocks.module.css";

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

function ButtonLink({ b }: { b: Button }) {
  const cls = b.style === "cta" ? "btn btn-cta" : b.style === "ghost" ? "btn btn-ghost" : "btn btn-text";
  return <Link href={b.href} className={cls}>{b.label}</Link>;
}

function ItemLead({ item }: { item: Item }) {
  return (
    <p>
      {item.lead.length > 0 && <><strong><InlineNodes nodes={item.lead} /></strong> </>}
      <InlineNodes nodes={item.rest} />
    </p>
  );
}

function Form({ fields, submit }: { fields: FormField[]; submit: string }) {
  const g = getGlobal();
  const contact = fields.filter((f) => f.type === "text" || f.type === "email" || f.type === "tel");
  const rest = fields.filter((f) => !contact.includes(f));
  const render = (f: FormField) => {
    if (f.type === "radio") {
      return (
        <fieldset key={f.name} className={styles.fieldset}>
          <legend className={styles.legend}>{f.label}</legend>
          {f.options.map((o, i) => (
            <label key={i} className={styles.choice}>
              <input type="radio" name={f.name} value={o} />
              <span>{o}</span>
            </label>
          ))}
          {f.hint && <p className={styles.hint}><InlineNodes nodes={f.hint} /></p>}
        </fieldset>
      );
    }
    if (f.type === "consent") {
      return (
        <label key={f.name} className={`${styles.choice} ${styles.consent}`}>
          <input type="checkbox" name={f.name} required />
          <span>{f.label}</span>
        </label>
      );
    }
    const id = `f-${f.name}`;
    const hintId = f.hint ? `${id}-hint` : undefined;
    return (
      <label key={f.name} htmlFor={id} className={styles.label}>
        <span>
          {f.label}
          {f.optional && <span className={styles.optional}> ({g.fields.optional})</span>}
        </span>
        {f.hint && <span id={hintId} className={styles.hint}><InlineNodes nodes={f.hint} /></span>}
        {f.type === "textarea" ? (
          <textarea id={id} name={f.name} className={styles.input} aria-describedby={hintId} maxLength={400} />
        ) : (
          <input id={id} name={f.name} type={f.type} className={styles.input} required={!f.optional} autoComplete={f.type === "email" ? "email" : f.type === "tel" ? "tel" : f.name === "your-name" ? "name" : f.name === "company" ? "organization" : undefined} />
        )}
      </label>
    );
  };
  // Milestone 1: the form is built, not wired. It posts nowhere and the button says so (milestone 6 wires it).
  return (
    <form className={styles.form} method="post" action="/start" onSubmit={undefined}>
      {rest.filter((f) => f.type !== "consent").map(render)}
      <div className={styles.contact}>{contact.map(render)}</div>
      {rest.filter((f) => f.type === "consent").map(render)}
      <div>
        <button type="submit" className="btn btn-cta" disabled aria-disabled="true" aria-describedby="send-state">{submit}</button>
        <p id="send-state" className={styles.hint}>{g.fields.formNotWired}</p>
      </div>
    </form>
  );
}

function BlockView({ b, hero }: { b: Block; hero: boolean }) {
  switch (b.type) {
    case "h1": return <h1 className={`${styles.h1} ${hero ? styles.display : ""}`}><InlineNodes nodes={b.text} /></h1>;
    case "h2": return <h2 id={b.id} className={styles.h2}><InlineNodes nodes={b.text} /></h2>;
    case "h3": return <h3 className={styles.h3}><InlineNodes nodes={b.text} /></h3>;
    case "tagline": return <p className={styles.tagline}><InlineNodes nodes={b.text} /></p>;
    case "lead": return <p className={styles.lead}><InlineNodes nodes={b.text} /></p>;
    case "aside": return <p className={styles.aside}><InlineNodes nodes={b.text} /></p>;
    case "p": return <p className={styles.p}><InlineNodes nodes={b.text} /></p>;
    case "list": return <ul className={styles.list}>{b.items.map((it, i) => <li key={i}><InlineNodes nodes={it} /></li>)}</ul>;
    case "buttons": return <div className={styles.buttons}>{b.buttons.map((x, i) => <ButtonLink key={i} b={x} />)}</div>;
    case "inline": return <ul className={styles.inline}>{b.links.map((x, i) => <li key={i}><Link href={x.href}>{x.label}</Link></li>)}</ul>;
    case "rows": return <ul className={styles.rows}>{b.items.map((it, i) => <li key={i}><ItemLead item={it} /></li>)}</ul>;
    case "terms": return <ul className={styles.terms}>{b.items.map((it, i) => <li key={i}><strong><InlineNodes nodes={it.lead} /></strong><p><InlineNodes nodes={it.rest} /></p></li>)}</ul>;
    case "faq": return (
      <ul className={styles.faq}>
        {b.items.map((it, i) => (
          <li key={i}>
            <h3><InlineNodes nodes={it.lead} /></h3>
            <p><InlineNodes nodes={it.rest} /></p>
          </li>
        ))}
      </ul>
    );
    case "example": return (
      <div className={styles.example}>
        <p className={styles.intro}><InlineNodes nodes={b.intro} /></p>
        <ul>{b.items.map((it, i) => <li key={i}><ItemLead item={it} /></li>)}</ul>
      </div>
    );
    case "quiet": return <ul className={styles.quiet}>{b.items.map((it, i) => <li key={i}><InlineNodes nodes={it} /></li>)}</ul>;
    case "form": return <Form fields={b.fields} submit={b.submit} />;
  }
}

export function Sections({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((s, i) => {
        const hero = i === 0;
        const cls = s.band ? `${styles.band} band band-${s.band}` : hero ? `${styles.section} ${styles.hero}` : styles.section;
        const inner = s.blocks.map((b, j) => <BlockView key={j} b={b} hero={hero} />);
        return s.band ? (
          <section key={i} className="wrap"><div className={cls}><div className="wrap">{inner}</div></div></section>
        ) : (
          <section key={i} className={`wrap ${cls}`}>{inner}</section>
        );
      })}
    </>
  );
}
