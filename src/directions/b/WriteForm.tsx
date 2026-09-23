"use client";
// General inquiry on its own page: one box, name, phone and email, then Send — one page,
// nothing else asked. Send posts to /api/enquire like the strip (milestone 8).
import { useEffect, useRef, useState } from "react";
import styles from "./b.module.css";
import { Fields, Honeypot, SendBlock, deliver, fieldOk } from "./FormStrip";
import type { Field, Labels, Mail, Privacy, Status } from "./FormStrip";

export default function WriteForm({ fields, box, title, labels, consentNote, privacy, mail }: { fields: Field[]; box: string; title: string; labels: Labels; consentNote: string; privacy: Privacy; mail: Mail }) {
  const [v, setV] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [hp, setHp] = useState("");
  const opened = useRef(0);
  useEffect(() => { opened.current = Date.now(); }, []); // when the form was opened, for the minimum time to fill
  const set = (k: string, x: string) => setV((a) => ({ ...a, [k]: x }));
  const ready = !!v.box?.trim() && fields.every((f) => fieldOk(f, v[f.label]));
  const onSend = async () => {
    if (!ready || status === "sending") return;
    setStatus("sending");
    const name = v["Your name"] ?? "", email = v["Email"] ?? "";
    const sentence = `${v.box.trim()} Reach ${name} on ${email}${v["Phone or WhatsApp"] ? ` or ${v["Phone or WhatsApp"]}` : ""}.`;
    const answers = [{ label: box, value: v.box }, ...fields.map((f) => ({ label: f.label, value: v[f.label] ?? "" }))];
    const ok = await deliver({ form: "write", title, answers, sentence, name, email, hp, t: Date.now() - opened.current });
    setStatus(ok ? "sent" : "failed");
  };
  return (
    <section className={`${styles.row} ${styles.lineRow}`}>
      <form className={`${styles.panel} ${styles.paper} ${styles.writeForm}`} onSubmit={(e) => { e.preventDefault(); onSend(); }}>
        <label className={styles.field} style={{ padding: 0, border: 0 }}>
          <span>{box}</span>
          <textarea rows={7} maxLength={2000} value={v.box ?? ""} onChange={(e) => set("box", e.target.value)} disabled={status === "sent"} />
        </label>
        <Fields fields={fields} values={v} set={set} labels={labels} />
        <Honeypot value={hp} set={setHp} />
        <SendBlock needsConsent={false} agreed={false} setAgreed={() => {}} consent="" consentNote={consentNote} privacy={privacy} ready={ready} status={status} onSend={onSend} labels={labels} mail={mail} />
      </form>
    </section>
  );
}
