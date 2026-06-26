export const SITE = {
  name: "Capital Solar Energy",
  url: "https://capitalsolarenergy.com.au",
  phone: "0413 801 445",
  phoneHref: "tel:+61413801445",
  email: "info@capitalsolarenergy.com.au",
  address: "46 Hoskins Street, Mitchell ACT 2911",
  addressShort: "Mitchell ACT",
  description:
    "Premium Tier-1 solar systems, smart battery storage, and energy-efficient heat pumps custom-designed for Canberra and Southern NSW homes.",
} as const;

export const HERO_SHOWCASE = {
  image: "/hero-solar-home.png",
  imageAlt: "Modern Canberra home with solar panels at sunset",
  cecBadge: "CEC Approved Retailer",
  familiesCount: "500+",
  familiesLabel: "happy Canberra families installed",
  savingsAmount: "$3,200",
  savingsLabel: "avg. annual savings per Canberra home",
  availability: "Canberra available now",
} as const;

export const TRUST_BADGES = [
  { label: "CEC Approved Retailer", icon: "shield-check" },
  { label: "100% Locally Owned", icon: "map-pin" },
  { label: "Licensed Electricians", icon: "zap" },
] as const;

export const TRUST_CARDS = [
  {
    title: "Flexible Finance Options",
    description:
      "Spread your investment with tailored payment plans designed for Canberra homeowners — no hidden fees, full transparency.",
    icon: "wallet",
  },
  {
    title: "Canberra Born & Bred",
    description:
      "Local team, local knowledge. We understand ACT building codes, grid requirements, and Canberra's unique climate.",
    icon: "home",
  },
  {
    title: "25-Year Performance Warranty",
    description:
      "Tier-1 panels backed by industry-leading performance guarantees — engineered to deliver decades of reliable generation.",
    icon: "award",
  },
  {
    title: "10-Year Workmanship Guarantee",
    description:
      "Every installation is performed by licensed electricians with a decade-long workmanship warranty for complete peace of mind.",
    icon: "wrench",
  },
] as const;

export const SAVINGS_SECTION = {
  beforeAmount: "$680",
  afterAmount: "$65",
  title: "Electricity Bills Won't Stop",
  titleHighlight: "Going Up.",
  description:
    "Canberra households are facing record electricity costs. A properly sized solar and battery system is the most effective way to take control of your energy spend.",
  features: [
    {
      text: "The ACT has some of the highest electricity rates in Australia — and they're climbing year after year.",
      icon: "trending",
    },
    {
      text: "Most Canberra families are paying $500–$1,200 per quarter on electricity alone.",
      icon: "dollar",
    },
    {
      text: "Solar + battery can cut your bills by 70–90% from day one — with payback in as little as 3–5 years.",
      icon: "battery",
    },
    {
      text: "Switching now locks in savings before the next price rise hits your household budget.",
      icon: "lock",
    },
  ],
  cta: "Calculate My Savings",
  footerNote:
    "Average Annual Savings: $1,800 – $4,500 per year for a typical Canberra household with a 6.6kW system + battery.",
} as const;

export const PACKAGE_SERVICE_OPTIONS = [
  { value: "", label: "Select a Package" },
  { value: "solar-panels-6-6kw", label: "Solar Panels 6.6kW" },
  { value: "solar-panels-10kw", label: "Solar Panels 10kW" },
  { value: "solar-panels-13kw", label: "Solar Panels 13kW" },
  { value: "sigenergy", label: "Sigenergy" },
  { value: "growatt", label: "Growatt" },
  { value: "sungrow", label: "Sungrow" },
  { value: "battery-solar-sigenergy", label: "Battery Solar Sigenergy" },
  { value: "battery-solar-growatt", label: "Battery Solar Growatt" },
  { value: "battery-solar-sungrow", label: "Battery Solar Sungrow" },
] as const;

