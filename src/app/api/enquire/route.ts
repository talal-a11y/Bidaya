// The forms' delivery (milestone 8). A submission arrives as JSON; it goes by email through
// Resend to info@ (the questionnaire and the write form) or talent@ (the Talent Network), and a
// confirmation goes back to the sender from the receiving address. Nothing is stored here.
// Against bots: a hidden field that must stay empty, a minimum time to fill, a per-address cap.
// The key is RESEND_API_KEY in Vercel's environment; without it the route answers 503.
import { NextResponse } from "next/server";
import { Resend } from "resend";
import forms from "../../../../content/forms.json";

type Answer = { label: string; value: string };
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const str = (v: unknown, max: number) => (typeof v === "string" && v.length <= max ? v.trim() : null);

const hits = new Map<string, number[]>();
const capped = (ip: string) => {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < 3_600_000);
  list.push(now); hits.set(ip, list);
  return list.length > 8;
};

const bad = (error: string, status = 400) => NextResponse.json({ ok: false, error }, { status });

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return bad("not-configured", 503);
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return bad("json"); }

  if (typeof body.hp === "string" && body.hp.trim()) return NextResponse.json({ ok: true }); // a bot filled the hidden field
  if (typeof body.t !== "number" || body.t < 3000) return bad("too-fast");
  const form = str(body.form, 40) ?? "general";
  const title = str(body.title, 120) ?? "Enquiry";
  const sentence = str(body.sentence, 6000);
  const name = str(body.name, 200);
  const email = str(body.email, 320);
  const raw = Array.isArray(body.answers) ? body.answers.slice(0, 40) : [];
  const answers: Answer[] = raw.map((a) => ({ label: str((a as Answer)?.label, 200) ?? "", value: str((a as Answer)?.value, 4000) ?? "" })).filter((a) => a.label && a.value);
  if (!sentence || !name || !email || !emailOk(email)) return bad("fields");

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (capped(ip)) return bad("too-many", 429);

  const to = form === "talent" ? forms.delivery.talent : forms.delivery.questionnaire;
  const from = `Bidaya Consulting <${to}>`;
  const text = [sentence, "", ...answers.map((a) => `${a.label}: ${a.value}`), "", `${name} <${email}>`].join("\n");
  const resend = new Resend(key);
  const sent = await resend.emails.send({ from, to, replyTo: email, subject: forms.mail.subject.replace("{title}", title).replace("{name}", name), text });
  if (sent.error) return bad("send-failed", 502);
  await resend.emails.send({ from, to: email, subject: forms.mail.confirmSubject, text: forms.mail.confirmBody.replace("{sentence}", sentence) }).catch(() => null);
  return NextResponse.json({ ok: true });
}
