"use client";
// General inquiry: one box, then name, phone and email, then Send. Nothing else is asked.
import { useState } from "react";
import styles from "./b.module.css";
import type { Labels } from "./FormStrip";

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
const phoneOk = (v: string) => /^\+?[\d\s().-]+$/.test(v.trim()) && v.replace(/\D/g, "").length >= 7;

export default function WriteForm({ fields, box, email, labels, consent, notWired }: { fields: { label: string; type: "text" | "tel" | "email" }[]; box: string; email: string; labels: Labels; consent: string; notWired: string }) {
  const [v, setV] = useState<Record<string, string>>({});
  const [agreed, setAgreed] = useState(false);
  const ok = (f: { label: string; type: string }) => { const x = v[f.label] ?? ""; return f.type === "email" ? emailOk(x) : f.type === "tel" ? phoneOk(x) : x.trim().length > 1; };
  const ready = !!v.box?.trim() && fields.every(ok) && agreed;
  return (
    <section className={`${styles.row} ${styles.lineRow}`}>
      <form className={`${styles.panel} ${styles.paper} ${styles.writeForm}`} onSubmit={(e) => e.preventDefault()}>
        <label className={styles.field} style={{ padding: 0, border: 0 }}>
          <span>{box}</span>
          <textarea rows={7} maxLength={2000} value={v.box ?? ""} onChange={(e) => setV({ ...v, box: e.target.value })} />
        </label>
        <div className={styles.contactCol}>
          {fields.map((f) => { const x = v[f.label] ?? ""; const bad = x.trim() ? !ok(f) : false; return (
            <label key={f.label} className={styles.field}>
              <span>{f.label}</span>
              <input type={f.type} inputMode={f.type === "tel" ? "tel" : f.type === "email" ? "email" : undefined} spellCheck={f.type === "email" ? false : undefined} value={x} aria-invalid={bad || undefined} onChange={(e) => setV({ ...v, [f.label]: e.target.value })} autoComplete={f.type === "email" ? "email" : f.type === "tel" ? "tel" : "name"} />
              {bad && <span className={styles.bad}>{f.type === "email" ? labels.invalidEmail : f.type === "tel" ? labels.invalidPhone : labels.required}</span>}
            </label>
          ); })}
        </div>
        <label className={styles.consentRow} style={{ borderBlockEnd: 0, padding: 0 }}><input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} /><span>{consent}</span></label>
        <p className={styles.body}>{labels.email}: <a href={`mailto:${email}`}>{email}</a></p>
        <div>
          <button type="submit" className={`${styles.action} ${styles.actionFill}`} disabled aria-disabled="true" data-ready={ready || undefined}>{labels.send}</button>
          <p className={styles.qHint} style={{ marginBlockStart: 10 }}>{notWired}</p>
        </div>
      </form>
    </section>
  );
}
