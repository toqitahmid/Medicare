"use server";

import Stripe from "stripe";

// Initialize Stripe with the Secret Key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-08-26.dahlia", // use latest stable
});

export const createStripeSession = async (appointment) => {
    try {
        if (!process.env.STRIPE_SECRET_KEY) {
            throw new Error("Stripe Secret Key is missing in environment variables.");
        }

        // Hardcoding frontend URL to avoid redirecting to the Express API backend
        const frontendUrl = "http://localhost:3000";

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            success_url: `${frontendUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}&appointment_id=${appointment._id}`,
            cancel_url: `${frontendUrl}/dashboard/patientDashboard/appointments`, // Fallback redirect if they cancel
            customer_email: appointment.patientId, // Using email from the appointment
            client_reference_id: appointment._id,
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `Consultation with Dr. ${appointment.doctorName || appointment.doctorId}`,
                            description: `Medical appointment on ${appointment.appointmentDate} at ${appointment.appointmentTime}`,
                        },
                        unit_amount: Math.round(Number(appointment.fee || 50) * 100), // Stripe expects amounts in cents
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                appointmentId: appointment._id,
                patientId: appointment.patientId,
                patientName: appointment.patientName || "Patient",
                doctorId: appointment.doctorId,
                doctorName: appointment.doctorName || "Doctor",
            },
        });

        return { success: true, url: session.url };
    } catch (error) {
        console.error("Stripe Session Creation Failed:", error);
        return { success: false, message: error.message };
    }
};

export const savePaymentRecord = async (paymentData) => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";
        const response = await fetch(`${baseUrl}/api/v1/payments/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to record payment");
        }

        const res = await response.json();
        return { success: true, data: res.data.payment };
    } catch (error) {
        console.error("Failed to save payment record:", error);
        return { success: false, message: error.message };
    }
};

export const retrieveStripeSession = async (sessionId) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        return { success: true, data: session };
    } catch (error) {
        console.error("Failed to retrieve Stripe session:", error);
        return { success: false, message: error.message };
    }
};
