// Source: Business Profile – Krishna Builder (21.10.2026), pages 2–4, 43–46.

export const company = {
  name: "Krishna Builder",
  legalName: "M/s Krishna Builder",
  tagline: "Building dreams through Construction",
  type: "Proprietorship Firm",
  nature: "EPC Contractors, Developers, and Infrastructure Services Providers",
  founded: 1996,
  proprietor: "Parveen Mittal",
  address: {
    lines: [
      "301-A, 3rd Floor, Ring Road Mall",
      "Deepali Chowk, Sector-3, Rohini",
      "New Delhi – 110085",
    ],
    full: "301-A, 3rd Floor, Ring Road Mall, Deepali Chowk, Sector-3, Rohini, New Delhi – 110085",
    locality: "Rohini, New Delhi",
    postalCode: "110085",
  },
  phones: [
    { label: "+91-93100 44360", tel: "+919310044360" },
    { label: "+91-98100 47158", tel: "+919810047158" },
  ],
  // WhatsApp number is assumed to be the second listed number until the client confirms.
  whatsapp: "919810047158",
  emails: {
    general: "info@krishnabuilder.co.in",
    proprietor: "pkm@krishnabuilder.co.in",
    tender: "tendercell@krishnabuilder.co.in",
  },
  mapQuery: "Ring Road Mall, Deepali Chowk, Sector 3, Rohini, New Delhi 110085",
} as const;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://krishnabuilder.co.in";

export type Stat = { value: number; suffix: string; label: string; description: string };

// Labels and descriptions: Business Profile p.2 (experience) and p.45 (workforce distribution).
export const stats: readonly Stat[] = [
  {
    value: 30,
    suffix: "+",
    label: "Years of experience",
    description: "More than 30 years in Building Construction work.",
  },
  {
    value: 300,
    suffix: "+",
    label: "Total Employees",
    description:
      "M/s Krishna Builder employs a diverse workforce of 300+ professionals across multiple disciplines and project sites throughout India.",
  },
  {
    value: 60,
    suffix: "+",
    label: "Civil + MEP Engineers",
    description: "Our Civil + MEP Engineering team forms the backbone of our technical capabilities.",
  },
  {
    value: 11,
    suffix: "+",
    label: "Project Sites",
    description:
      "Including Paradip, Jajpur, Noida, Kundli, Kalol, Palwal, and many more locations across India.",
  },
  {
    value: 8,
    suffix: "+",
    label: "Ex-NBCC & CPWD Leaders",
    description:
      "Our senior leadership includes multiple former NBCC & CPWD and executives bringing invaluable experience.",
  },
];

/** Company profile table, Business Profile p.2. */
export const particulars: { label: string; value: string }[] = [
  { label: "Name of the firm", value: "M/s Krishna Builder" },
  { label: "Type of Business", value: "Proprietorship Firm" },
  {
    label: "Head Office",
    value:
      "301-A, 3rd Floor, Ring Road Mall, Deepali Chowk, Sector-3, Rohini, New Delhi – 110085.",
  },
  {
    label: "Nature of Business",
    value: "EPC Contractors, Developers, and Infrastructure Services Providers",
  },
  { label: "Experience", value: "More than 30 years in Building Construction work" },
  { label: "Proprietor", value: "Parveen Mittal" },
  { label: "Contact Number", value: "+91-93100 44360 and +91-98100 47158" },
  {
    label: "Email",
    value: "info@krishnabuilder.co.in · pkm@krishnabuilder.co.in · tendercell@krishnabuilder.co.in",
  },
];

export const teamIntro =
  "Krishna Builder is led by a team of experienced professionals who bring extensive industry knowledge and technical expertise to every project. Our leadership structure combines the vision of our proprietor with the specialized skills of our senior management team.";

export const about = {
  paragraphs: [
    "Commencing operations in 1996, M/s Krishna Builder has distinguished itself as a premier contractor, serving key government departments such as NBCC, Central and State Universities, Delhi PWD, CPWD, HSCC, NDMC, NPCC, IIM Nagpur, IrconISL, C&DS UP Jal Nigam, Unitech GSIDC Ltd., DPS Society and other notable entities.",
    "In its 30 years of operations, M/s Krishna Builder has attained specialization and recognition in the entire construction scenario on pan India basis.",
    "As a leading main contractor, M/s Krishna Builder specializes in constructing and developing pivotal projects such as High-Rise Housing, Hostels, Institutional, and Commercial properties. We cater to the distinct needs of various industries, providing full-spectrum solutions that include Internal & External infrastructure, cutting-edge Waste Water Treatment facilities, and specialized services like Interior Works, IT, and HVAC. Our commitment to excellence is reflected in our robust application of Value Engineering and precise Architectural coordination, consistently delivering projects on an efficient EPC basis.",
  ],
} as const;

export const vision = [
  "To create a detailed schedule and resource plan to meet the client’s objectives.",
  "Clear communication with all the project stakeholders.",
  "To regularly track project progress & quality through highly experienced and qualified staff, architect, consultant and technical advisor.",
  "Timely commissioning and completion of projects.",
  "To provide design-inputs and value engineering solutions for our clients in the private and public sectors both.",
] as const;

export const leadership = [
  {
    name: "Mr. Parveen Mittal",
    role: "Proprietor of M/s Krishna Builder",
    bio: null,
  },
  {
    name: "Mr. Saksham Mittal",
    role: "Finance Manager",
    bio: "Overseeing Finance, Tendering, Operations, HR, Technology, and Marketing functions.",
  },
  {
    name: "Mr. Neelesh Shah",
    role: "Director Projects",
    bio: "Former Director Projects at NBCC, bringing unparalleled leadership and technical expertise to M/s Krishna Builder’s project execution.",
  },
] as const;

export const leadershipNote =
  "Our senior leadership team, particularly Mr. Neelesh Shah with his extensive NBCC directorial experience, provides Krishna Builder with exceptional project management capabilities and deep industry insights that have helped us to explore more fields such as NCLT biddings, Real Estate Market, and more.";

export const workforceNote =
  "M/s Krishna Builder’s workforce represents a comprehensive team of professionals with the expertise to handle complex construction projects across multiple sectors and geographical locations.";

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/contact", label: "Contact" },
] as const;