export const SOLAR_PACKAGES = [
  {
    id: "small",
    name: "Small Home",
    size: "6.6kW",
    panels: "18 x 370 = 6,660W",
    headerColor: "bg-huglo-green",
    defaultService: "solar-panels-6-6kw",
    billMin: 1,
    billMax: 500,
    billHint: "Best for lower usage homes and smaller quarterly bills",
    details: [
      {
        title: "Solar Panels",
        items: [
          "18 X 370W = 6,660W of Solar Panels Power Output",
          "Jinko or Trina Solar Panels",
          "High Efficiency Solar Panels",
          "Canberra based solar installer",
          "25 Years of Panel Linear Output Warranty",
        ],
      },
      {
        title: "Solar Inverter",
        items: [
          "5kW Solis or Growatt Inverter",
          "High performance Inverter",
          "Proven Track Record",
          "Monitoring on APP",
        ],
      },
      {
        title: "Solar Installation",
        items: [
          "CEC approved retailer",
          "Licenced electricians",
          "Experienced installers",
        ],
      },
    ],
  },
  {
    id: "medium",
    name: "Medium Home",
    size: "10kW",
    panels: "27 x 370 = 9,990W",
    headerColor: "bg-[#1a2744]",
    defaultService: "solar-panels-10kw",
    billMin: 501,
    billMax: 950,
    billHint: "Ideal for average Canberra family electricity usage",
    details: [
      {
        title: "Solar Panels",
        items: [
          "27 X 370W = 9,990W of Solar Panels Power Output",
          "Jinko or Trina Solar Panels",
          "High Efficiency Solar Panels",
          "Canberra based solar installer",
          "25 Years of Panel Linear Output Warranty",
        ],
      },
      {
        title: "Solar Inverter",
        items: [
          "5kW Solis or Growatt Inverter",
          "High performance Inverter",
          "Proven Track Record",
          "Monitoring on APP",
        ],
      },
      {
        title: "Solar Installation",
        items: [
          "CEC approved retailer",
          "Licenced electricians",
          "Experienced installers",
        ],
      },
    ],
  },
  {
    id: "large",
    name: "Big Family Home",
    size: "13kW",
    panels: "36 x 370 = 13,320W",
    headerColor: "bg-huglo-gold",
    defaultService: "solar-panels-13kw",
    billMin: 951,
    billMax: null,
    billHint: "Perfect for large homes and high electricity consumption",
    details: [
      {
        title: "Solar Panels",
        items: [
          "36 X 370W = 13,320W of Solar Panels Power Output",
          "Jinko or Trina Solar Panels",
          "High Efficiency Solar Panels",
          "Canberra based solar installer",
          "25 Years of Panel Linear Output Warranty",
        ],
      },
      {
        title: "Solar Inverter",
        items: [
          "5kW Solis or Growatt Inverter",
          "High performance Inverter",
          "Proven Track Record",
          "Monitoring on APP",
        ],
      },
      {
        title: "Solar Installation",
        items: [
          "CEC approved retailer",
          "Licenced electricians",
          "Experienced installers",
        ],
      },
    ],
  },
] as const;

export const PARTNER_LOGOS = [
  { name: "Solis Inverters", src: "/partners/solis.png" },
  { name: "Jinko Solar", src: "/partners/jinko.png" },
  { name: "SolarEdge", src: "/partners/solaredge.png" },
  { name: "SunPower", src: "/partners/sunpower.png" },
  { name: "Trina Solar", src: "/partners/trina.png" },
  { name: "Fronius", src: "/partners/fronius.png" },
  { name: "Growatt", src: "/partners/growatt.png" },
  { name: "SMA", src: "/partners/sma.png" },
  { name: "Solax Power", src: "/partners/solax.png" },
] as const;

export const SOLAR_PANELS = [
  {
    id: "jinko",
    name: "Jinko Tiger Neo",
    brand: "Jinko Solar",
    efficiency: "22.5%",
    warranty: "25 years",
    highlight: "N-type TOPCon technology",
    description:
      "Industry-leading N-type cell technology delivering exceptional efficiency and low degradation rates — ideal for Canberra's high-UV environment.",
  },
  {
    id: "trina",
    name: "Trina Vertex S+",
    brand: "Trina Solar",
    efficiency: "22.3%",
    warranty: "25 years",
    highlight: "Compact high-density design",
    description:
      "Premium compact modules maximising roof space utilisation with superior shade tolerance and exceptional build quality.",
  },
] as const;

