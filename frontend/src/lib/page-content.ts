export const SOLAR_PAGE = {
  hero: {
    eyebrow: "Premium Solar Systems",
    title: "Next-Generation Solar for Canberra Homes",
    description:
      "We deploy premium N-Type panels and smart hybrid inverters engineered to perform through Canberra winters, overcast days, and everything in between.",
  },
  education: {
    eyebrow: "Technology Education",
    title: "No Rigid Packages. Just Intelligent, Tailored Solutions.",
    description:
      "Every home consumes energy differently. We educate you on premium hardware components to build a system precisely tuned to your family's lifestyle and financial goals.",
  },
  tabs: {
    panels: {
      id: "panels" as const,
      label: "Solar Panels",
      eyebrow: "Next-Generation N-Type Technology",
      title: "High-Efficiency Solar Arrays",
      description:
        "We exclusively deploy premium Jinko Tiger Neo and Trina Vertex S+ solar modules utilising state-of-the-art N-Type cell technology. Unlike older P-Type panels, these systems perform exceptionally well during frosty, overcast Canberra winter mornings and offer much lower long-term degradation rates.",
      features: [
        "N-Type cell technology — superior low-light and winter performance",
        "Industry-leading efficiency up to 22.8% — more power per m²",
        "Extremely low degradation rate (<0.4% per year)",
        "25-year performance warranty as standard",
        "Half-cut cell design reduces power loss from shading",
        "Ideal for Canberra's variable weather patterns",
      ],
      image: "/products/solar-array.jpg",
    },
    inverters: {
      id: "inverters" as const,
      label: "Smart Inverters",
      eyebrow: "Smart Inverter Management",
      title: "The Brain of Your Home Energy System",
      description:
        "We pair your roof array with powerful, EV-ready hybrid inverters from Sungrow and Fronius. These serve as the 'brain' of your home, dynamically routing raw sunlight directly into your appliances first, reducing grid reliance instantly.",
      features: [
        "Sungrow SH series — world's #1 inverter brand by shipments",
        "Fronius GEN24 — ultra-reliable Austrian engineering",
        "EV-ready — direct vehicle charging integration",
        "Real-time monitoring via dedicated apps",
        "Seamless battery integration for future expansion",
        "Smart tariff management — automated energy optimisation",
      ],
      image: "/products/solar-panels.jpg",
    },
  },
} as const;

export type BatterySpec = {
  title: string;
  description: string;
};

export type BatteryTag = {
  label: string;
  color: "purple" | "pink" | "green" | "teal";
};

export type BatteryProduct = {
  id: string;
  brand: string;
  name: string;
  badge?: string;
  badgeIcon?: string;
  tags?: BatteryTag[];
  specs: BatterySpec[];
  features: { title: string; description: string }[];
  idealFor: string;
  image?: string;
};

export const BATTERY_COUPLING_SPECS: BatterySpec[] = [
  {
    title: "DC Coupled",
    description: "Direct solar-to-battery link for the highest charging efficiency",
  },
  {
    title: "AC Coupled",
    description: "Connects via your switchboard — ideal for retrofitting existing solar",
  },
  {
    title: "Single Phase",
    description: "Built for standard residential homes with single-phase power",
  },
  {
    title: "Three Phase",
    description: "Ready for larger homes and properties with 3-phase supply",
  },
];

export const BATTERY_PAGE = {
  hero: {
    eyebrow: "Smart Battery Storage",
    title: "Canberra Winter-Proof Storage Systems",
    description:
      "Store excess daylight energy to run your home through freezing Canberra nights. Blackout protection, tariff arbitrage, and lifetime local support included.",
    secondaryCta: { label: "View Finance", href: "/government-loans" },
  },
  advantage: {
    eyebrow: "The Blackout & Arbitrage Advantage",
    title: "Smart Storage That Pays for Itself",
    description:
      "Battery storage lets you store cheap daytime solar and use it during expensive peak evening rates — or when the grid goes down. With ACT government loans and federal battery incentives, there's never been a better time to add storage.",
    image: "/products/battery-advantage.jpg",
  },
  lineup: {
    eyebrow: "Battery Range",
    title: "Our Complete Battery Storage Lineup",
    description:
      "We work with the best storage ecosystems in the market — configured specifically for Canberra's climate and energy tariffs.",
  },
} as const;

