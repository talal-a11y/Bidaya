"use client";
// A form as a sideways strip: one question per slide — the question above its options,
// every option a full-height tile — and, on the left, the sentence that fills in as the
// visitor answers. Each option carries the phrase the sentence uses, so it always reads.
// The last slide holds the contact details, the consent line and Send. A step must be
// answered before the strip moves on; name, email and phone are checked before Send.
// Data: content/forms.json. Nothing is sent yet; closing the panel keeps nothing.
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./b.module.css";
import { useChapter } from "./Chapter";

export type Option = { label: string; phrase: string; form?: string; href?: string };
export type Field = { label: string; type: "text" | "email" | "tel"; optional?: boolean };
export type Step =
  | { id: string; label: string; type: "choice"; options: Option[]; hint?: string }
  | { id: string; label: string; type: "text"; hint?: string; optional?: boolean }
  | { id: string; label: string; type: "contact"; fields: Field[] };
export type Slot = string | { field: string; blank: string; prefix?: string; optional?: boolean };
export type FormDef = { title: string; tone: string; email?: string; consent?: boolean; steps: Step[]; sentence: Slot[] };
export type Routing = { id: string; label: string; type: "choice"; options: Option[]; sentence: Slot[] };
export type Labels = { back: string; next: string; send: string; answered: string; email: string; optional: string; invalidEmail: string; invalidPhone: string; required: string };

const pad = (n: number) => String(n).padStart(2, "0");
const toneClass: Record<string, string> = { plum: styles.plum, aqua: styles.aqua, teal: styles.tealDeep, plumLight: styles.plumLight, ink: styles.ink };
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
const phoneOk = (v: string) => /^\+?[\d\s().-]+$/.test(v.trim()) && v.replace(/\D/g, "").length >= 7;
const fieldOk = (f: Field, v = "") => (f.optional && !v.trim()) || (f.type === "email" ? emailOk(v) : f.type === "tel" ? phoneOk(v) : v.trim().length > 1);

