"use client";

import { Star, MessageSquare, Plus } from "lucide-react";

export default function MyReviews({ patientReviews = [] }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            Patient voice
          </p>
          <h2 className="mt-1 text-2xl font-extrabold">My Reviews</h2>
          <p className="mt-1 text-sm text-slate-500">
            Your feedback helps doctors improve every consultation.
          </p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700">
          <Plus size={15} /> Write a review
        </button>
      </div>

      {patientReviews.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500 dark:border-slate-700">
          No reviews found.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {patientReviews.map((review) => (
            <article
              key={review._id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-300">
                    <MessageSquare size={19} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">{review.doctorName}</h3>
                    {review.specialty && (
                      <p className="text-xs text-slate-500">
                        {review.specialty}
                      </p>
                    )}
                  </div>
                </div>
                <span className="text-[11px] text-slate-400">
                  {review.createdAt
                    ? new Date(review.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : review.date}
                </span>
              </div>
              <div className="mt-4 flex gap-1 text-amber-400">
                {Array.from({ length: 5 }, (_, idx) => (
                  <Star
                    key={idx}
                    size={15}
                    fill={idx < review.rating ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {review.reviewText || review.text}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
