// The form behind a door, as a grid: one question per row, the choices as tiles that fill
// when chosen, the contact fields underlined. Fields come from content/pages/start.md.
// Not wired until milestone 8 — the Send button says so beneath it.
import type { FormField } from "@/lib/content";
import { getGlobal, getPageByRoute } from "@/lib/content";
import { InlineNodes } from "@/components/Inline";
import styles from "./b.module.css";

export type FormKind = "business" | "partners" | "talent" | "general";

export default function FormB({ kind, idPrefix }: { kind: FormKind; idPrefix: string }) {
  const g = getGlobal();
  const start = getPageByRoute("/start")!;
  const form = start.sections.flatMap((s) => s.blocks).find((b) => b.type === "form");
  if (!form || form.type !== "form") return null;
  // businesses get the full set from the deck; the other doors ask only who and what
  const fields: FormField[] = kind === "business" ? form.fields : form.fields.filter((f) => f.type !== "radio");
  const radios = fields.filter((f) => f.type === "radio");
  const texts = fields.filter((f) => f.type === "text" || f.type === "email" || f.type === "tel");
  const area = fields.find((f) => f.type === "textarea");
  const consent = fields.find((f) => f.type === "consent");
  const name = (f: FormField) => `${idPrefix}-${f.name}`;
  return (
    <form className={styles.formPanel} method="post" action="/start">
      {radios.map((f) => f.type === "radio" && (
        <fieldset key={f.name} className={styles.q} style={{ border: 0, margin: 0, padding: 0 }}>
          <legend className={styles.qLabel} style={{ float: "left" }}>
            <span>{f.label}</span>
            {f.hint && <span className={styles.qHint}><InlineNodes nodes={f.hint} /></span>}
          </legend>
          <div className={styles.tiles}>
            {f.options.map((o) => (
              <label key={o} className={styles.tile}><input type="radio" name={name(f)} value={o} /><span>{o}</span></label>
            ))}
          </div>
        </fieldset>
      ))}
      {area && area.type === "textarea" && (
        <div className={styles.q}>
          <div className={styles.qLabel}>
            <span>{area.label} <span className={styles.qHint}>({g.fields.optional})</span></span>
            {area.hint && <span className={styles.qHint}><InlineNodes nodes={area.hint} /></span>}
          </div>
          <div className={styles.field} style={{ borderInlineEnd: 0 }}>
            <textarea id={name(area)} name={name(area)} rows={3} maxLength={400} aria-label={area.label} />
          </div>
        </div>
      )}
      <div className={`${styles.fields}`} style={{ borderBlockEnd: "1px solid var(--ink)" }}>
        {texts.map((f) => f.type !== "radio" && f.type !== "consent" && f.type !== "textarea" && (
          <label key={f.name} className={styles.field}>
            <span>{f.label}</span>
            <input id={name(f)} name={name(f)} type={f.type} required={!f.optional} autoComplete={f.type === "email" ? "email" : f.type === "tel" ? "tel" : f.name === "your-name" ? "name" : f.name === "company" ? "organization" : undefined} />
          </label>
        ))}
      </div>
      {consent && consent.type === "consent" && (
        <label className={styles.consentRow}><input type="checkbox" name={name(consent)} required /><span>{consent.label}</span></label>
      )}
      <div className={styles.sendRow}>
        <button type="submit" className={`${styles.action} ${styles.actionFill}`} disabled aria-disabled="true">{form.submit}</button>
        <span className={styles.qHint}>{g.fields.formNotWired}</span>
      </div>
    </form>
  );
}
