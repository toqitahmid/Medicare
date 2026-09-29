# Medicare - Frontend Architecture & Documentation

**🌐 Live Website / Demo:** [Insert your deployed Vercel/Render link here]

## 🏗 Overview
Medicare is a full-stack healthcare web application built with Next.js (App Router). It features dedicated role-based dashboards for Patients, Doctors, and Administrators, enabling seamless appointment booking, virtual consultations, and health management.

## 🌟 Key Features
*   **Role-Based Access Control:** Distinct interfaces and permissions for Patients, Doctors, and Admins.
*   **Real-time Appointment Booking:** Interactive calendar and time-slot selection for patients.
*   **Prescription Management:** Doctors can digitally prescribe medications, which patients can download or view.
*   **Secure Payment Integration:** Integrated Stripe checkout for smooth and secure appointment fee transactions.
*   **Review & Rating System:** Patients can leave feedback and rate their doctor's service post-appointment.
*   **Dark/Light Theme Toggle:** Built-in UI theme switcher for accessibility and preference.

## 💳 Payment Gateway Integration (Stripe)
The application utilizes **Stripe** for handling secure payments[cite: 3]:
1.  **Checkout Flow:** Patients initiating an appointment booking are redirected to a Stripe Checkout session.
2.  **Webhook Handling:** The backend listens for Stripe webhook events (`checkout.session.completed`) to confirm the payment status and officially schedule the appointment.
3.  **Note:** Ensure your Stripe API keys (Publishable key in frontend, Secret key in backend) are configured correctly in the environment variables.

## 🗄 Conceptual Data Models
While the database lives on the backend, the frontend heavily interacts with these core entities:
*   **Users:** Stores basic authentication and role (`ADMIN`, `DOCTOR`, `PATIENT`) data.
*   **Doctors:** Extended user profile containing specializations, fees, availability, and rating.
*   **Patients:** Extended user profile containing medical history and personal details.
*   **Appointments:** Links a Patient and Doctor with a specific date, time slot, and status (e.g., `pending`, `completed`).
*   **Payments:** Records transaction IDs, amounts, and statuses tied to an appointment.
*   **Prescriptions:** Medical notes and drug details issued by a doctor for a specific appointment.
*   **Reviews:** Textual feedback and star ratings left by patients.

## 📂 Project Structure & Routing
The frontend utilizes the Next.js App Router paradigm:

*   **`src/app/(mainLayout)`**: Public-facing pages (Home, About Us, Contact, Login, Register, Doctor Listings).
*   **`src/app/(dashboardLayout)`**: Protected routes wrapped in a dashboard layout.
    *   `/adminDashboard`: Admin controls (Overview, Appointments, Payments, Reviews, Users).
    *   `/doctorDashboard`: Doctor controls (Overview, Appointments, Payment history, Prescriptions, Profile settings).
    *   `/patientDashboard`: Patient controls (Overview, Appointments, Payment history, Reviews).
*   **`src/app/lib/actions/`**: Server Actions handling API requests for appointments, doctors, payments, prescriptions, and reviews.
*   **`src/app/ui/`**: Reusable React components (Navbar, Footer, Sidebar, ThemeToggle, Banner, Data Cards).

## 🚀 How to Run Locally

1.  **Clone the Repository:**
    ```bash
    git clone <your-frontend-repo-url>
    cd medicare
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    # or yarn install / pnpm install
    ```
3.  **Environment Variables:**
    Create a `.env.local` file in the root directory. You will need to provide your backend API URL and Stripe Publishable Key:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
    ```
4.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
5.  **View the Application:**
    Open [http://localhost:3000](http://localhost:3000) in your browser.
