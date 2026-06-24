import {
  FAQS,
  SITE,
  SOLAR_PACKAGES,
  PROCESS_STEPS,
  SERVICES,
  TESTIMONIALS,
  STATS,
} from "@/lib/constants";
import {
  ACT_SHS_SCHEME,
  NSW_HES_SCHEME,
  BATTERY_PRODUCTS,
} from "@/lib/page-content";

export const CHAT_QUICK_ACTIONS = [
  { id: "savings", label: "💰 Calculate Savings" },
  { id: "rebates", label: "🎁 Rebates & Loans" },
  { id: "products", label: "⚡ Products" },
  { id: "batteries", label: "🔋 Batteries" },
  { id: "quote", label: "📋 Free Quote" },
] as const;

export const CHAT_WELCOME_MESSAGE = `G'day! I'm the Capital Solar Energy assistant — here to help Canberra and Southern NSW homeowners make smart solar decisions.

I can walk you through:
✓ System sizing & savings estimates
✓ ACT & NSW government loan programs
✓ Battery storage options (Tesla, Sigenergy, Sungrow & more)
✓ Our installation process & warranties

What would you like to know? Feel free to ask anything — no sales pressure, just honest advice from your local Mitchell-based team.`;

export type QuickActionId = (typeof CHAT_QUICK_ACTIONS)[number]["id"];

function packagesSummary(): string {
  return SOLAR_PACKAGES.map(
    (pkg) =>
      `• **${pkg.name} (${pkg.size})** — ${pkg.panels}, ideal for quarterly bills ${pkg.billMax ? `$${pkg.billMin}–$${pkg.billMax}` : `$${pkg.billMin}+`}`
  ).join("\n");
}

function batterySummary(): string {
  return BATTERY_PRODUCTS.map(
    (b) => `• **${b.brand} ${b.name}** — ${b.features[0]?.title ?? "Home storage"}`
  ).join("\n");
}

const QUICK_RESPONSES: Record<QuickActionId, string> = {
  savings: `Great question — this is what most Canberra families ask us first.

Based on real installs across the ACT, households typically save **70–90%** on electricity after going solar:

• **6.6kW** — from ~$6,500 after STCs, saves ~$1,800–$2,400/year
• **10kW** — from ~$9,500, saves ~$2,800–$3,400/year
• **13kW** — from ~$11,500, saves ~$3,500–$4,500/year

Add a battery and evening peak usage drops even further. One of our Belconnen customers (Sarah & Michael) cut their quarterly bill from $850 to under $120 with a 10kW + Powerwall 3 system.

Try our **AI Calculator** on this page for a personalised estimate — or I can help you pick the right size if you tell me your typical quarterly bill.`,

  rebates: `Yes — there are some excellent incentives right now for Canberra and NSW homeowners:

**Federal STC Rebate**
Small-scale Technology Certificates reduce upfront solar costs by **$2,000–$4,000+** depending on system size. We deduct STCs directly from your quote — no chasing paperwork yourself.

**ACT Sustainable Household Scheme (SHS)**
• **3% interest** loans from $2,000 up to **$20,000** (from 1 July 2026)
• Up to **10 years** repayment, **$0 fees**, early repay anytime
• Covers batteries, heat pumps, EV chargers & more
• Official info: ACT climatechoices.act.gov.au

**NSW Home Energy Saver**
• **0% interest** loans up to **$15,000**
• Solar, batteries, insulation & more eligible
• Available for Queanbeyan, Yass, Goulburn & Southern NSW

Capital Solar handles STC paperwork on every quote. For government loans, we guide you through the full application.

Full details: **/government-loans** · Free quote: **/quote**`,

  products: `We design custom Tier-1 systems for Canberra's climate — not one-size-fits-all packages.

**Our Solar Range**
${packagesSummary()}

**Hardware we install:**
• **Panels:** Jinko Tiger Neo & Trina Vertex S+ (N-Type, 25-year warranty)
• **Inverters:** Solis, Growatt, SMA, Fronius & SolarEdge
• **Batteries:** Tesla Powerwall 3, Sigenergy SigenStor, Sungrow SBR, GoodWe ESA & FoxESS

Every system is installed by **ACT licensed electricians** — we're a **CEC Approved Retailer** based at **46 Hoskins Street, Mitchell ACT**.

Browse packages on this page or tell me your quarterly bill and I'll suggest a size.`,

  batteries: `Battery storage is one of our most popular upgrades — especially with ACT government loans and rising evening tariffs.

**Our Battery Lineup:**
${batterySummary()}

**Why add storage?**
Store cheap daytime solar and use it during expensive peak rates (typically 4–9pm). Plus whole-home backup during outages.

**Popular picks:**
• **Tesla Powerwall 3** — 13.5 kWh all-in-one, premium backup & monitoring
• **Sigenergy SigenStor** — modular 8–48 kWh, EV-ready, AI energy management
• **Sungrow SBR** — expandable LiFePO₄, 10-year warranty, great value

See full specs & photos: **/battery**
Finance via ACT SHS (3%) or NSW HES (0%): **/government-loans**`,

  quote: `Getting a quote from Capital Solar is completely **free and no-obligation** — here's how it works:

1. Visit **/quote** or call **${SITE.phone}**
2. Tell us about your home, roof, and energy usage
3. Our Mitchell team prepares a **custom itemised quote** within 24 hours
4. We explain every line item — panels, inverter, install, STC rebate, optional battery

No pushy sales calls. No hidden fees. Just honest advice from a **100% locally owned** Canberra business that's completed **500+ installs** with a **4.9★** rating.

Ready to start? **/quote**`,
};

