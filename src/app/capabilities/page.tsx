import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatGrid } from "@/components/ui/StatGrid";
import { TurnoverChart } from "@/components/capabilities/TurnoverChart";
import { stats, workforceNote } from "@/content/company";
import { machinery } from "@/content/machinery";
import { clientNames } from "@/content/clients";

export const metadata: Metadata = {
  title: "Capabilities & Clients",
  description:
    "Krishna Builder's plant and machinery, team strength, financial performance and the government departments and institutions we serve.",
  alternates: { canonical: "/capabilities" },
};

export default function CapabilitiesPage() {
  return (
    <>
      <section className="on-dark bg-brand-ink py-20 sm:py-28">
        <Container>
          <SectionHeading
            tone="dark"
            eyebrow="Capabilities"
            title="The people, plant and track record behind every project"
            intro={workforceNote}
          />
        </Container>
      </section>

      <section aria-label="Team strength" className="bg-brand-ink">
        <Container>
          <StatGrid stats={stats.filter((s) => s.label !== "Years of experience")} showDescriptions />
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Financial performance"
              title="Steady growth in turnover"
              intro="Annual turnover in INR Lakhs, as stated in our business profile."
            />
          </div>
          <Reveal className="lg:col-span-8">
            <TurnoverChart />
          </Reveal>
        </Container>
      </section>

      <section className="bg-muted py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Plant & machinery"
            title="Equipment owned and deployed on our sites"
          />
          <Reveal className="mt-12">
            <div className="overflow-x-auto border border-border bg-surface">
              <table className="w-full min-w-[34rem] text-left text-sm">
                <caption className="sr-only">Plant and machinery</caption>
                <thead className="bg-brand text-white">
                  <tr>
                    <th scope="col" className="w-16 px-5 py-4 font-semibold">S. No</th>
                    <th scope="col" className="px-5 py-4 font-semibold">Name of equipment</th>
                    <th scope="col" className="px-5 py-4 font-semibold">Nos.</th>
                    <th scope="col" className="px-5 py-4 font-semibold">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {machinery.map((m) => (
                    <tr key={m.no} className="odd:bg-surface even:bg-background">
                      <td className="px-5 py-3 text-muted-foreground">{m.no}</td>
                      <th scope="row" className="px-5 py-3 font-semibold text-brand-ink">
                        {m.name}
                      </th>
                      <td className="px-5 py-3">{m.qty}</td>
                      <td className="px-5 py-3 text-muted-foreground">{m.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Clients & project management consultants"
            title="Government departments and institutions we serve"
          />
          <ul className="mt-12 grid grid-cols-2 gap-px bg-border sm:grid-cols-3 lg:grid-cols-4">
            {clientNames.map((c) => (
              <li
                key={c}
                className="flex min-h-24 items-center justify-center bg-surface px-4 text-center font-display text-lg font-extrabold text-brand"
              >
                {c}
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
