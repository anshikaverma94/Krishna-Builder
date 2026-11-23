import { Resend } from "resend";
import { enquirySchema } from "@/lib/enquiry-schema";
import { company } from "@/content/company";

// Best-effort limiter (per server instance). For stricter limits use a shared store.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 1000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_PER_WINDOW;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) {
    return Response.json({ error: "Too many enquiries. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    // A filled honeypot also lands here; report it as a generic validation failure.
    return Response.json({ error: "Please check the form and try again." }, { status: 400 });
  }
  const data = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO ?? company.emails.general;
  const from = process.env.ENQUIRY_FROM;
  if (!apiKey || !from) {
    console.error("Enquiry email is not configured: set RESEND_API_KEY and ENQUIRY_FROM.");
    return Response.json(
      {
        error: `We couldn't send your message right now. Please email ${company.emails.general} or call ${company.phones[0].label}.`,
      },
      { status: 503 },
    );
  }

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone || "—"],
    ["Organisation", data.organisation || "—"],
    ["Subject", data.subject],
  ];
  const html = `
    <h2>New website enquiry</h2>
    <table cellpadding="6">${rows
      .map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escapeHtml(v)}</td></tr>`)
      .join("")}</table>
    <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: data.subject === "Tender / bid enquiry" ? [to, company.emails.tender] : [to],
      replyTo: data.email,
      subject: `[Website] ${data.subject} — ${data.name}`,
      html,
    });
    if (error) throw new Error(error.message);
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Enquiry send failed:", err);
    return Response.json(
      { error: "We couldn't send your message right now. Please try again or call us." },
      { status: 502 },
    );
  }
}
