const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const TOKEN_KEY = "cse-admin-token";

export type QuoteStatus = "new" | "contacted" | "quoted" | "closed";
export type QuoteSource = "website" | "package";

export interface QuoteRecord {
  _id: string;
  fullName: string;
  phone: string;
  postcode?: string | null;
  electricityBill?: string | null;
  email?: string | null;
  service?: string | null;
  address?: string | null;
  message?: string | null;
  source: QuoteSource;
  billFileUrl?: string | null;
  billFileName?: string | null;
  status: QuoteStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AdminStats {
  total: number;
  website: number;
  package: number;
  byStatus: {
    new: number;
    contacted: number;
    quoted: number;
    closed: number;
  };
}

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string) {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}

async function adminFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAdminToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 401) {
    clearAdminToken();
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Request failed");
  }

  return res.json();
}

export async function adminLogin(password: string) {
  const res = await fetch(`${API_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");

  setAdminToken(data.token);
  return data.token as string;
}

export async function adminLogout() {
  try {
    await adminFetch("/api/admin/logout", { method: "POST" });
  } finally {
    clearAdminToken();
  }
}

export function fetchQuotes(params?: {
  source?: QuoteSource | "";
  status?: QuoteStatus | "";
}) {
  const search = new URLSearchParams();
  if (params?.source) search.set("source", params.source);
  if (params?.status) search.set("status", params.status);
  const query = search.toString();

  return adminFetch<QuoteRecord[]>(
    `/api/admin/quotes${query ? `?${query}` : ""}`
  );
}

export function fetchStats() {
  return adminFetch<AdminStats>("/api/admin/stats");
}

export function updateQuoteStatus(id: string, status: QuoteStatus) {
  return adminFetch<QuoteRecord>(`/api/admin/quotes/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export function deleteQuote(id: string) {
  return adminFetch<{ success: boolean }>(`/api/admin/quotes/${id}`, {
    method: "DELETE",
  });
}

export function getBillFileUrl(path: string | null | undefined) {
  if (!path) return null;
  return `${API_URL}${path}`;
}
