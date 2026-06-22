export type SystemSizeKey = "6.6" | "10" | "13";

export const CALCULATOR_SYSTEMS = {
  "6.6": {
    key: "6.6" as const,
    label: "6.6kW",
    panels: 18,
    cost: 6500,
    minRoof: 28,
    co2PerYear: 2.8,
    trees: 63,
    kw: 6.6,
  },
  "10": {
    key: "10" as const,
    label: "10kW",
    panels: 27,
    cost: 9500,
    minRoof: 42,
    co2PerYear: 4.2,
    trees: 95,
    kw: 10,
  },
  "13": {
    key: "13" as const,
    label: "13kW",
    panels: 36,
    cost: 11500,
    minRoof: 56,
    co2PerYear: 5.4,
    trees: 122,
    kw: 13,
  },
} as const;

const SIZE_ORDER: SystemSizeKey[] = ["6.6", "10", "13"];

export function getRecommendedSystem(
  monthlyBill: number,
  roofSpace: number
): SystemSizeKey {
  const fitting = SIZE_ORDER.filter(
    (size) => CALCULATOR_SYSTEMS[size].minRoof <= roofSpace
  );

  if (fitting.length === 0) return "6.6";

  const ideal: SystemSizeKey =
    monthlyBill < 220 ? "6.6" : monthlyBill < 400 ? "10" : "13";

  if (fitting.includes(ideal)) return ideal;

  const idealIndex = SIZE_ORDER.indexOf(ideal);
  for (let i = idealIndex; i >= 0; i--) {
    const size = SIZE_ORDER[i];
    if (fitting.includes(size)) return size;
  }

  return fitting[fitting.length - 1];
}

export function calculateSavings(monthlyBill: number, systemKey: SystemSizeKey) {
  const system = CALCULATOR_SYSTEMS[systemKey];
  const savingsRatio = Math.min(0.95, 0.72 + system.kw * 0.022);
  const monthlySavings = Math.round(monthlyBill * savingsRatio);
  const annualSavings = monthlySavings * 12;
  const paybackYears = Number((system.cost / annualSavings).toFixed(1));
  const total25Year = Math.round(annualSavings * 22.2);

  return {
    monthlySavings,
    annualSavings,
    paybackYears,
    total25Year,
    panels: system.panels,
    systemCost: system.cost,
    co2PerYear: system.co2PerYear,
    trees: system.trees,
  };
}

export function getRecommendationMessage(
  systemKey: SystemSizeKey,
  monthlyBill: number,
  roofSpace: number
): string {
  const system = CALCULATOR_SYSTEMS[systemKey];
  const ideal = getRecommendedSystem(monthlyBill, roofSpace);

  if (systemKey !== ideal) {
    return `Based on your ${roofSpace}m² roof space, a ${system.label} system is the largest option that fits safely while keeping strong returns.`;
  }

  if (systemKey === "6.6") {
    return "Based on your inputs, a 6.6kW system offers excellent value for moderate usage and smaller roof areas.";
  }

  if (systemKey === "10") {
    return "Based on your inputs, a 10kW system is optimal for maximum ROI and energy independence.";
  }

  return "Based on your inputs, a 13kW system is ideal for high consumption homes and larger roof capacity.";
}

export function formatCurrency(value: number): string {
  return `$${value.toLocaleString("en-AU")}`;
}
