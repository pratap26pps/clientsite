import { FAQS, SITE, SOLAR_PACKAGES, PROCESS_STEPS, SERVICES } from "@/lib/constants";

export const CHAT_QUICK_ACTIONS = [
  { id: "savings", label: "💰 Calculate Savings" },
  { id: "rebates", label: "🎁 Rebates" },
  { id: "products", label: "⚡ Products" },
] as const;

export const CHAT_WELCOME_MESSAGE = `👋 Hi! I'm your AI Solar Assistant. I can help you with:

✓ System recommendations
✓ Savings calculations
✓ Product information
✓ Installation process
✓ Financing options

What would you like to know?`;

export type QuickActionId = (typeof CHAT_QUICK_ACTIONS)[number]["id"];

function packagesSummary(): string {
  return SOLAR_PACKAGES.map(
    (pkg) =>
      `• **${pkg.name} (${pkg.size})** — ${pkg.panels}, ideal for 3-month bills ${pkg.billMax ? `$${pkg.billMin}–$${pkg.billMax}` : `$${pkg.billMin}+`}`
  ).join("\n");
}

const QUICK_RESPONSES: Record<QuickActionId, string> = {
  savings: `Great question! Based on Canberra energy data, most households save **70–90%** on electricity bills after going solar.

Typical results with Capital Solar Energy:
• **6.6kW** — from ~$6,500, saves ~$1,800–$2,400/year
• **10kW** — from ~$9,500, saves ~$2,800–$3,400/year
• **13kW** — from ~$11,500, saves ~$3,500–$4,500/year

Use our **AI Calculator** on this page for a personalised estimate based on your bill and roof size — or get a free quote at **/quote**.`,

  rebates: `Yes — significant rebates are available for Canberra homeowners:

**Federal STC Rebate**
Small-scale Technology Certificates reduce upfront solar costs by **$2,000–$4,000+** depending on system size.

**ACT Rebates**
Additional energy efficiency rebates may apply for **battery storage** and **hot water heat pumps**.

Capital Solar Energy handles all STC paperwork — it's included in every quote with **no hidden fees**.

Want a rebate-inclusive quote? Visit **/quote** or call **${SITE.phone}**.`,

  products: `Capital Solar Energy installs premium Tier-1 systems for Canberra & Southern NSW:

**Solar Packages**
${packagesSummary()}

**Panels:** Jinko & Trina Tier-1
**Inverters:** Solis, Growatt, SMA, Fronius & SolarEdge
**Batteries:** Tesla Powerwall 3 & Sigenergy SigenStor
**Also:** Hot water heat pumps

All installs by **ACT licensed electricians** with **CEC Approved Retailer** accreditation.

Browse packages on this page or request a custom design at **/quote**.`,
};

export function getQuickActionResponse(actionId: QuickActionId): string {
  return QUICK_RESPONSES[actionId];
}

