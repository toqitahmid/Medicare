import Navbar from "@/app/ui/dashboardComponent/Navbar";
import Sidebar from "@/app/ui/dashboardComponent/Sidebar";

const patientDashboradLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen">
            {/* 1. SIDEBAR: Stays sticky on desktop, handles its own mobile drawer overlay */}
            <Sidebar />

            {/* 2. MAIN CONTENT AREA: Stacks vertically (Navbar top, Main content bottom) */}
            <div className="flex flex-col flex-1 min-w-0 w-full">
                {/* NAVBAR: Spans the full width of the remaining viewport */}
                <Navbar />

                {/* MAIN PANEL: Where your dashboard content page actually renders */}
                <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default patientDashboradLayout;