const inr = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** 12495.24 → "₹12,495.24 Lakhs" (exactly as the profile prints it). */
export function formatLakhs(lakhs: number): string {
  return `₹${inr.format(lakhs)} Lakhs`;
}

/** 12495.24 → "₹124.95 Cr" (1 crore = 100 lakhs). Used for compact UI. */
export function formatCrore(lakhs: number): string {
  return `₹${inr.format(lakhs / 100)} Cr`;
}

const dateFmt = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** "2024-12-31" → "31 Dec 2024". UTC so server and client always agree. */
export function formatDate(iso: string): string {
  return dateFmt.format(new Date(`${iso}T00:00:00Z`));
}

export function yearOf(iso: string): number {
  return Number(iso.slice(0, 4));
}