export function getBotResponse(input: string): string {
  const text = input.toLowerCase().trim();

  if (!text) {
    return "Please type a question and I'll help you with Capital Solar Energy services, savings, products, or getting a quote.";
  }

  if (matches(text, ["hello", "hi", "hey", "gday", "good morning", "good afternoon"])) {
    return `Hello! Welcome to **${SITE.name}** — Canberra's trusted solar installer since 2018.

We've completed **500+ installations** across the ACT with a **4.9★** rating. How can I help you today? Ask about savings, packages, rebates, installation, or request a quote.`;
  }

  if (matches(text, ["quote", "free quote", "get started", "book", "consultation"])) {
    return `Getting a quote is easy and **100% obligation-free**:

1. Visit **/quote** on this website
2. Share your details and energy usage
3. Receive a custom design within **24 hours**

Or call us directly: **${SITE.phone}**
Email: **${SITE.email}**

We serve Canberra, Queanbeyan, Yass, Goulburn & Southern NSW.`;
  }

  if (matches(text, ["calculator", "calculate", "savings", "save", "bill", "payback", "roi"])) {
    return QUICK_RESPONSES.savings + "\n\nScroll to the **Calculator** section on this page for live estimates.";
  }

  if (matches(text, ["rebate", "stc", "government", "incentive", "discount", "subsidy"])) {
    return QUICK_RESPONSES.rebates;
  }

  if (matches(text, ["product", "package", "panel", "inverter", "battery", "6.6", "10kw", "13kw", "tier"])) {
    return QUICK_RESPONSES.products;
  }

  if (matches(text, ["finance", "financing", "payment plan", "loan", "pay monthly", "interest"])) {
    return `**${SITE.name}** offers flexible finance options for Canberra homeowners:

• Tailored **payment plans** with transparent terms
• **No hidden fees** — full cost breakdown upfront
• Spread your investment while your system starts saving from day one

Many customers find monthly savings **offset a large portion** of repayments.

Request a finance-inclusive quote at **/quote** or call **${SITE.phone}**.`;
  }

  if (matches(text, ["install", "installation", "process", "timeline", "how long", "steps"])) {
    const steps = PROCESS_STEPS.map((s) => `${s.step}. ${s.title}`).join("\n");
    return `Our **6-step installation process** is fully managed by our Canberra team:

${steps}

**Timeline:** Installation takes **1–2 days**. Full process from consultation to grid connection is typically **4–8 weeks** (including Evoenergy approvals).

We handle all paperwork — you don't need to contact the grid operator.`;
  }

  if (matches(text, ["warranty", "guarantee", "workmanship"])) {
    return `**${SITE.name}** warranty coverage:

• **10-year workmanship guarantee** on all installations
• **25-year performance warranty** on Tier-1 solar panels
• Manufacturer warranties on inverters & batteries

We're a **CEC Approved Retailer** — all work by **ACT licensed electricians**.

${FAQS.find((f) => f.question.includes("warranty"))?.answer ?? ""}`;
  }

  if (matches(text, ["battery", "powerwall", "sigenergy", "storage", "backup"])) {
    return `We install premium home battery systems:

**Tesla Powerwall 3** — 13.5 kWh, integrated inverter, storm watch & backup power

**Sigenergy SigenStor** — 5–48 kWh modular system with AI energy management

Batteries store excess solar, cut bills further, and keep your home powered during outages.

Learn more: **/locations/battery-storage-canberra**
Get a quote: **/quote**`;
  }

  if (matches(text, ["cost", "price", "how much", "expensive", "afford"])) {
    return FAQS.find((f) => f.question.includes("cost"))?.answer ??
      `Solar in Canberra typically ranges from **$4,500–$15,000+** after rebates depending on size and battery inclusion.

Our packages:
${packagesSummary()}

Every quote is **itemised and transparent**. Get yours at **/quote**.`;
  }

  if (matches(text, ["canberra", "act", "area", "location", "service", "queanbeyan", "goulburn", "yass", "postcode"])) {
    return `**${SITE.name}** services:

Canberra CBD, Belconnen, Gungahlin, Tuggeranong, Woden Valley, Queanbeyan, Yass, Goulburn & broader **Southern NSW**.

📍 **${SITE.address}**
📞 **${SITE.phone}**

Not sure if we cover your area? Call us or submit your postcode at **/quote**.`;
  }

  if (matches(text, ["cec", "accredited", "licensed", "electrician", "trust", "reliable"])) {
    return `**${SITE.name}** credentials:

✓ **CEC Approved Retailer**
✓ **100% locally owned** Canberra business
✓ **ACT licensed electricians** on every job
✓ **500+** happy Canberra families installed
✓ **4.9★** customer rating · **98%** satisfaction

We're your local solar partner — not a call centre or out-of-town installer.`;
  }

  if (matches(text, ["heat pump", "hot water", "hwhp"])) {
    const service = SERVICES.find((s) => s.id === "heat-pump");
    return service
      ? `**${service.title}**\n\n${service.description}\n\nEligible for ACT government rebates. Learn more: **${service.href}**`
      : "We install energy-efficient hot water heat pumps eligible for ACT rebates. Visit **/locations/heat-pump-canberra** for details.";
  }

  if (matches(text, ["phone", "call", "contact", "email", "reach"])) {
    return `Contact **${SITE.name}**:

📞 **${SITE.phone}**
✉️ **${SITE.email}**
📍 **${SITE.address}**

Or request a callback via **/quote** — we respond within **24 hours**.`;
  }

  if (matches(text, ["partner", "brand", "jinko", "trina", "fronius", "growatt", "sma", "solax"])) {
    return `We install **Tier-1 hardware** from trusted global brands including Jinko, Trina, SolarEdge, SunPower, Fronius, Growatt, Solis, SMA & Solax Power.

Only premium components with proven track records — engineered for Canberra's high-UV climate. See our **Our Proud Partners** section on this page.`;
  }

  for (const faq of FAQS) {
    const keywords = faq.question.toLowerCase().split(/\s+/).filter((w) => w.length > 4);
    if (keywords.some((k) => text.includes(k))) {
      return faq.answer;
    }
  }

  return `Thanks for your question! I'm specialised in **${SITE.name}** services for Canberra & the ACT.

I can help with:
• **System sizing** (6.6kW, 10kW, 13kW packages)
• **Savings & payback** estimates
• **Rebates & STC discounts**
• **Installation process & timelines**
• **Batteries, panels & inverters**
• **Free quotes** — **/quote**

Try asking: *"How much can I save?"*, *"What rebates are available?"*, or *"What's the installation process?"*

Or call **${SITE.phone}** to speak with our Canberra team directly.`;
}

function matches(text: string, keywords: string[]): boolean {
  return keywords.some((k) => text.includes(k));
}

export function shouldScrollToCalculator(text: string): boolean {
  const lower = text.toLowerCase();
  return (
    lower.includes("calculator") ||
    lower.includes("calculate savings") ||
    lower === "savings"
  );
}

export function shouldScrollToPackages(text: string): boolean {
  const lower = text.toLowerCase();
  return lower.includes("package") || lower === "products";
}