export const INVERTERS = [
  {
    id: "sungrow",
    name: "Sungrow Hybrid Inverter",
    brand: "Sungrow",
    capacity: "5–10 kW",
    highlight: "Battery-ready hybrid",
    description:
      "Smart hybrid inverter with seamless battery integration, real-time monitoring, and exceptional conversion efficiency.",
  },
  {
    id: "fronius",
    name: "Fronius Primo / Symo",
    brand: "Fronius",
    capacity: "3–15 kW",
    highlight: "Austrian engineering",
    description:
      "Premium Austrian-engineered inverters renowned for reliability, smart grid features, and industry-leading service support.",
  },
] as const;

export const BATTERIES = [
  {
    id: "sigenergy",
    name: "Sigenergy SigenStor",
    brand: "Sigenergy",
    capacity: "5–48 kWh",
    highlight: "Modular scalability",
    description:
      "Next-generation modular battery system with AI-powered energy management and flexible capacity expansion.",
  },
  {
    id: "sungrow",
    name: "Sungrow SBR Battery Series",
    brand: "Sungrow",
    capacity: "9.6–25.6 kWh",
    highlight: "10-year warranty",
    description:
      "Premium modular LiFePO₄ storage with 100% usable energy, expandable design, and one of the strongest warranties in the market.",
  },
] as const;

export const SERVICES = [
  {
    id: "solar-pv",
    title: "Solar PV Installation",
    description:
      "Custom-engineered solar systems using Tier-1 panels and premium inverters — designed for maximum generation on your specific roof.",
    icon: "sun",
    href: "/solar",
  },
  {
    id: "battery",
    title: "Smart Battery Storage",
    description:
      "Store excess solar energy and power your home through outages. Sigenergy, Sungrow, GoodWe and FoxESS systems available.",
    icon: "battery",
    href: "/battery",
  },
  {
    id: "heat-pump",
    title: "Hot Water Heat Pumps",
    description:
      "Energy-efficient hot water systems that slash your electricity bills — eligible for ACT government rebates.",
    icon: "thermometer",
    href: "/locations/heat-pump-canberra",
  },
] as const;

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Local Consultation",
    description:
      "We visit your property, assess your roof, review your energy usage, and discuss your goals — all at no cost.",
  },
  {
    step: "02",
    title: "Engineering Design",
    description:
      "Our engineers create a custom system design optimised for your roof orientation, shading, and consumption patterns.",
  },
  {
    step: "03",
    title: "Authority Approvals",
    description:
      "We handle all ACT grid connection applications, meter upgrades, and regulatory compliance on your behalf.",
  },
  {
    step: "04",
    title: "Professional Installation",
    description:
      "Licensed electricians install your system to the highest standards — clean, efficient, and fully compliant.",
  },
  {
    step: "05",
    title: "Grid Commissioning",
    description:
      "System testing, grid connection activation, and monitoring setup — you're generating clean energy from day one.",
  },
  {
    step: "06",
    title: "Lifetime Support",
    description:
      "Ongoing monitoring, maintenance, and support. We're your local solar partner for the life of your system.",
  },
] as const;

export const SERVICE_REGIONS = [
  "Canberra CBD",
  "Belconnen",
  "Gungahlin",
  "Tuggeranong",
  "Woden Valley",
  "Queanbeyan",
  "Yass",
  "Goulburn",
  "Southern NSW",
] as const;

export const TESTIMONIALS = [
  {
    name: "Sarah & Michael T.",
    location: "Belconnen, ACT",
    rating: 5,
    text: "Capital Solar Energy transformed our home. Our quarterly bill dropped from $850 to under $120. The team was professional, transparent, and the installation was flawless.",
    savings: "86% bill reduction",
    system: "10kW + Sigenergy Battery",
  },
  {
    name: "David R.",
    location: "Gungahlin, ACT",
    rating: 5,
    text: "From the initial consultation to grid connection, everything was handled seamlessly. They explained every detail and the system has exceeded our generation estimates.",
    savings: "92% bill reduction",
    system: "6.6kW Solar System",
  },
  {
    name: "Jennifer & Paul K.",
    location: "Queanbeyan, NSW",
    rating: 5,
    text: "We compared three companies and Capital Solar offered the best value with genuine Tier-1 components. The workmanship guarantee gave us real confidence.",
    savings: "78% bill reduction",
    system: "13kW + Sigenergy Battery",
  },
  {
    name: "Andrew M.",
    location: "Woden Valley, ACT",
    rating: 5,
    text: "Outstanding service from start to finish. The installers were punctual, tidy, and clearly experienced. Our monitoring app shows we're generating more than projected.",
    savings: "81% bill reduction",
    system: "10kW Solar System",
  },
] as const;

