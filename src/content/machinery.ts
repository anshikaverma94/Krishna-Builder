// Source: Business Profile pp.40–41 "Details of Plant & Machinery". Spelling kept as in the profile.

export type Machine = { no: number; name: string; qty: string; type: string };

export const machinery: Machine[] = [
  { no: 1, name: "Hydraulic Excavator (Poklane)", qty: "4", type: "KOBELCO, JCB" },
  { no: 2, name: "Farana Crane", qty: "2", type: "Escorts, ACE" },
  { no: 3, name: "Backhoe Loader", qty: "4", type: "MANITOU" },
  { no: 4, name: "Tower Crane", qty: "8", type: "ACE" },
  { no: 5, name: "Concrete batching plant", qty: "5", type: "30 M3" },
  { no: 6, name: "Concrete pump", qty: "8", type: "30 M3 / Hr" },
  { no: 7, name: "Concrete transit mixer", qty: "4", type: "7 M3" },
  { no: 8, name: "Concrete mixer with Hopper (diesel)", qty: "10", type: "0.20 M3" },
  { no: 9, name: "Concrete mixer with Hopper (electrical)", qty: "4", type: "0.20 M3" },
  { no: 10, name: "Tippers", qty: "6", type: "AMW" },
  { no: 11, name: "Builder’s hoist", qty: "8", type: "0.25 M3" },
  { no: 12, name: "Trucks", qty: "4", type: "TATA" },
  { no: 13, name: "Earth rammers", qty: "6", type: "—" },
  { no: 14, name: "M.S. Pipes for scaffolding", qty: "15,000", type: "40mm" },
  { no: 15, name: "Steel shuttering", qty: "8,600 Sqm.", type: "M.S Plate & Props" },
  { no: 16, name: "Steel scaffolding", qty: "20,000 Mtr.", type: "Caplock" },
  { no: 17, name: "Grinding/polishing machines", qty: "8", type: "Vertical Type" },
  { no: 18, name: "Diesel generators", qty: "8", type: "32 KVA to 125 KVA" },
];