export default function FormStrip({ id, forms, routing, title, labels, consent, consentNote, notWired, closeLabel, startWith }: { id: string; forms: Record<string, FormDef>; routing: Routing; title: string; labels: Labels; consent: string; consentNote: string; notWired: string; closeLabel: string; startWith?: string }) {
  const { toggle } = useChapter();
  const [chosen, setChosen] = useState<string | null>(startWith ?? null);
  const routed = routing.options.length > 0; // a page that is one form has no routing question
  const form: FormDef = chosen && forms[chosen]
    ? (routed ? { ...forms[chosen], steps: [routing as unknown as Step, ...forms[chosen].steps], sentence: [...routing.sentence, ...forms[chosen].sentence] } : forms[chosen])
    : { title, tone: "ink", steps: [routing as unknown as Step], sentence: routing.sentence };
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [agreed, setAgreed] = useState(false);
  const [index, setIndex] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const acc = useRef(0);
  const total = form.steps.length;
  const set = (k: string, v: string) => setAnswers((a) => ({ ...a, [k]: v }));

  const done = (step: Step) =>
    step.type === "choice" ? !!answers[step.id]
    : step.type === "text" ? (step.optional || !!answers[step.id]?.trim())
    : step.fields.every((f) => fieldOk(f, answers[f.label]));
  const answered = form.steps.filter(done).length;
  const canLeave = (i: number) => i >= total - 1 || done(form.steps[i]);

  const go = useCallback((i: number) => {
    const el = track.current; if (!el) return;
    const next = Math.max(0, Math.min(total - 1, i));
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    busy.current = true; setTimeout(() => { busy.current = false; }, 900);
  }, [total]);


  useEffect(() => {
    const el = track.current; if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if ((e.target as HTMLElement).closest("textarea, input")) return;
      if (Math.abs(e.deltaY) >= Math.abs(e.deltaX)) return; // a vertical wheel scrolls the page (founder, 2026-09-23)
      const delta = e.deltaX;
      const i = Math.round(el.scrollLeft / el.clientWidth);
      if ((i === 0 && delta < 0) || (i === total - 1 && delta > 0)) return;
      e.preventDefault(); e.stopPropagation();
      if (busy.current) return;
      if (delta > 0 && !canLeave(i)) return; // answer first
      acc.current += delta;
      if (Math.abs(acc.current) > 40) { go(i + (acc.current > 0 ? 1 : -1)); acc.current = 0; }
    };
    const onScroll = () => setIndex(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => { el.removeEventListener("wheel", onWheel); el.removeEventListener("scroll", onScroll); };
  });

  const phraseOf = (field: string) => {
    const v = answers[field];
    if (!v) return "";
    const step = form.steps.find((s) => s.id === field);
    if (step?.type === "choice") return step.options.find((o) => o.label === v)?.phrase ?? v;
    return v;
  };
  const sentence = (
    <p className={styles.sentence}>
      {form.sentence.map((slot, i) => {
        if (typeof slot === "string") return slot;
        const v = phraseOf(slot.field);
        if (v) return <span key={i}>{slot.prefix}<b>{v}</b></span>;
        if (slot.optional) return null;
        return <u key={i}>{slot.blank}</u>;
      })}
    </p>
  );
  const side = () => (
    <div className={`${styles.formSide} ${toneClass[chosen ? form.tone : "ink"] ?? styles.ink}`}>
      <p className={styles.mono} style={{ opacity: 0.8 }}>{chosen ? form.title : title}</p>
      {sentence}
      <span />
    </div>
  );
  const needsConsent = !!form.consent;
  const ready = form.steps.every(done) && (!needsConsent || agreed);

  return (
    <div className={styles.formStrip}>
      <div className={styles.chapterHead}>
        <span className={styles.mono}>[ {chosen ? form.title : title} ]</span>
        <span className="visually-hidden" aria-live="polite">{pad(index + 1)} / {pad(total)} · {answered}/{total} {labels.answered}</span><span />
        <span className={styles.chapterNav}>
          <button type="button" className={styles.chapterBtn} onClick={() => go(index - 1)} disabled={index === 0}>← {labels.back}</button>
          <button type="button" className={styles.chapterBtn} onClick={() => go(index + 1)} disabled={index === total - 1 || !canLeave(index)}>{labels.next} →</button>
          <button type="button" className={styles.chapterBtn} onClick={() => toggle(id)}>{closeLabel}</button>
        </span>
      </div>
      <div className={styles.fill} aria-hidden="true"><i style={{ transform: `scaleX(${Math.max(0.04, (index + (chosen ? 0 : 0)) / Math.max(1, total - 1))})` }} /></div>
      <div ref={track} className={styles.track}>
        {form.steps.map((step, n) => (
          <div key={step.id} className={`${styles.slide} ${styles.formSlide}`}>
            {side()}
            <div className={styles.ask}>
              <div className={styles.askHead}>
                <h3>{step.label}{step.type === "text" && step.optional ? <span className={styles.qHint}> ({labels.optional})</span> : ""}</h3>
                {step.type !== "contact" && step.hint && <p className={styles.qHint}>{step.hint}</p>}
              </div>
              {step.type === "choice" && (
                <fieldset className={styles.tileCol} style={{ border: 0, margin: 0, padding: 0 }}>
                  <legend className="visually-hidden">{step.label}</legend>
                  {step.options.map((o, k) => (
                    <label key={o.label} className={`${styles.tileBig} ${answers[step.id] === o.label ? styles.tileOn : ""}`}>
                      <input type="radio" name={`${id}-${step.id}`} value={o.label} checked={answers[step.id] === o.label} onChange={() => { if (step.id === routing.id) setChosen(o.form ?? null); set(step.id, o.label); setTimeout(() => { const el = track.current; if (el) { el.scrollTo({ left: (n + 1) * el.clientWidth, behavior: "smooth" }); busy.current = true; setTimeout(() => { busy.current = false; }, 900); } }, 320); }} />
                      <span>{o.label}</span><span className={styles.mono}>{pad(k + 1)}</span>
                    </label>
                  ))}
                </fieldset>
              )}
              {step.type === "text" && (
                <div className={styles.textCol}>
                  <textarea rows={5} maxLength={400} aria-label={step.label} value={answers[step.id] ?? ""} onChange={(e) => set(step.id, e.target.value)} />
                </div>
              )}
              {step.type === "contact" && (
                <div className={styles.sendCol}>
                  <div className={styles.contactCol}>
                    {step.fields.map((f) => {
                      const v = answers[f.label] ?? "";
                      const bad = v.trim() ? !fieldOk(f, v) : false;
                      return (
                        <label key={f.label} className={styles.field}>
                          <span>{f.label}{f.optional ? ` (${labels.optional})` : ""}</span>
                          <input type={f.type} inputMode={f.type === "tel" ? "tel" : f.type === "email" ? "email" : undefined} spellCheck={f.type === "email" ? false : undefined} value={v} aria-invalid={bad || undefined} required={!f.optional} onChange={(e) => set(f.label, e.target.value)} autoComplete={f.type === "email" ? "email" : f.type === "tel" ? "tel" : /name/i.test(f.label) ? "name" : "organization"} />
                          {bad && <span className={styles.bad}>{f.type === "email" ? labels.invalidEmail : f.type === "tel" ? labels.invalidPhone : labels.required}</span>}
                        </label>
                      );
                    })}
                  </div>
                  {needsConsent ? <label className={styles.consentRow} style={{ borderBlockEnd: 0, padding: 0 }}><input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} /><span>{consent}</span></label> : <p className={styles.qHint}>{consentNote}</p>}
                  {form.email && <p className={styles.body}>{labels.email}: <a href={`mailto:${form.email}`}>{form.email}</a></p>}
                  <div>
                    {/* disabled until wired (milestone 8); once wired: disabled={!ready} */}
                    <button type="button" className={`${styles.action} ${styles.actionFill}`} disabled aria-disabled="true" data-ready={ready || undefined}>{labels.send}</button>
                    <p className={styles.qHint} style={{ marginBlockStart: 10 }}>{notWired}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.stripFoot}>
        <button type="button" className={styles.chapterBtn} onClick={() => go(index - 1)} disabled={index === 0}>← {labels.back}</button>
        <button type="button" className={styles.chapterBtn} onClick={() => go(index + 1)} disabled={index === total - 1 || !canLeave(index)}>{labels.next} →</button>
      </div>
    </div>
  );
}
