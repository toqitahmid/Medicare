import { createPaymentInfo } from "@/app/lib/actions/payment";
import { stripe } from "@/app/lib/stripe";
import { email } from "better-auth";
import { redirect } from "next/navigation";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    status,
    customer_details: { email: customerEmail },
    metadata,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    const paymentInfo = {
      email: customerEmail,
      planId: metadata.planId,
      patientId: metadata.patientId,
    };
    const result = await createPaymentInfo(paymentInfo);
    console.log(result);
    return (
      <section
        id="success"
        className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="max-w-md w-full space-y-6 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 text-center">
          {/* Success Checkmark Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30">
            <svg
              className="h-8 w-8 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Payment Successful!
          </h2>

          {/* Body Content */}
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            We appreciate your business! A confirmation email will be sent to{" "}
            <span className="font-semibold text-gray-900 dark:text-white break-all">
              {customerEmail}
            </span>
            . If you have any questions, please email{" "}
            <a
              href="mailto:orders@example.com"
              className="font-medium text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-150"
            >
              orders@example.com
            </a>
            .
          </p>
        </div>
      </section>
    );
  }
}
