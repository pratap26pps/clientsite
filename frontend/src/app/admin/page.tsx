"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  adminLogin,
  adminLogout,
  deleteQuote,
  fetchQuotes,
  fetchStats,
  getAdminToken,
  getBillFileUrl,
  updateQuoteStatus,
  type AdminStats,
  type QuoteRecord,
  type QuoteSource,
  type QuoteStatus,
} from "@/lib/admin-api";
import { cn } from "@/lib/utils";
import {
  FileText,
  Loader2,
  LogOut,
  Mail,
  Phone,
  RefreshCw,
  Shield,
  Trash2,
} from "lucide-react";

const STATUS_OPTIONS: { value: QuoteStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "quoted", label: "Quoted" },
  { value: "closed", label: "Closed" },
];

const STATUS_STYLES: Record<QuoteStatus, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-amber-100 text-amber-800",
  quoted: "bg-emerald-100 text-emerald-800",
  closed: "bg-gray-100 text-gray-600",
};

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function serviceLabel(service: string | null | undefined) {
  if (!service) return "—";
  return service
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [quotes, setQuotes] = useState<QuoteRecord[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [sourceFilter, setSourceFilter] = useState<QuoteSource | "">("");
  const [statusFilter, setStatusFilter] = useState<QuoteStatus | "">("");

  const loadData = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const [quotesData, statsData] = await Promise.all([
        fetchQuotes({ source: sourceFilter, status: statusFilter }),
        fetchStats(),
      ]);
      setQuotes(quotesData);
      setStats(statsData);
      setAuthed(true);
    } catch {
      setAuthed(false);
      setLoadError("Session expired or failed to load quotes.");
    } finally {
      setLoading(false);
      setCheckingAuth(false);
    }
  }, [sourceFilter, statusFilter]);

  useEffect(() => {
    if (getAdminToken()) {
      loadData();
    } else {
      setCheckingAuth(false);
    }
  }, [loadData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");
    try {
      await adminLogin(password);
      setPassword("");
      await loadData();
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await adminLogout();
    setAuthed(false);
    setQuotes([]);
    setStats(null);
  };

  const handleStatusChange = async (id: string, status: QuoteStatus) => {
    try {
      const updated = await updateQuoteStatus(id, status);
      setQuotes((prev) => prev.map((q) => (q._id === id ? updated : q)));
      const statsData = await fetchStats();
      setStats(statsData);
    } catch {
      setLoadError("Failed to update quote status.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this quote request permanently?")) return;
    try {
      await deleteQuote(id);
      setQuotes((prev) => prev.filter((q) => q._id !== id));
      const statsData = await fetchStats();
      setStats(statsData);
    } catch {
      setLoadError("Failed to delete quote.");
    }
  };

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-warm-white">
        <Loader2 className="size-8 animate-spin text-huglo-gold" />
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0f1e] px-4">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white p-8 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-full bg-huglo-gold/15">
              <Shield className="size-5 text-huglo-gold" />
            </div>
            <div>
              <h1 className="font-heading text-xl font-bold text-huglo-black">
                Admin Dashboard
              </h1>
              <p className="text-sm text-huglo-grey">Capital Solar Energy</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label htmlFor="admin-password" className="text-sm font-medium text-huglo-black">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 h-11 w-full rounded-xl border border-huglo-grey-light px-4 text-sm outline-none focus:border-huglo-gold focus:ring-2 focus:ring-huglo-gold/20"
                placeholder="Enter admin password"
                required
              />
            </div>

            {loginError && (
              <p className="text-sm text-red-600">{loginError}</p>
            )}

            <button
              type="submit"
              disabled={loggingIn}
              className="btn-huglo-gold btn-md w-full"
            >
              {loggingIn ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <Link
            href="/"
            className="mt-6 block text-center text-sm text-huglo-grey hover:text-huglo-black"
          >
            ← Back to website
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-white">
      <header className="border-b border-huglo-grey-light/60 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6">
          <div>
            <h1 className="font-heading text-xl font-bold text-huglo-black sm:text-2xl">
              Quote Requests
            </h1>
            <p className="text-sm text-huglo-grey">
              Manage website & package quote submissions
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={loadData}
              disabled={loading}
              className="btn-huglo-outline btn-sm"
            >
              <RefreshCw className={cn("size-4", loading && "animate-spin")} />
              Refresh
            </button>
            <button type="button" onClick={handleLogout} className="btn-huglo-outline btn-sm">
              <LogOut className="size-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-6">
        {loadError && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {loadError}
          </div>
        )}

        {stats && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {[
              { label: "Total", value: stats.total },
              { label: "Website", value: stats.website },
              { label: "Package", value: stats.package },
              { label: "New", value: stats.byStatus.new },
              { label: "Contacted", value: stats.byStatus.contacted },
              { label: "Quoted", value: stats.byStatus.quoted },
              { label: "Closed", value: stats.byStatus.closed },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-huglo-grey-light/70 bg-white p-4 shadow-sm"
              >
                <p className="text-xs text-huglo-grey">{item.label}</p>
                <p className="mt-1 font-heading text-2xl font-bold text-huglo-black">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value as QuoteSource | "")}
            className="h-10 rounded-xl border border-huglo-grey-light bg-white px-3 text-sm outline-none focus:border-huglo-gold"
          >
            <option value="">All sources</option>
            <option value="website">Website form</option>
            <option value="package">Package modal</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as QuoteStatus | "")}
            className="h-10 rounded-xl border border-huglo-grey-light bg-white px-3 text-sm outline-none focus:border-huglo-gold"
          >
            <option value="">All statuses</option>
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-huglo-grey-light/70 bg-white shadow-sm">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="size-8 animate-spin text-huglo-gold" />
            </div>
          ) : quotes.length === 0 ? (
            <p className="py-20 text-center text-sm text-huglo-grey">
              No quote requests found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[960px] text-left text-sm">
                <thead className="border-b border-huglo-grey-light/60 bg-warm-white text-xs uppercase tracking-wide text-huglo-grey">
                  <tr>
                    <th className="px-4 py-3">Received</th>
                    <th className="px-4 py-3">Source</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3">Details</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-huglo-grey-light/50">
                  {quotes.map((quote) => (
                    <tr key={quote._id} className="align-top hover:bg-warm-white/60">
                      <td className="px-4 py-4 whitespace-nowrap text-huglo-grey">
                        {formatDate(quote.createdAt)}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={cn(
                            "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                            quote.source === "package"
                              ? "bg-huglo-gold/15 text-huglo-black"
                              : "bg-blue-50 text-blue-700"
                          )}
                        >
                          {quote.source === "package" ? "Package" : "Website"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-semibold text-huglo-black">{quote.fullName}</p>
                        <p className="mt-1 flex items-center gap-1 text-huglo-grey">
                          <Phone className="size-3" />
                          <a href={`tel:${quote.phone}`} className="hover:text-huglo-gold">
                            {quote.phone}
                          </a>
                        </p>
                        {quote.email && (
                          <p className="mt-1 flex items-center gap-1 text-huglo-grey">
                            <Mail className="size-3" />
                            <a href={`mailto:${quote.email}`} className="hover:text-huglo-gold">
                              {quote.email}
                            </a>
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-4 text-huglo-grey">
                        {quote.source === "package" ? (
                          <>
                            <p>
                              <span className="text-huglo-black">Service:</span>{" "}
                              {serviceLabel(quote.service)}
                            </p>
                            {quote.address && (
                              <p className="mt-1">
                                <span className="text-huglo-black">Address:</span> {quote.address}
                              </p>
                            )}
                            {quote.message && (
                              <p className="mt-1 max-w-xs">
                                <span className="text-huglo-black">Message:</span> {quote.message}
                              </p>
                            )}
                          </>
                        ) : (
                          <>
                            <p>
                              <span className="text-huglo-black">Postcode:</span>{" "}
                              {quote.postcode || "—"}
                            </p>
                            <p className="mt-1">
                              <span className="text-huglo-black">Bill range:</span>{" "}
                              {quote.electricityBill || "—"}
                            </p>
                            {quote.billFileUrl && (
                              <a
                                href={getBillFileUrl(quote.billFileUrl) ?? "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 inline-flex items-center gap-1 text-huglo-gold hover:underline"
                              >
                                <FileText className="size-3.5" />
                                {quote.billFileName || "View bill upload"}
                              </a>
                            )}
                          </>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <select
                          value={quote.status}
                          onChange={(e) =>
                            handleStatusChange(quote._id, e.target.value as QuoteStatus)
                          }
                          className={cn(
                            "rounded-lg px-2.5 py-1.5 text-xs font-semibold outline-none",
                            STATUS_STYLES[quote.status]
                          )}
                        >
                          {STATUS_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          type="button"
                          onClick={() => handleDelete(quote._id)}
                          className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs text-red-600 transition-colors hover:bg-red-50"
                        >
                          <Trash2 className="size-3.5" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
