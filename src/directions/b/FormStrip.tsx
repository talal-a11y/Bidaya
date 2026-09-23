"use client";
// A form as a sideways strip: one question per slide — the question above its options,
// every option a full-height tile — and, on the left, the sentence that fills in as the
// visitor answers. Each option carries the phrase the sentence uses, so it always reads.
// The last slide holds the contact details, the consent line and Send; the write route is
// one slide (the box, the reach fields, Send). A step must be answered before the strip
// moves on; name, email and phone are checked before Send. Send posts to /api/enquire
// (milestone 8); closing the panel keeps nothing. Data: content/forms.json.
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./b.module.css";
import { useChapter } from "./Chapter";

export type Option = { label: string; phrase: string; form?: string; href?: string };
export type Field = { label: string; type: "text" | "email" | "tel"; optional?: boolean };
export type Step =
  | { id: string; label: string; type: "choice"; options: Option[]; hint?: string }
  | { id: string; label: string; type: "text"; hint?: string; optional?: boolean }
  | { id: string; label: string; type: "contact"; fields: Field[] }
  | { id: string; label: string; type: "write"; fields: Field[] };
export type Slot = string | { field: string; blank: string; prefix?: string; optional?: boolean };
export type FormDef = { title: string; tone: string; consent?: boolean; steps: Step[]; sentence: Slot[] };
export type Routing = { id: string; label: string; type: "choice"; options: Option[]; sentence: Slot[] };
export type Labels = { back: string; next: string; send: string; answered: string; email: string; optional: string; invalidEmail: string; invalidPhone: string; required: string };
export type Mail = { sending: string; sent: string; failed: string };
export type Privacy = { label: string; href: string };
export type Status = "idle" | "sending" | "sent" | "failed";

const pad = (n: number) => String(n).padStart(2, "0");
const toneClass: Record<string, string> = { plum: styles.plum, aqua: styles.aqua, teal: styles.tealDeep, plumLight: styles.plumLight, ink: styles.ink };
export const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
export const phoneOk = (v: string) => /^\+?[\d\s().-]+$/.test(v.trim()) && v.replace(/\D/g, "").length >= 7;
export const fieldOk = (f: Field, v = "") => (f.optional && !v.trim()) || (f.type === "email" ? emailOk(v) : f.type === "tel" ? phoneOk(v) : v.trim().length > 1);

