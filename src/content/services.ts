// Operation names: Business Profile p.5. The profile lists names only; the one-line
// summaries are drawn from the wording on p.3 and need client approval before launch.

export type Service = {
  slug: string;
  title: string;
  summary: string;
  icon:
    | "pen-tool"
    | "hard-hat"
    | "construction"
    | "armchair"
    | "zap"
    | "sofa"
    | "ruler"
    | "users";
};

export const services: Service[] = [
  {
    slug: "design-build",
    title: "Design Build (Architectural Solutions)",
    summary:
      "Architectural solutions with design inputs and value engineering, delivered through precise architectural coordination.",
    icon: "pen-tool",
  },
  {
    slug: "civil-infrastructure",
    title: "Civil Infrastructure Project",
    summary:
      "High-rise housing, hostels, institutional and commercial buildings, with internal and external infrastructure.",
    icon: "hard-hat",
  },
  {
    slug: "structural-steel",
    title: "Structural Steel Engineering & Erection Works",
    summary: "Structural steel engineering and erection works for buildings and campuses.",
    icon: "construction",
  },
  {
    slug: "interior-works",
    title: "Interior Works",
    summary: "Specialised interior fit-out as part of full-spectrum project delivery.",
    icon: "armchair",
  },
  {
    slug: "electrical",
    title: "Electrical Projects",
    summary: "Electrical, IT and HVAC services integrated with the main construction contract.",
    icon: "zap",
  },
  {
    slug: "furniture-interiors",
    title: "Furniture & Interior Works",
    summary: "Furniture and interior works to hand over complete, ready-to-use spaces.",
    icon: "sofa",
  },
  {
    slug: "billing-measurement",
    title: "Billing & Measurement Services",
    summary: "Billing and measurement services supporting transparent project accounting.",
    icon: "ruler",
  },
  {
    slug: "project-management",
    title: "Construction & Project Management Services",
    summary:
      "Detailed scheduling, resource planning and clear stakeholder communication, tracked by experienced, qualified staff.",
    icon: "users",
  },
];
