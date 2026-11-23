// Source: Business Profile – Krishna Builder (21.10.2026), pp.8–21 (completed) and pp.23–38 (ongoing).
// Values are entered as printed. Fields the profile does not give are left undefined
// and are hidden on the page rather than shown blank.
// Photos: `images` comes from scripts/extract-pdf-images.mjs (src/content/project-images.json).
// Those are low-resolution slide images, used as placeholders until the client supplies originals.

import imageMap from "./project-images.json";

export type Sector =
  | "Education"
  | "Healthcare"
  | "Residential"
  | "Institutional & Commercial"
  | "Civic & Landscape";

export type Project = {
  slug: string;
  status: "completed" | "ongoing";
  title: string; // full title as in the profile
  shortTitle: string;
  sector: Sector;
  location: string;
  state: string;
  client: string;
  pmc: string;
  builtUpArea?: string;
  maxHeight?: string;
  storeys?: string;
  /** INR lakhs: cost on completion (completed) or contract value (ongoing). */
  valueLakhs: number;
  completedOn?: string; // ISO date
  startDate?: string; // ISO date
  stipulatedCompletion?: string; // ISO date
  likelyCompletion?: string; // ISO date
  featured?: boolean;
  /** Optional captions, in the same order as the extracted photos. */
  imageCaptions?: string[];
  /** Profile page number, for traceability when checking against the PDF. */
  profilePage: number;
};