export const BATTERY_PRODUCTS: BatteryProduct[] = [
  {
    id: "sigenergy-sigenstor",
    brand: "Sigenergy",
    name: "Sigenstor 5-in-1",
    badge: "Exceptional Quality",
    badgeIcon: "★",
    specs: BATTERY_COUPLING_SPECS,
    features: [
      {
        title: "8–48 kWh Storage",
        description: "Fully modular, expandable up to 48 kWh",
      },
      {
        title: "Smart Control",
        description: "AI-driven energy optimisation built-in",
      },
      {
        title: "EV Ready",
        description: "Integrated EV charging capability",
      },
      {
        title: "5-in-1 Design",
        description: "Solar + battery + inverter + EV charger + grid management",
      },
    ],
    idealFor:
      "Modern households wanting a smart, expandable ecosystem with EV charging.",
    image: "/products/sigenergy-sigenstor.png",
  },
  {
    id: "sungrow-sbr",
    brand: "Sungrow",
    name: "SBR Battery Series",
    badge: "Best Warranty",
    badgeIcon: "🏆",
    specs: BATTERY_COUPLING_SPECS,
    features: [
      {
        title: "Modular Design",
        description: "Expandable from 9.6 kWh to 25.6 kWh",
      },
      {
        title: "LiFePO₄ Technology",
        description: "Safe, reliable, long-lasting chemistry",
      },
      {
        title: "100% Usable Energy",
        description: "Maximise stored solar for household use",
      },
      {
        title: "High Efficiency",
        description: "Up to 97% round-trip efficiency",
      },
      {
        title: "10-Year Warranty",
        description: "One of the strongest in the market",
      },
    ],
    idealFor:
      "Homes looking for a premium, scalable battery solution with excellent performance and reliability.",
    image: "/products/sungrow-sbr.jpg",
  },
  {
    id: "goodwe-esa",
    brand: "GoodWe",
    name: "ESA 8.0kWh Module",
    badge: "Best Value",
    badgeIcon: "✓",
    specs: BATTERY_COUPLING_SPECS,
    features: [
      {
        title: "8 kWh Storage",
        description: "Ideal for daily household energy use",
      },
      {
        title: "All-in-One System",
        description: "Battery + hybrid inverter combined",
      },
      {
        title: "Backup Ready",
        description: "Essential power during outages",
      },
      {
        title: "Expandable Design",
        description: "Scalable for future energy needs",
      },
    ],
    idealFor:
      "Budget-conscious homeowners wanting reliable storage with room to grow.",
    image: "/products/goodwe-esa-8kwh.png",
  },
  {
    id: "foxess-ecs",
    brand: "FoxESS",
    name: "ECS / EP Battery Series",
    badge: "Expandable",
    badgeIcon: "＋",
    specs: BATTERY_COUPLING_SPECS,
    features: [
      {
        title: "Modular Storage System",
        description: "Easily expandable for residential and commercial use",
      },
      {
        title: "LiFePO₄ Technology",
        description: "Enhanced safety, long cycle life, thermal stability",
      },
      {
        title: "Plug & Play Installation",
        description: "Fast and straightforward setup",
      },
      {
        title: "Long Service Life",
        description: "Rated for over 6,000 charge/discharge cycles",
      },
      {
        title: "90–100% Depth of Discharge",
        description: "More usable energy from every kWh stored",
      },
    ],
    idealFor:
      "Homeowners seeking a cost-effective, expandable battery that integrates seamlessly with FoxESS hybrid inverters.",
    image: "/products/foxess-ecs.png",
  },
];

export const GOVERNMENT_LOANS_PAGE = {
  hero: {
    eyebrow: "Government Incentives",
    title: "Solar Grants & Government Loan Programs",
    description:
      "ACT and NSW homeowners can access significant government financial support to make solar, battery storage and home electrification far more affordable. Capital Solar helps you navigate and claim every available benefit.",
  },
  whyUs: {
    eyebrow: "Why Use Capital Solar",
    title: "We Make Government Loans Simple",
    description:
      "Our Mitchell-based team has helped hundreds of Canberra families navigate SHS and Brighte loan programs. We handle the paperwork so you can focus on saving.",
    cards: [
      {
        title: "Full Application Support",
        description:
          "We guide you through every step of the ACT SHS or NSW HES loan application — no guesswork.",
        icon: "📋",
      },
      {
        title: "STC Rebates Deducted Upfront",
        description:
          "All federal STC rebates are deducted directly from your quote price — you pay the net amount only.",
        icon: "💰",
      },
      {
        title: "Trusted Finance Partners",
        description:
          "We work with Brighte and government schemes to find you the best rate and terms.",
        icon: "🤝",
      },
      {
        title: "Local Canberra Experts",
        description:
          "We know the ACT and NSW schemes better than any interstate installer. Local knowledge matters.",
        icon: "📍",
      },
    ],
  },
} as const;