export const FAQS = [
  {
    question: "How much does solar installation cost in Canberra?",
    answer:
      "Solar installation costs in Canberra typically range from $4,500 to $15,000+ depending on system size, panel quality, and battery inclusion. A quality 6.6kW system starts around $5,500 after STC rebates. We provide transparent, itemised quotes with no hidden fees.",
  },
  {
    question: "How long does solar installation take in ACT?",
    answer:
      "Most residential installations are completed in 1–2 days. The full process from consultation to grid connection typically takes 4–8 weeks, including ACT grid approval and meter upgrade scheduling.",
  },
  {
    question: "Are solar panels worth it in Canberra?",
    answer:
      "Absolutely. Canberra receives excellent solar irradiance — averaging 5.5+ peak sun hours daily. Combined with rising electricity prices and generous STC rebates, most systems pay for themselves within 3–5 years.",
  },
  {
    question: "What battery storage options do you offer?",
    answer:
      "We install Sigenergy SigenStor, Sungrow SBR, GoodWe ESA and FoxESS battery systems. All offer smart energy management, backup power capability, and seamless integration with your solar system.",
  },
  {
    question: "Do you handle ACT grid connection applications?",
    answer:
      "Yes. We manage the entire process including Evoenergy grid connection applications, meter upgrades, and all regulatory compliance — you don't need to deal with any paperwork.",
  },
  {
    question: "What warranty do you provide?",
    answer:
      "We provide a 10-year workmanship warranty on all installations, plus 25-year performance warranties on Tier-1 panels and manufacturer warranties on inverters and batteries.",
  },
  {
    question: "Can I get a rebate for solar in the ACT?",
    answer:
      "Yes. Federal STC (Small-scale Technology Certificate) rebates significantly reduce upfront costs. ACT residents may also qualify for additional energy efficiency rebates for heat pumps and battery systems.",
  },
  {
    question: "Do you service areas outside Canberra?",
    answer:
      "Yes. We service Canberra, Queanbeyan, Yass, Goulburn, and broader Southern NSW. Contact us to confirm service availability for your postcode.",
  },
] as const;

export const LOCATION_PAGES = [
  {
    slug: "solar-canberra",
    title: "Solar Panels Canberra",
    headline: "Premium Solar Installation in Canberra",
    description:
      "Expert solar panel installation for Canberra homes and businesses. Tier-1 systems, CEC approved, locally installed.",
    keywords: ["solar canberra", "solar panels canberra", "solar installation canberra"],
  },
  {
    slug: "solar-installation-canberra",
    title: "Solar Installation Canberra",
    headline: "Professional Solar Installation Canberra ACT",
    description:
      "Licensed electricians delivering premium solar installations across all Canberra districts with full ACT compliance.",
    keywords: ["solar installation canberra", "solar installer canberra act"],
  },
  {
    slug: "battery-storage-canberra",
    title: "Battery Storage Canberra",
    headline: "Smart Battery Storage Canberra",
    description:
      "Sigenergy, Sungrow, GoodWe and FoxESS battery systems for Canberra homes. Store solar energy and power through outages.",
    keywords: ["battery storage canberra", "home battery canberra", "sigenergy battery canberra"],
  },
  {
    slug: "heat-pump-canberra",
    title: "Heat Pump Canberra",
    headline: "Hot Water Heat Pumps Canberra",
    description:
      "Energy-efficient hot water heat pumps for Canberra homes. Slash hot water costs with ACT rebate eligibility.",
    keywords: ["heat pump canberra", "hot water heat pump act"],
  },
  {
    slug: "solar-panels-act",
    title: "Solar Panels ACT",
    headline: "Solar Panels for ACT Homes",
    description:
      "Premium solar panel systems designed for ACT conditions. CEC approved retailer with local Canberra expertise.",
    keywords: ["solar panels act", "solar act", "solar power act"],
  },
] as const;

export const STATS = [
  { value: "500+", label: "Projects Completed" },
  { value: "15+", label: "Years Experience" },
  { value: "4.9", label: "Customer Rating" },
  { value: "98%", label: "Client Satisfaction" },
] as const;