const completed: Omit<Project, "status">[] = [
  {
    slug: "svsu-academic-blocks-palwal",
    title:
      "Construction of Academic Blocks, Center of Excellence & Library Building for Shri Vishwakarma Skill University at Palwal, Haryana.",
    shortTitle: "Shri Vishwakarma Skill University — Academic Blocks",
    sector: "Education",
    location: "SVSU, Palwal",
    state: "Haryana",
    client: "SVSU",
    pmc: "Ircon ISL",
    completedOn: "2024-12-31",
    builtUpArea: "35,900.00 sqm",
    maxHeight: "26.65 Mtr",
    storeys: "G+5 = 06 Storeys",
    valueLakhs: 12495.24,
    featured: true,
    profilePage: 8,
  },
  {
    slug: "rlbcau-academic-block-jhansi",
    title: "Construction of Academic Block Building Under Package IV for RLBCAU, Jhansi, UP.",
    shortTitle: "RLBCAU Academic Block, Jhansi",
    sector: "Education",
    location: "RLBCAU, Jhansi",
    state: "Uttar Pradesh",
    client: "RLBCAU",
    pmc: "NBCC (I) Ltd.",
    completedOn: "2020-03-31",
    builtUpArea: "19,500.00 sqm",
    maxHeight: "25.50 Mtr",
    storeys: "G+5 = 06 Storeys",
    valueLakhs: 9646.82,
    profilePage: 9,
  },
  {
    slug: "iiit-nagpur-campus",
    title:
      "Construction of IIIT Nagpur Campus at Nagpur on Design, Engineering, Procurement and Construction (EPC) basis.",
    shortTitle: "IIIT Nagpur Campus",
    sector: "Education",
    location: "IIIT, Nagpur",
    state: "Maharashtra",
    client: "IIIT, Nagpur",
    pmc: "NBCC (I) Ltd.",
    completedOn: "2022-07-31",
    builtUpArea: "34,226.00 sqm",
    maxHeight: "37.80 Mtr",
    storeys: "G+11 = 12 Storeys",
    valueLakhs: 9539.77,
    profilePage: 10,
  },
  {
    slug: "iit-bhubaneswar-hostels",
    title:
      "Infrastructure Development & Construction of Boys & Girls Hostels of IIT BBS at Argul Campus, Bhubaneswar, Odisha.",
    shortTitle: "IIT Bhubaneswar — Boys & Girls Hostels",
    sector: "Education",
    location: "BBS, Odisha",
    state: "Odisha",
    client: "IIT BBS, Odisha",
    pmc: "NBCC (I) Ltd.",
    completedOn: "2020-01-31",
    builtUpArea: "24,820 sqm (Boys Hostel) · 15,212 sqm (Girls Hostel)",
    maxHeight: "26.00 Mtr (Boys Hostel) · 22.90 Mtr (Girls Hostel)",
    storeys: "G+7 = 8 Storeys (Boys Hostel) · G+6 = 7 Storeys (Girls Hostel)",
    valueLakhs: 9109.0,
    featured: true,
    imageCaptions: ["Girls’ Hostel", "Boys’ Hostel"],
    profilePage: 11,
  },
  {
    slug: "nit-delhi-admin-block",
    title: "Construction of Administrative Block for NIT Delhi, at Narela, Delhi.",
    shortTitle: "NIT Delhi — Administrative Block",
    sector: "Education",
    location: "NIT Narela, Delhi",
    state: "Delhi",
    client: "NIT, Delhi",
    pmc: "NBCC (I) Ltd.",
    completedOn: "2022-04-07",
    builtUpArea: "17,500.00 sqm",
    maxHeight: "23.85 Mtr",
    storeys: "B+G+5 = 07 Storeys",
    valueLakhs: 6504.15,
    profilePage: 12,
  },
  {
    slug: "iis-kanpur",
    title:
      "Construction of Indian Institute of Skills at Kanpur on Design, Engineering, Procurement and Construction (EPC) basis.",
    shortTitle: "Indian Institute of Skills, Kanpur",
    sector: "Education",
    location: "Kanpur, UP",
    state: "Uttar Pradesh",
    client: "IIS, Kanpur",
    pmc: "NBCC (I) Ltd.",
    completedOn: "2024-02-29",
    builtUpArea: "16,251.52 sqm",
    maxHeight: "17.10 Mtr",
    storeys: "G+2 = 03 Storeys",
    valueLakhs: 5543.58,
    profilePage: 13,
  },
  {
    slug: "ravindra-bhawan-goa",
    title: "Construction of Ravindra Bhawan at Canacona Goa.",
    shortTitle: "Ravindra Bhawan, Canacona",
    sector: "Civic & Landscape",
    location: "Canacona, Goa",
    state: "Goa",
    client: "GSIDC Ltd.",
    pmc: "UCJ Architecture and Environment",
    completedOn: "2024-11-14",
    builtUpArea: "10,571.70 sqm",
    maxHeight: "18.40 Mtr",
    storeys: "B+G+2 = 04 Storeys",
    valueLakhs: 5805.97,
    featured: true,
    profilePage: 14,
  },
  {
    slug: "iit-delhi-sathi-sonipat",
    title:
      "Construction of SATHI Building at IIT Delhi Extended Campus, Sonipat (Kundli), Haryana.",
    shortTitle: "SATHI Building, IIT Delhi Extended Campus",
    sector: "Education",
    location: "Kundli, HR",
    state: "Haryana",
    client: "IIT, Delhi",
    pmc: "NBCC (I) Ltd.",
    completedOn: "2024-10-15",
    maxHeight: "24.10 Mtr",
    storeys: "2B+G+4 = 07 Storeys",
    valueLakhs: 5564.55,
    profilePage: 15,
  },
  {
    slug: "urban-forest-jajpur",
    title: "Development of urban forest in KNDA area under Vyasanagar Municipality.",
    shortTitle: "Urban Forest, KNDA Area, Vyasanagar",
    sector: "Civic & Landscape",
    location: "Jajpur, Odisha",
    state: "Odisha",
    client: "DMF, Jajpur",
    pmc: "NBCC (I) Ltd.",
    completedOn: "2025-03-31",
    valueLakhs: 6603.87,
    profilePage: 16,
  },
  {
    slug: "science-academy-jajpur",
    title: "Development of Science Academy in Panikoili Area, Jajpur, Odisha.",
    shortTitle: "Science Academy, Panikoili",
    sector: "Education",
    location: "Jajpur, Odisha",
    state: "Odisha",
    client: "DMF, Jajpur",
    pmc: "NBCC (I) Ltd.",
    completedOn: "2025-05-31",
    builtUpArea: "12,379.29 sqm",
    maxHeight: "12.00 Mtr",
    storeys: "G+1 = 02 Storeys",
    valueLakhs: 11017.07,
    featured: true,
    profilePage: 17,
  },
  {
    slug: "rbi-office-naya-raipur",
    title:
      "Construction of office building for RBI at Atal Nagar (Naya Raipur) Chhattisgarh.",
    shortTitle: "Reserve Bank of India Office, Naya Raipur",
    sector: "Institutional & Commercial",
    location: "Naya Raipur, CH",
    state: "Chhattisgarh",
    client: "RBI",
    pmc: "CPWD",
    completedOn: "2025-09-15",
    builtUpArea: "11,000.00 sqm",
    maxHeight: "14.55 Mtr",
    storeys: "B+G+1 = 03 Storeys",
    valueLakhs: 9229.43,
    featured: true,
    profilePage: 18,
  },
  {
    slug: "kv-new-tehri",
    title: "Construction of Kendriya Vidyalaya Schools (KVS) at New Tehri Town, Uttarakhand.",
    shortTitle: "Kendriya Vidyalaya, New Tehri Town",
    sector: "Education",
    location: "New Tehri Town, UK",
    state: "Uttarakhand",
    client: "KVS",
    pmc: "NPCC",
    completedOn: "2026-09-10",
    builtUpArea: "6489.11 sqm",
    maxHeight: "14.40 Mtr",
    storeys: "G+3 = 04 Storeys",
    valueLakhs: 3854.43,
    profilePage: 19,
  },
  {
    slug: "critical-care-blocks-himachal",
    title:
      "Construction of 50 Bedded Critical Care Blocks (CCB) at Tanda, Mandi, Shimla and Una, Himachal Pradesh.",
    shortTitle: "50-Bedded Critical Care Blocks, Himachal Pradesh",
    sector: "Healthcare",
    location: "Himachal Pradesh",
    state: "Himachal Pradesh",
    client: "NHM",
    pmc: "HSCC Ltd.",
    completedOn: "2026-08-31",
    valueLakhs: 7670.05,
    profilePage: 20,
  },
  {
    slug: "iit-kharagpur-academic-tower",
    title:
      "Construction of Academic Tower (G+7) RCC framed Structure at IIT Kharagpur, West Bengal on EPC basis.",
    shortTitle: "IIT Kharagpur — Academic Tower",
    sector: "Education",
    location: "Kharagpur, WB",
    state: "West Bengal",
    client: "IIT, Kharagpur",
    pmc: "CPWD",
    completedOn: "2026-09-30",
    builtUpArea: "23,990.00 sqm",
    maxHeight: "31.20 Mtr",
    storeys: "G+7 = 08 Storeys",
    valueLakhs: 11112.5,
    profilePage: 21,
  },
];

