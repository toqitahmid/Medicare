"use client";

import { Star, MessageSquare, Plus } from "lucide-react";

const reviews = [
  { doctor: "Dr. Sarah Jenkins", specialty: "Cardiology", date: "Aug 22, 2026", rating: 5, text: "Clear, thoughtful guidance and an excellent telehealth experience." },
  { doctor: "Dr. Emily Roberts", specialty: "Dermatology", date: "Jul 28, 2026", rating: 4, text: "Helpful follow-up and a treatment plan that was easy to understand." },
];

export default function MyReviews() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Patient voice</p>
          <h2 className="mt-1 text-2xl font-extrabold">My Reviews</h2>
          <p className="mt-1 text-sm text-slate-500">Your feedback helps doctors improve every consultation.</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700">
          <Plus size={15} /> Write a review
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {reviews.map((review) => (
          <article key={review.doctor} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-300"><MessageSquare size={19} /></div>
                <div><h3 className="text-sm font-bold">{review.doctor}</h3><p className="text-xs text-slate-500">{review.specialty}</p></div>
              </div>
              <span className="text-[11px] text-slate-400">{review.date}</span>
            </div>
            <div className="mt-4 flex gap-1 text-amber-400">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={15} fill={index < review.rating ? "currentColor" : "none"} />)}</div>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{review.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
