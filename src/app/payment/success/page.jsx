import React from "react";
import { Card, Button } from "@heroui/react";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { retrieveStripeSession, savePaymentRecord } from "@/app/lib/actions/payment.actions";

export default async function PaymentSuccessPage({ searchParams }) {
    const { session_id, appointment_id } = await searchParams;

    if (!session_id || !appointment_id) {
        notFound();
    }

    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        
        // 1. Retrieve the session from Stripe to ensure it's paid and valid
        const stripeRes = await retrieveStripeSession(session_id);
        
        if (stripeRes.success && stripeRes.data.payment_status === "paid") {
            const sessionData = stripeRes.data;
            
            // 2. Post the full payment record to the database
            const paymentPayload = {
                appointmentId: sessionData.metadata.appointmentId,
                patientId: sessionData.metadata.patientId,
                patientName: sessionData.metadata.patientName,
                doctorId: sessionData.metadata.doctorId,
                doctorName: sessionData.metadata.doctorName,
                amount: sessionData.amount_total / 100, // Convert cents back to dollars
                transactionId: sessionData.payment_intent,
                paymentDate: new Date().toISOString(),
            };
            
            await savePaymentRecord(paymentPayload);

            // 3. Notify the backend that the appointment itself is now Paid
            await fetch(`${baseUrl}/api/v1/appointments/${appointment_id}/pay`, {
                method: "PATCH",
                cache: "no-store",
            });
        }
    } catch (error) {
        console.error("Failed to process payment finalization:", error);
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-default-50/30 p-6">
            <Card className="max-w-lg w-full p-10 flex flex-col items-center justify-center text-center rounded-[2.5rem] shadow-2xl border border-success/20 bg-background/60 backdrop-blur-xl">
                <div className="w-24 h-24 bg-success/10 text-success rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-12 h-12" />
                </div>
                <h1 className="text-3xl font-bold mb-4 text-foreground">Payment Successful!</h1>
                <p className="text-default-500 mb-8 text-lg">
                    Your appointment fee has been successfully processed. The doctor has been notified and your slot is fully confirmed.
                </p>
                <Link href="/patientDashboard/appointments" className="w-full">
                    <Button 
                        color="primary" 
                        size="lg" 
                        className="w-full font-bold shadow-lg shadow-primary/30 py-6 text-lg rounded-2xl"
                        endContent={<ArrowRight className="w-5 h-5" />}
                    >
                        Return to Appointments
                    </Button>
                </Link>
            </Card>
        </div>
    );
}