const ongoing: Omit<Project, "status">[] = [
  {
    slug: "iocl-paradip-quarters",
    title:
      "Construction of G+8 Storied Quarters for IOCL Township of Paradip Refinery at Paradip, Odisha.",
    shortTitle: "IOCL Township Quarters, Paradip",
    sector: "Residential",
    location: "Paradip, Odisha",
    state: "Odisha",
    client: "IOCL",
    pmc: "IOCL",
    startDate: "2023-11-06",
    stipulatedCompletion: "2025-11-05",
    valueLakhs: 15397.1,
    profilePage: 23,
  },
  {
    slug: "gole-market-restoration",
    title:
      "Conservation & restoration of main Gole Market building as a museum and redevelopment of surrounding area including construction of Service Block & Subway.",
    shortTitle: "Gole Market — Museum Restoration",
    sector: "Civic & Landscape",
    location: "Gole Market, ND",
    state: "Delhi",
    client: "NDMC",
    pmc: "NDMC",
    startDate: "2023-10-06",
    stipulatedCompletion: "2025-10-05",
    valueLakhs: 2166.97,
    profilePage: 24,
  },
  {
    slug: "esic-hospital-kalol",
    title: "Construction of 150 Bedded Hospital for ESIC at Kalol, Gandhinagar, Gujarat on EPC basis.",
    shortTitle: "150-Bedded ESIC Hospital, Kalol",
    sector: "Healthcare",
    location: "Kalol, GJ",
    state: "Gujarat",
    client: "ESIC",
    pmc: "CPWD",
    startDate: "2023-10-05",
    stipulatedCompletion: "2025-10-04",
    valueLakhs: 12808.16,
    profilePage: 25,
  },
  {
    slug: "uniworld-cascades-kolkata",
    title:
      "Civil, Structure, Finishing, MEP Works, Lifts, External Development & External Services for Tower & Non-Tower Area at Cascades-Project, Uniworld City, Kolkata.",
    shortTitle: "Cascades, Uniworld City, Kolkata",
    sector: "Residential",
    location: "Kolkata, WB",
    state: "West Bengal",
    client: "Unitech Ltd.",
    pmc: "Unitech Ltd.",
    startDate: "2023-11-30",
    stipulatedCompletion: "2025-08-31",
    valueLakhs: 13437.96,
    profilePage: 26,
  },
  {
    slug: "esic-hospital-duburi",
    title:
      "Construction of 100 Bedded Hospital, 32 Nos. Staff Quarters for ESIC Hospital at Duburi, Jajpur, Odisha on EPC basis.",
    shortTitle: "100-Bedded ESIC Hospital, Duburi",
    sector: "Healthcare",
    location: "Duburi, Jajpur, OD",
    state: "Odisha",
    client: "ESIC",
    pmc: "CPWD",
    startDate: "2025-02-10",
    stipulatedCompletion: "2027-06-09",
    valueLakhs: 9957.23,
    featured: false,
    profilePage: 27,
  },
  {
    slug: "alder-grove-villas-gurugram",
    title:
      "Balance Internal Civil, Horticulture & MEP Works at Alder Grove Villas, Sector-71, Gurugram, Haryana.",
    shortTitle: "Alder Grove Villas, Gurugram",
    sector: "Residential",
    location: "Gurugram, HR",
    state: "Haryana",
    client: "Unitech Ltd.",
    pmc: "Unitech Ltd.",
    startDate: "2025-04-10",
    stipulatedCompletion: "2027-04-10",
    valueLakhs: 11484.41,
    profilePage: 28,
  },
  {
    slug: "espace-premier-gurugram",
    title: "Balance Civil & MEP Works at 'Espace Premier', Sector-71, Gurugram, Haryana.",
    shortTitle: "Espace Premier, Gurugram",
    sector: "Residential",
    location: "Gurugram, HR",
    state: "Haryana",
    client: "Unitech Ltd.",
    pmc: "Unitech Ltd.",
    startDate: "2025-04-10",
    stipulatedCompletion: "2027-04-10",
    likelyCompletion: "2027-04-10",
    valueLakhs: 8221.6,
    profilePage: 29,
  },
  {
    slug: "iim-nagpur-phase-2-3",
    title:
      "Composite works for construction of Stage-1 (Phase 2 & 3) of IIM Nagpur Campus at Mihan Nagpur on EPC basis.",
    shortTitle: "IIM Nagpur Campus — Stage 1, Phase 2 & 3",
    sector: "Education",
    location: "Nagpur, Maharashtra",
    state: "Maharashtra",
    client: "IIM Nagpur",
    pmc: "EIL",
    startDate: "2025-10-09",
    stipulatedCompletion: "2027-04-09",
    valueLakhs: 16105.59,
    featured: true,
    profilePage: 30,
  },
  {
    slug: "cuh-mahendergarh",
    title:
      "Development of the infrastructural facilities and other related works in campus of Central University of Haryana at Mahendergarh, Haryana on Design, Engineering, Procurement & construction (EPC) basis.",
    shortTitle: "Central University of Haryana, Mahendergarh",
    sector: "Education",
    location: "CUH, Mahendergarh, HR",
    state: "Haryana",
    client: "Central University of Haryana",
    pmc: "NBCC",
    startDate: "2025-12-02",
    stipulatedCompletion: "2027-06-02",
    valueLakhs: 15110.27,
    profilePage: 31,
  },
  {
    slug: "svsu-package-18-palwal",
    title:
      "Execution of balance works of Feeder School, Shopping Center, Community Center, Health Center, Guest House & External Development works for Shri Vishwakarma Skill University at Village Dudhola, District-Palwal, Haryana (Package-18).",
    shortTitle: "SVSU Palwal — Package 18",
    sector: "Education",
    location: "SVSU, Palwal, HR",
    state: "Haryana",
    client: "SVSU, Palwal",
    pmc: "IrconISL",
    startDate: "2026-01-23",
    stipulatedCompletion: "2026-07-23",
    valueLakhs: 4179.09,
    profilePage: 32,
  },
  {
    slug: "ghaziabad-sports-complex",
    title:
      "Survey, Design Engineering & Procurement of Construction of Sports Complex at Nagar Nigam Ghaziabad, Uttar Pradesh on EPC mode.",
    shortTitle: "Sports Complex, Nagar Nigam Ghaziabad",
    sector: "Civic & Landscape",
    location: "Ghaziabad, UP",
    state: "Uttar Pradesh",
    client: "Ghaziabad Jal Nigam",
    pmc: "C&DS UP Jal Nigam",
    startDate: "2026-02-12",
    stipulatedCompletion: "2027-08-12",
    valueLakhs: 7550.34,
    profilePage: 33,
  },
  {
    slug: "jnv-charai-deo-assam",
    title: "Construction of Permanent Campus of JNV at Charai Deo, Assam on EPC Mode-II Basis.",
    shortTitle: "Jawahar Navodaya Vidyalaya, Charai Deo",
    sector: "Education",
    location: "JNV, Charai Deo, Assam",
    state: "Assam",
    client: "JNV",
    pmc: "NBCC",
    startDate: "2026-03-16",
    stipulatedCompletion: "2027-09-16",
    valueLakhs: 5643.33,
    profilePage: 34,
  },
  {
    slug: "sarojini-nagar-pkg-viii-c",
    title:
      "Construction of NP Primary School DG Block, Barat Ghar, CGHS Dispensary-2, 3 and 4, Griha Kalyan Kendra, Suvidha Market, Anganwari including allied works on Design, Engineering, Procurement and Construction (EPC) basis at Sarojini Nagar (PKG-VIII C).",
    shortTitle: "Sarojini Nagar — Package VIII C",
    sector: "Institutional & Commercial",
    location: "Sarojini Nagar, New Delhi",
    state: "Delhi",
    client: "Ministry of Housing and Urban Affairs",
    pmc: "NBCC",
    startDate: "2026-03-30",
    stipulatedCompletion: "2027-09-30",
    valueLakhs: 5861.95,
    profilePage: 35,
  },
  {
    slug: "idbi-quarters-goregaon",
    title:
      "Planning, Design and Construction of Residential Quarters Including all Internal Civil, Electrical & Mechanical Services, Development Works etc. for IDBI at Siddarth Nagar, Goregaon (West), Mumbai in Engineering, Procurement and Construction (EPC) Mode-I.",
    shortTitle: "IDBI Residential Quarters, Goregaon (West)",
    sector: "Residential",
    location: "Goregaon (West), Mumbai",
    state: "Maharashtra",
    client: "IDBI Mumbai",
    pmc: "CPWD",
    startDate: "2026-04-16",
    stipulatedCompletion: "2029-10-15",
    valueLakhs: 12281.26,
    profilePage: 36,
  },
  {
    slug: "lawrence-school-concert-hall",
    title: "Construction of Concert Hall at the campus of the Lawrence School, Sanawar, Kasauli, Himachal Pradesh.",
    shortTitle: "Concert Hall, The Lawrence School, Sanawar",
    sector: "Education",
    location: "Kasauli, HP",
    state: "Himachal Pradesh",
    client: "Lawrence School",
    pmc: "Lawrence School",
    startDate: "2026-03-18",
    stipulatedCompletion: "2028-01-15",
    valueLakhs: 2348.92,
    profilePage: 37,
  },
  {
    slug: "dps-rk-puram-academic-block",
    title:
      "Construction of Additional Academic Block i/c All Civil, Electrical, Plumbing, Firefighting & HVAC works at Delhi Public School, RK Puram, Sector – 12, New Delhi.",
    shortTitle: "Delhi Public School, R.K. Puram — Academic Block",
    sector: "Education",
    location: "R.K. Puram, Delhi",
    state: "Delhi",
    client: "Delhi Public School",
    pmc: "Delhi Public School",
    startDate: "2026-10-16",
    stipulatedCompletion: "2027-04-15",
    valueLakhs: 8156.1,
    profilePage: 38,
  },
];

export const projects: Project[] = [
  ...completed.map((p) => ({ ...p, status: "completed" as const })),
  ...ongoing.map((p) => ({ ...p, status: "ongoing" as const })),
];

export const sectors: Sector[] = [
  "Education",
  "Healthcare",
  "Residential",
  "Institutional & Commercial",
  "Civic & Landscape",
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectImages(slug: string): string[] {
  return (imageMap as Record<string, string[]>)[slug] ?? [];
}

export const featuredProjects = projects.filter((p) => p.featured);

/** Project plus its cover photo (undefined until photos are supplied). */
export function withCover<T extends Project>(p: T): T & { image?: string } {
  return { ...p, image: getProjectImages(p.slug)[0] };
}
