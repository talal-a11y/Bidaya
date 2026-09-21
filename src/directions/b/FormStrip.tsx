"use client";
// A form as a sideways strip: one question per slide, every option shown at once on
// full-height tiles, and — on the left — the sentence that fills in as the visitor answers
// (the founder's pick: C's sentence, B's tiles and steps). Data: content/forms.json.
// Nothing is sent yet; Send is disabled and says so. No storage; closing the panel clears it.
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./b.module.css";

export type Step =
  | { id: string; label: string; type: "choice"; options: string[]; hint?: string }
  | { id: string; label: string; type: "text"; hint?: string; optional?: boolean }
  | { id: string; label: string; type: "contact"; fields: string[] };
export type Slot = string | { field: string; blank: string };
export type FormDef = { title: string; tone: string; email?: string; steps: Step[]; sentence: Slot[] };
export type Labels = { back: string; next: string; send: string; answered: string; email: string };

const pad = (n: number) => String(n).padStart(2, "0");
const toneClass: Record<string, string> = { plum: styles.plum, aqua: styles.aqua, teal: styles.tealDeep, plumLight: styles.plumLight, ink: styles.ink };

export default function FormStrip({ id, form, labels, consent, notWired }: { id: string; form: FormDef; labels: Labels; consent: string; notWired: string }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [index, setIndex] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const acc = useRef(0);
  const total = form.steps.length + 1; // the last slide reads the sentence back and sends
  const set = (k: string, v: string) => setAnswers((a) => ({ ...a, [k]: v }));

  const go = useCallback((i: number) => {
    const el = track.current; if (!el) return;
    const next = Math.max(0, Math.min(total - 1, i));
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    busy.current = true; setTimeout(() => { busy.current = false; }, 650);
  }, [total]);

  useEffect(() => {
    const el = track.current; if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if ((e.target as HTMLElement).closest("textarea")) return;
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      const i = Math.round(el.scrollLeft / el.clientWidth);
      if ((i === 0 && delta < 0) || (i === total - 1 && delta > 0)) return;
      e.preventDefault(); e.stopPropagation();
      if (busy.current) return;
      acc.current += delta;
      if (Math.abs(acc.current) > 40) { go(i + (acc.current > 0 ? 1 : -1)); acc.current = 0; }
    };
    const onScroll = () => setIndex(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => { el.removeEventListener("wheel", onWheel); el.removeEventListener("scroll", onScroll); };
  }, [go, total]);

  const answered = form.steps.filter((s) => s.type === "contact" ? s.fields.every((f) => answers[f]) : s.type === "text" ? true : !!answers[s.id]).length;

  const sentence = (
    <p className={styles.sentence}>
      {form.sentence.map((slot, i) => typeof slot === "string" ? slot : answers[slot.field]
        ? <b key={i}>{answers[slot.field]}</b>
        : <u key={i}>{slot.blank}</u>)}
    </p>
  );

  const side = (n: number, step?: Step) => (
    <div className={`${styles.formSide} ${toneClass[form.tone] ?? styles.ink}`}>
      <div>
        <p className={styles.mono} style={{ opacity: 0.8 }}>{step ? step.label : form.title}</p>
        {step?.type !== "contact" && step?.hint && <p className={styles.formHint}>{step.hint}</p>}
      </div>
      {sentence}
      <div className={styles.progress} aria-hidden="true">{Array.from({ length: total }, (_, i) => <i key={i} className={i <= n ? styles.progressOn : ""} />)}</div>
    </div>
  );

  return (
    <div className={styles.formStrip}>
      <div className={styles.chapterHead}>
        <span className={styles.mono}>[ {form.title} ]</span>
        <span className={styles.mono} aria-live="polite">{pad(index + 1)} / {pad(total)} · {answered}/{form.steps.length} {labels.answered}</span>
        <span className={styles.chapterNav}>
          <button type="button" className={styles.chapterBtn} onClick={() => go(index - 1)} disabled={index === 0}>← {labels.back}</button>
          <button type="button" className={styles.chapterBtn} onClick={() => go(index + 1)} disabled={index === total - 1}>{labels.next} →</button>
        </span>
      </div>
      <div ref={track} className={styles.track}>
        {form.steps.map((step, n) => (
          <div key={step.id} className={`${styles.slide} ${styles.formSlide}`}>
            {side(n, step)}
            {step.type === "choice" && (
              <fieldset className={styles.tileCol} style={{ border: 0, margin: 0, padding: 0 }}>
                <legend className="visually-hidden">{step.label}</legend>
                {step.options.map((o, k) => (
                  <label key={o} className={`${styles.tileBig} ${answers[step.id] === o ? styles.tileOn : ""}`}>
                    <input type="radio" name={`${id}-${step.id}`} value={o} checked={answers[step.id] === o} onChange={() => { set(step.id, o); setTimeout(() => go(n + 1), 260); }} />
                    <span>{o}</span><span className={styles.mono}>{pad(k + 1)}</span>
                  </label>
                ))}
              </fieldset>
            )}
            {step.type === "text" && (
              <div className={styles.textCol}>
                <label className={styles.field} style={{ borderInlineEnd: 0, padding: 0 }}>
                  <span>{step.label}{step.optional ? "" : " *"}</span>
                  <textarea rows={5} maxLength={400} value={answers[step.id] ?? ""} onChange={(e) => set(step.id, e.target.value)} />
                </label>
              </div>
            )}
            {step.type === "contact" && (
              <div className={styles.contactCol}>
                {step.fields.map((f) => (
                  <label key={f} className={styles.field}>
                    <span>{f}</span>
                    <input type={/mail/i.test(f) ? "email" : /phone/i.test(f) ? "tel" : "text"} value={answers[f] ?? ""} onChange={(e) => set(f, e.target.value)} autoComplete={/mail/i.test(f) ? "email" : /phone/i.test(f) ? "tel" : /name/i.test(f) ? "name" : "organization"} />
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
        {/* the last slide: the sentence read back, consent, send */}
        <div className={`${styles.slide} ${styles.formSlide}`}>
          {side(total - 1)}
          <div className={styles.sendCol}>
            <label className={styles.consentRow} style={{ borderBlockEnd: 0, padding: 0 }}><input type="checkbox" /><span>{consent}</span></label>
            {form.email && <p className={styles.body}>{labels.email}: <a href={`mailto:${form.email}`}>{form.email}</a></p>}
            <div>
              <button type="button" className={`${styles.action} ${styles.actionFill}`} disabled aria-disabled="true">{labels.send}</button>
              <p className={styles.qHint} style={{ marginBlockStart: 10 }}>{notWired}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