export function getQuickActionResponse(actionId: QuickActionId): string {
  return QUICK_RESPONSES[actionId];
}

export function getBotResponse(input: string): string {
  const text = input.toLowerCase().trim();

  if (!text) {
    return "Go ahead and type your question — I'm here to help with solar sizing, savings, rebates, batteries, or getting a free quote from Capital Solar Energy.";
  }

  if (matches(text, ["thank", "thanks", "cheers", "appreciate"])) {
    return `You're welcome! If you have any more questions about solar, batteries, or government loans, I'm happy to help.

When you're ready, our team is at **${SITE.phone}** or you can request a free quote at **/quote**. Good luck with your solar journey! ☀️`;
  }

  if (matches(text, ["hello", "hi", "hey", "gday", "good morning", "good afternoon", "good evening"])) {
    return `G'day! Welcome to **${SITE.name}** — your local Canberra solar installer since 2018.

We've completed **${STATS[0].value} installations** across the ACT with a **${STATS[2].value}★** rating from real customers. Our team is based at **${SITE.address}**.

What can I help you with today? Savings estimates, battery options, government loans, or our installation process — just ask!`;
  }

  if (matches(text, ["quote", "free quote", "get started", "book", "consultation", "estimate"])) {
    return QUICK_RESPONSES.quote;
  }

  if (matches(text, ["act shs", "sustainable household", "shs", "brighte", "act loan", "act government loan"])) {
    return `The **ACT Sustainable Household Scheme (SHS)** is one of the best energy loan programs in Australia:

• **3% interest** — among the lowest rates for home upgrades
• Borrow **$2,000–$20,000** (cap increases to $20k from 1 July 2026)
• **10-year** repayment term, **$0 establishment fees**
• Bundle batteries, heat pumps, EV chargers & more in one loan
• Early repayment anytime with **no penalty**

**Eligible products:** battery storage, heat pump hot water, EV chargers, electric heating/cooling, insulation & installation costs.

**Note:** Solar panels alone aren't currently eligible for standard SHS loans (from 1 July 2025), but concession card holders may access zero-interest solar via the ACT Home Energy Support Program.

Capital Solar guides you through the full Brighte application. Full details: **/government-loans**
Official ACT page: ${ACT_SHS_SCHEME.officialLink}`;
  }

  if (matches(text, ["nsw hes", "home energy saver", "nsw loan", "nsw government", "zero interest", "interest free"])) {
    return `The **NSW Home Energy Saver Program** offers truly **0% interest** loans for energy upgrades:

• Up to **$15,000** interest-free
• **10-year** repayment term
• Households with combined income up to **$210,000** may qualify
• **Renters eligible** with landlord approval
• Up to **$4,000 discount** for low-income households & concession card holders

**Eligible upgrades:** solar systems, battery storage, reverse-cycle AC, insulation, EV chargers, switchboard upgrades & more.

We service **Queanbeyan, Yass, Goulburn** and broader Southern NSW — Capital Solar helps you navigate the application.

Full details: **/government-loans**
Official NSW page: ${NSW_HES_SCHEME.officialLink}`;
  }

  if (matches(text, ["government loan", "govt loan", "gov loan", "finance scheme", "plenti"])) {
    return QUICK_RESPONSES.rebates;
  }

  if (matches(text, ["tesla", "powerwall", "power wall"])) {
    const pw = BATTERY_PRODUCTS.find((b) => b.id === "tesla-powerwall-3");
    return pw
      ? `**${pw.brand} ${pw.name}** is our premium all-in-one battery pick:

• **13.5 kWh** storage — enough for most Canberra households overnight
• Integrated solar inverter — no separate box needed
• **Whole-home backup** during outages with Storm Watch
• DC-coupled for maximum solar efficiency
• Single-phase compatible

Ideal for: ${pw.idealFor}

See photos & full specs: **/battery**
Finance via ACT SHS (3% loan): **/government-loans**
Get a Powerwall quote: **/quote**`
      : QUICK_RESPONSES.batteries;
  }

  if (matches(text, ["sigenergy", "sigenstor", "sigen"])) {
    const sig = BATTERY_PRODUCTS.find((b) => b.id === "sigenergy-sigenstor");
    return sig
      ? `**${sig.brand} ${sig.name}** is our most versatile modular system:

• **8–48 kWh** expandable storage
• **5-in-1 design** — solar + battery + inverter + EV charger + grid management
• AI-driven energy optimisation
• DC & AC coupled, three-phase ready
• EV charging built-in

Ideal for: ${sig.idealFor}

One of our Queanbeyan customers (Jennifer & Paul) chose a 13kW + Sigenergy system and cut bills by 78%.

Full details: **/battery** · Quote: **/quote**`
      : QUICK_RESPONSES.batteries;
  }

  if (matches(text, ["sungrow", "sbr"])) {
    const sg = BATTERY_PRODUCTS.find((b) => b.id === "sungrow-sbr");
    return sg
      ? `**${sg.brand} ${sg.name}** offers premium storage with one of the strongest warranties:

• Modular design — expandable from **9.6 kWh to 25.6 kWh**
• **LiFePO₄** chemistry — safe, reliable, long-lasting
• **100% usable energy** with up to 97% round-trip efficiency
• **10-year warranty** — among the best in the market
• DC-coupled, single & three-phase compatible

Ideal for: ${sg.idealFor}

We also install Sungrow hybrid inverters for seamless integration.

See specs: **/battery** · Quote: **/quote**`
      : QUICK_RESPONSES.batteries;
  }

  if (matches(text, ["foxess", "fox ess", "fox"])) {
    const fox = BATTERY_PRODUCTS.find((b) => b.id === "foxess-ecs");
    return fox
      ? `**${fox.brand} ${fox.name}** is a cost-effective expandable option:

• Modular LiFePO₄ storage — residential & commercial scale
• **Plug & play** installation
• **6,000+ cycles** rated service life
• **90–100% depth of discharge** — maximum usable energy
• Integrates seamlessly with FoxESS hybrid inverters

Ideal for: ${fox.idealFor}

Full lineup: **/battery** · Quote: **/quote**`
      : QUICK_RESPONSES.batteries;
  }

  if (matches(text, ["goodwe", "good we", "esa"])) {
    const gw = BATTERY_PRODUCTS.find((b) => b.id === "goodwe-esa");
    return gw
      ? `**${gw.brand} ${gw.name}** is our best-value all-in-one storage:

• **8 kWh** capacity — great for daily household use
• Battery + hybrid inverter in **one unit**
• Backup-ready for essential circuits during outages
• Expandable for future needs
• DC & AC coupled, single-phase

Ideal for: ${gw.idealFor}

See all batteries: **/battery** · Quote: **/quote**`
      : QUICK_RESPONSES.batteries;
  }

  if (matches(text, ["battery", "batteries", "storage", "backup", "blackout", "power outage"])) {
    return QUICK_RESPONSES.batteries;
  }

  if (matches(text, ["calculator", "calculate", "savings", "save", "bill", "payback", "roi", "worth it"])) {
    return QUICK_RESPONSES.savings + "\n\nScroll to the **Calculator** section on this page for live estimates.";
  }

  if (matches(text, ["rebate", "stc", "incentive", "discount", "subsidy", "grant"])) {
    return QUICK_RESPONSES.rebates;
  }

  if (matches(text, ["review", "testimonial", "rating", "customer", "feedback"])) {
    const sample = TESTIMONIALS.slice(0, 2)
      .map((t) => `**${t.name}** (${t.location}) — "${t.text.slice(0, 120)}..." — *${t.savings}*`)
      .join("\n\n");
    return `Our customers speak for themselves — **${STATS[2].value}★** rating with **${STATS[3].value} satisfaction**:

${sample}

Read more reviews: **/reviews**
Want similar results? Start with a free quote: **/quote**`;
  }

  if (matches(text, ["product", "package", "panel", "inverter", "6.6", "10kw", "13kw", "tier", "jinko", "trina"])) {
    return QUICK_RESPONSES.products;
  }

  if (matches(text, ["finance", "financing", "payment plan", "loan", "pay monthly", "afford", "expensive", "cost", "price", "how much"])) {
    if (matches(text, ["cost", "price", "how much", "expensive", "afford"])) {
      const costFaq = FAQS.find((f) => f.question.includes("cost"));
      if (costFaq) {
        return `${costFaq.answer}

**Our packages after STC rebates:**
${packagesSummary()}

Every quote is **itemised and transparent** — no hidden fees. Finance options and government loans (ACT SHS 3%, NSW HES 0%) can make upgrades very affordable.

Get your personalised quote: **/quote**`;
      }
    }
    return `**${SITE.name}** offers several ways to make solar affordable:

• **Federal STC rebates** — $2,000–$4,000+ off upfront (we handle all paperwork)
• **ACT SHS loans** — 3% interest, up to $20,000, 10 years
• **NSW HES loans** — 0% interest, up to $15,000
• **Flexible payment plans** via Plenti & Brighte

Many customers find their **monthly savings offset a large portion** of loan repayments — especially with batteries storing cheap daytime solar.

Finance details: **/government-loans** · Free quote: **/quote**`;
  }

  if (matches(text, ["install", "installation", "process", "timeline", "how long", "steps", "evoenergy"])) {
    const steps = PROCESS_STEPS.map((s) => `${s.step}. **${s.title}** — ${s.description}`).join("\n");
    return `Here's exactly what happens when you choose Capital Solar — we manage everything:

${steps}

**Timeline:** Physical installation takes **1–2 days** on your roof. The full journey from first call to generating power is typically **4–8 weeks** (including Evoenergy grid approvals and meter upgrades).

We handle **all paperwork** — you won't need to contact the grid operator yourself. Our licensed electricians do clean, compliant work every time.

Ready to start? **/quote** or call **${SITE.phone}**.`;
  }

  if (matches(text, ["warranty", "guarantee", "workmanship"])) {
    return `**${SITE.name}** stands behind every install:

• **10-year workmanship guarantee** on all installations
• **25-year performance warranty** on Tier-1 Jinko & Trina panels
• Full **manufacturer warranties** on inverters & batteries (typically 10 years)

We're a **CEC Approved Retailer** — all work performed by **ACT licensed electricians** at our Mitchell workshop.

${FAQS.find((f) => f.question.includes("warranty"))?.answer ?? ""}`;
  }

  if (matches(text, ["canberra", "act", "area", "location", "service", "queanbeyan", "goulburn", "yass", "postcode", "mitchell"])) {
    return `**${SITE.name}** is proudly **100% locally owned** and based in Mitchell, ACT.

**We service:**
Canberra CBD, Belconnen, Gungahlin, Tuggeranong, Woden Valley, Queanbeyan, Yass, Goulburn & broader **Southern NSW**.

📍 **${SITE.address}**
📞 **${SITE.phone}**
✉️ **${SITE.email}**

Not sure if we cover your area? Call us or submit your postcode at **/quote** — we'll confirm within 24 hours.`;
  }

  if (matches(text, ["cec", "accredited", "licensed", "electrician", "trust", "reliable", "legit", "scam"])) {
    return `Great question — here's why Canberra families trust **${SITE.name}**:

✓ **CEC Approved Retailer** (Clean Energy Council accredited)
✓ **100% locally owned** — not a call centre or interstate subcontractor
✓ **ACT licensed electricians** on every job
✓ **${STATS[0].value}** completed installations · **${STATS[1].label}**
✓ **${STATS[2].value}★** customer rating · **${STATS[3].value}** client satisfaction
✓ Based at **${SITE.address}** — visit our Mitchell office anytime

We use only **Tier-1 hardware** (Jinko, Trina, Fronius, Tesla, Sigenergy) with transparent, itemised quotes. No hidden fees, ever.`;
  }

  if (matches(text, ["heat pump", "hot water", "hwhp"])) {
    const service = SERVICES.find((s) => s.id === "heat-pump");
    return service
      ? `**${service.title}**

${service.description}

Hot water typically accounts for **25–30%** of household energy use. A heat pump can cut that dramatically — and it's **eligible for ACT SHS government loans** (3% interest).

Learn more: **${service.href}** · Quote: **/quote**`
      : "We install energy-efficient hot water heat pumps eligible for ACT rebates. Visit **/locations/heat-pump-canberra** for details.";
  }

  if (matches(text, ["phone", "call", "contact", "email", "reach", "speak", "human", "person", "real"])) {
    return `Absolutely — our Canberra team is real people, not a bot!

📞 **${SITE.phone}** (call or text)
✉️ **${SITE.email}**
📍 **${SITE.address}**

**Office hours:** Mon–Fri 8am–5pm, Sat by appointment

Prefer online? Request a callback at **/quote** — we respond within **24 hours**, usually much sooner.

I'm an AI assistant, but everything I share reflects actual Capital Solar pricing, products, and policies. For complex roof assessments, our engineers will visit your property personally.`;
  }

  if (matches(text, ["partner", "brand", "fronius", "growatt", "sma", "solax", "solaredge", "sunpower"])) {
    return `We install **Tier-1 hardware** from proven global brands:

**Panels:** Jinko Tiger Neo, Trina Vertex S+
**Inverters:** Solis, Growatt, SMA, Fronius, SolarEdge, Sungrow
**Batteries:** Tesla, Sigenergy, Sungrow, GoodWe, FoxESS

Every component is selected for **Canberra's high-UV climate** and long-term reliability — not whatever's cheapest. See our **Our Proud Partners** section on this page.

Want a specific brand? Tell us in your quote request at **/quote** — we'll design around your preferences.`;
  }

  if (matches(text, ["winter", "cloud", "overcast", "cold", "snow", "performance"])) {
    return `Canberra winters are no problem for modern solar — here's why:

• We install **N-Type Jinko & Trina panels** that outperform older P-Type tech in low light and frosty mornings
• Canberra still averages **5.5+ peak sun hours** daily — excellent solar resource
• **Hybrid inverters** (Sungrow, Fronius) optimise generation even on overcast days
• **Battery storage** captures whatever your panels produce and powers your home through freezing nights

Our systems are specifically engineered for **Canberra's variable weather** — not generic interstate packages.

Curious about winter performance for your roof? **/quote** for a custom assessment.`;
  }

  if (matches(text, ["compare", "vs", "versus", "difference", "better", "which", "recommend", "best"])) {
    return `Happy to help you compare! Here's a quick guide based on what we see across Canberra installs:

**System size:**
• Quarterly bill **under $500** → 6.6kW usually sufficient
• **$500–$950** → 10kW is the sweet spot for most families
• **$950+** → 13kW+ with battery recommended

**Batteries:**
• **Tesla Powerwall 3** — premium all-in-one, best backup
• **Sigenergy SigenStor** — most expandable, EV-ready
• **Sungrow SBR** — best warranty, great mid-range value
• **GoodWe ESA** — budget-friendly all-in-one
• **FoxESS** — modular, cost-effective

Tell me your **quarterly bill** and whether you want **backup power** — I'll give you a more specific recommendation. Or get a custom design at **/quote**.`;
  }

  for (const faq of FAQS) {
    const keywords = faq.question.toLowerCase().split(/\s+/).filter((w) => w.length > 4);
    if (keywords.some((k) => text.includes(k))) {
      return faq.answer + `\n\nNeed more detail? Call **${SITE.phone}** or visit **/quote**.`;
    }
  }

  return `That's a great question! While I don't have a specific answer for that exact query, here's what I can help with as your **${SITE.name}** assistant:

• **System sizing** — tell me your quarterly bill
• **Savings & payback** estimates for Canberra
• **ACT & NSW government loans** (3% and 0% interest)
• **Battery options** — Tesla, Sigenergy, Sungrow & more
• **Installation process** & timelines
• **Free quotes** — **/quote**

Try asking something like: *"What's the ACT government loan?"*, *"Compare Tesla vs Sigenergy"*, or *"How much for a 10kW system?"*

Or speak directly with our Mitchell team: **${SITE.phone}**`;
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
