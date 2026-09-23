import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { PLAN_PRICE_ID, stripe } from "@/app/lib/stripe";
import { getUserSession } from "@/app/lib/core/session";
import { getPatientByUserId, getPatientInfo } from "@/app/lib/api/patients";


export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const formData = await request.formData();
    const planId = formData.get('planId');
    const priceId = PLAN_PRICE_ID[planId];

    const user = await getUserSession();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userId = user.id;
    const patient = await getPatientByUserId(userId);

    if (!patient) {
      return NextResponse.json(
        { error: "Patient record not found for this user" },
        { status: 404 },
      );
    }

    const patientId = patient._id;

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {planId, patientId},
      success_url: `${origin}/plans/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