export const ACT_SHS_SCHEME = {
  id: "act" as const,
  label: "ACT Sustainable Household Scheme",
  shortLabel: "ACT SHS",
  announcement: {
    title: "New from 1 July 2026 — Loan Cap Increases to $20,000!",
    description:
      "The ACT Government has announced the maximum loan amount will increase from $15,000 to $20,000 for new applicants from 1 July 2026, making it easier for households to install larger battery systems and complete multiple energy upgrades at once.",
  },
  title: "Low-Interest Loans for Canberra Homeowners",
  description:
    "The ACT Government's Sustainable Household Scheme (SHS) helps eligible Canberra homeowners access affordable finance for energy-efficient home upgrades. The scheme is designed to reduce household energy bills, improve comfort, and support the transition to cleaner energy solutions.",
  benefits: [
    { title: "3% Low Interest Rate", description: "One of the lowest loan rates available for home energy upgrades." },
    { title: "$20,000 Maximum Loan", description: "Borrow from $2,000 up to $20,000 (from 1 July 2026) for eligible products." },
    { title: "10 Years Repayment Term", description: "Spread repayments over up to 10 years with no early repayment penalty." },
    { title: "$0 No Fees", description: "Zero establishment fees and no ongoing account-keeping costs." },
    { title: "Bundle Multiple Products", description: "Combine battery storage, heat pump, EV charger and more in one loan." },
    { title: "Early Repay Anytime", description: "Early repayments allowed at any time with no penalty fees." },
  ],
  eligibleProducts: [
    "Household battery storage systems",
    "EV charging infrastructure",
    "Electric heating and cooling systems",
    "Heat pump hot water systems",
    "Electric cooktops",
    "Electric vehicles",
    "Ceiling insulation",
    "Associated installation costs",
  ],
  whyUse: {
    title: "Why ACT Homeowners Are Using SHS",
    description:
      "The scheme has already helped thousands of Canberra households lower their energy costs. With the introduction of federal battery incentives and the increase to a $20,000 loan cap, battery storage and home electrification are becoming more affordable than ever.",
  },
  applySteps: [
    { step: 1, title: "Get Your Capital Solar Quote", description: "We provide an itemised quote with eligible products and loan amounts." },
    { step: 2, title: "Apply Through Brighte", description: "Submit your loan application with our guidance." },
    { step: 3, title: "Installation & Savings", description: "Our local team installs your system — repay over up to 10 years." },
  ],
  solarNote: {
    title: "Important: Solar Panels Not Currently Eligible",
    description:
      "As of 1 July 2025, solar panels are no longer eligible for a standard SHS loan. However, eligible concession card holders can still access zero-interest solar loans through the ACT Home Energy Support Program.",
  },
  officialLink: "https://www.climatechoices.act.gov.au/policy-programs/sustainable-household-scheme",
} as const;

export const NSW_HES_SCHEME = {
  id: "nsw" as const,
  label: "NSW Home Energy Saver",
  shortLabel: "NSW HES",
  banner:
    "NSW Home Energy Saver Program — Now Live! Zero-interest loans up to $15,000 for Queanbeyan, Yass, Goulburn and Southern NSW households.",
  title: "Zero-Interest Loans for NSW Households",
  description:
    "The NSW Home Energy Saver Program provides interest-free loans and discounts to help reduce the upfront cost of energy-saving upgrades. The program is expected to benefit over 32,000 households across NSW.",
  benefits: [
    { title: "0% Zero Interest", description: "Truly interest-free loans — no hidden costs or charges." },
    { title: "$15,000 Maximum Loan", description: "Up to $15,000 for eligible energy-saving upgrades." },
    { title: "10 Years Repayment Term", description: "Spread repayments over up to 10 years." },
    { title: "Up to $210K Income", description: "Available for eligible households with combined taxable income up to $210,000." },
    { title: "$4,000 Discount", description: "Discounts for eligible low-income households and concession card holders." },
    { title: "Renters Eligible", description: "Available for eligible renters with landlord approval." },
  ],
  eligibleUpgrades: [
    "Solar systems",
    "Battery storage",
    "Reverse-cycle air conditioning",
    "Insulation",
    "Ceiling fans",
    "Draught-proofing",
    "EV charging equipment",
    "Switchboard upgrades",
    "Other approved energy-saving improvements",
  ],
  officialLink: "https://www.energy.nsw.gov.au/households/rebates-grants-and-loans/home-energy-saver",
} as const;
