import { TESTIMONIALS } from "./constants";

export type Review = {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  savings?: string | null;
  system?: string | null;
  photoUrl?: string | null;
  createdAt?: string;
  isStatic?: boolean;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function staticTestimonialsToReviews(): Review[] {
  return TESTIMONIALS.map((t, i) => ({
    id: `static-${i}`,
    name: t.name,
    location: t.location,
    rating: t.rating,
    text: t.text,
    savings: t.savings,
    system: t.system,
    isStatic: true,
  }));
}

export function sortReviewsTopRated(reviews: Review[]): Review[] {
  return [...reviews].sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating;
    const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return bTime - aTime;
  });
}

export function getPositiveTopRatedReviews(reviews: Review[]): Review[] {
  return sortReviewsTopRated(reviews.filter((r) => r.rating >= 4));
}

export async function fetchReviews(options?: {
  topRated?: boolean;
  limit?: number;
}): Promise<Review[]> {
  const params = new URLSearchParams();
  if (options?.topRated) params.set("topRated", "true");
  if (options?.limit) params.set("limit", String(options.limit));

  try {
    const res = await fetch(`${API_URL}/api/reviews?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    return (data.reviews ?? []).map(
      (r: {
        _id: string;
        name: string;
        location: string;
        rating: number;
        text: string;
        savings?: string;
        system?: string;
        photoUrl?: string;
        createdAt?: string;
      }) => ({
        id: r._id,
        name: r.name,
        location: r.location,
        rating: r.rating,
        text: r.text,
        savings: r.savings,
        system: r.system,
        photoUrl: r.photoUrl
          ? `${API_URL}${r.photoUrl}`
          : null,
        createdAt: r.createdAt,
      })
    );
  } catch {
    return [];
  }
}

export async function submitReview(data: {
  name: string;
  location: string;
  rating: number;
  text: string;
  savings?: string;
  system?: string;
  photo?: File;
}): Promise<{ success: boolean; error?: string }> {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("location", data.location);
  formData.append("rating", String(data.rating));
  formData.append("text", data.text);
  if (data.savings) formData.append("savings", data.savings);
  if (data.system) formData.append("system", data.system);
  if (data.photo) formData.append("photo", data.photo);

  const res = await fetch(`${API_URL}/api/reviews`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return { success: false, error: err.error || "Submission failed" };
  }

  return { success: true };
}

export function chunkReviews<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks.length > 0 ? chunks : [[]];
}