// the post to /api/enquire; the answer decides what the form shows
export async function deliver(payload: { form: string; title: string; answers: { label: string; value: string }[]; sentence: string; name: string; email: string; hp: string; t: number }): Promise<boolean> {
  try {
    const r = await fetch("/api/enquire", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
    return r.ok;
  } catch { return false; }
}

// the contact fields, laid out two across
export function Fields({ fields, values, set, labels }: { fields: Field[]; values: Record<string, string>; set: (k: string, v: string) => void; labels: Labels }) {
  return (
    <div className={styles.contactCol}>
      {fields.map((f) => {
        const v = values[f.label] ?? "";
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
  );
}

// the hidden field a bot fills and a person never sees
export function Honeypot({ value, set }: { value: string; set: (v: string) => void }) {
  return <label className="visually-hidden" aria-hidden="true">Company<input type="text" name="company" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => set(e.target.value)} /></label>;
}

// the consent line or the note, the privacy link, Send and what came of it
export function SendBlock({ needsConsent, agreed, setAgreed, consent, consentNote, privacy, ready, status, onSend, labels, mail }: { needsConsent: boolean; agreed: boolean; setAgreed: (v: boolean) => void; consent: string; consentNote: string; privacy: Privacy; ready: boolean; status: Status; onSend: () => void; labels: Labels; mail: Mail }) {
  return (
    <>
      {needsConsent
        ? <label className={styles.consentRow} style={{ borderBlockEnd: 0, padding: 0 }}><input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} /><span>{consent} <Link href={privacy.href}>{privacy.label}</Link>.</span></label>
        : <p className={styles.qHint}>{consentNote} <Link href={privacy.href}>{privacy.label}</Link>.</p>}
      <div>
        <button type="button" className={`${styles.action} ${styles.actionFill}`} disabled={!ready || status === "sending" || status === "sent"} onClick={onSend}>{status === "sending" ? mail.sending : labels.send}</button>
        <p className={styles.qHint} style={{ marginBlockStart: 10 }} role="status">{status === "sent" ? mail.sent : status === "failed" ? mail.failed : ""}</p>
      </div>
    </>
  );
}

export default function FormStrip({ id, forms, routing, title, labels, consent, consentNote, privacy, mail, closeLabel, startWith }: { id: string; forms: Record<string, FormDef>; routing: Routing; title: string; labels: Labels; consent: string; consentNote: string; privacy: Privacy; mail: Mail; closeLabel: string; startWith?: string }) {
  const { toggle } = useChapter();
  const [chosen, setChosen] = useState<string | null>(startWith ?? null);
  const routed = routing.options.length > 0; // a page that is one form has no routing question
  const form: FormDef = chosen && forms[chosen]
    ? (routed ? { ...forms[chosen], steps: [routing as unknown as Step, ...forms[chosen].steps], sentence: [...routing.sentence, ...forms[chosen].sentence] } : forms[chosen])
    : { title, tone: "ink", steps: [routing as unknown as Step], sentence: routing.sentence };
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [agreed, setAgreed] = useState(false);
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [hp, setHp] = useState("");
  const opened = useRef(0);
  useEffect(() => { opened.current = Date.now(); }, []); // when the form was opened, for the minimum time to fill
  const track = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const acc = useRef(0);
  const total = form.steps.length;
  const set = (k: string, v: string) => setAnswers((a) => ({ ...a, [k]: v }));

  const done = (step: Step) =>
    step.type === "choice" ? !!answers[step.id]
    : step.type === "text" ? (step.optional || !!answers[step.id]?.trim())
    : step.type === "write" ? (!!answers[step.id]?.trim() && step.fields.every((f) => fieldOk(f, answers[f.label])))
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
  const sentenceText = () => form.sentence.map((slot) => {
    if (typeof slot === "string") return slot;
    const v = phraseOf(slot.field);
    return v ? `${slot.prefix ?? ""}${v}` : slot.optional ? "" : `[${slot.blank}]`;
  }).join("");
  const side = () => (
    <div className={`${styles.formSide} ${toneClass[chosen ? form.tone : "ink"] ?? styles.ink}`}>
      <p className={styles.mono} style={{ opacity: 0.8 }}>{chosen ? form.title : title}</p>
      {sentence}
      <span />
    </div>
  );
  const needsConsent = !!form.consent;
  const ready = form.steps.every(done) && (!needsConsent || agreed);

  const onSend = async () => {
    if (!ready || status === "sending") return;
    setStatus("sending");
    const list: { label: string; value: string }[] = [];
    for (const step of form.steps) {
      if (step.type === "choice" || step.type === "text") list.push({ label: step.label, value: answers[step.id] ?? "" });
      if (step.type === "write") list.push({ label: step.label, value: answers[step.id] ?? "" });
      if (step.type === "contact" || step.type === "write") step.fields.forEach((f) => list.push({ label: f.label, value: answers[f.label] ?? "" }));
    }
    const email = Object.entries(answers).find(([k]) => /email/i.test(k))?.[1] ?? "";
    const name = Object.entries(answers).find(([k]) => /name/i.test(k))?.[1] ?? "";
    const ok = await deliver({ form: chosen ?? "general", title: form.title, answers: list, sentence: sentenceText(), name, email, hp, t: Date.now() - opened.current });
    setStatus(ok ? "sent" : "failed");
  };
  const sendBlock = <SendBlock needsConsent={needsConsent} agreed={agreed} setAgreed={setAgreed} consent={consent} consentNote={consentNote} privacy={privacy} ready={ready} status={status} onSend={onSend} labels={labels} mail={mail} />;

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
      <div className={styles.fill} aria-hidden="true"><i style={{ transform: `scaleX(${Math.max(0.04, index / Math.max(1, total - 1))})` }} /></div>
      <div ref={track} className={styles.track}>
        {form.steps.map((step, n) => (
          <div key={step.id} className={`${styles.slide} ${styles.formSlide}`}>
            {side()}
            <div className={styles.ask}>
              <div className={styles.askHead}>
                <h3>{step.label}{step.type === "text" && step.optional ? <span className={styles.qHint}> ({labels.optional})</span> : ""}</h3>
                {(step.type === "choice" || step.type === "text") && step.hint && <p className={styles.qHint}>{step.hint}</p>}
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
              {step.type === "write" && (
                <div className={styles.sendCol}>
                  <textarea rows={5} maxLength={2000} aria-label={step.label} value={answers[step.id] ?? ""} onChange={(e) => set(step.id, e.target.value)} disabled={status === "sent"} />
                  <Fields fields={step.fields} values={answers} set={set} labels={labels} />
                  <Honeypot value={hp} set={setHp} />
                  {sendBlock}
                </div>
              )}
              {step.type === "contact" && (
                <div className={styles.sendCol}>
                  <Fields fields={step.fields} values={answers} set={set} labels={labels} />
                  <Honeypot value={hp} set={setHp} />
                  {sendBlock}
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
