import { SOLAR_PACKAGES } from "@/lib/constants";

export function parseBillAmount(value: string): number | null {
  const cleaned = value.replace(/[^0-9.]/g, "");
  if (!cleaned) return null;

  const amount = Number.parseFloat(cleaned);
  if (!Number.isFinite(amount) || amount <= 0) return null;

  return amount;
}

export function getRecommendedPackageId(bill: number | null): string | null {
  if (bill === null) return null;

  for (const pkg of SOLAR_PACKAGES) {
    const aboveMin = bill >= pkg.billMin;
    const belowMax = pkg.billMax === null || bill <= pkg.billMax;

    if (aboveMin && belowMax) {
      return pkg.id;
    }
  }

  return SOLAR_PACKAGES[SOLAR_PACKAGES.length - 1]?.id ?? null;
}

export function formatBillRange(
  billMin: number,
  billMax: number | null
): string {
  if (billMax === null) {
    return `$${billMin.toLocaleString()}+`;
  }

  return `$${billMin.toLocaleString()} – $${billMax.toLocaleString()}`;
}
