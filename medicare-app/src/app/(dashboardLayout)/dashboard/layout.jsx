import DashboardNavbar from '@/components/dashboard/Navbar';
import DashboardSidebar from '@/components/dashboard/Sidebar';

const Dashboardlayout = ({Children}) => {
    return (
        <div className='flex min-h-screen'>
            <DashboardSidebar></DashboardSidebar>
            <div className='flex flex-col flex-1'>
                <DashboardNavbar></DashboardNavbar>
                <main className='flex-1 overflow-y-auto'>
                    {Children}
                </main>
            </div>
        </div>
    );
};

export default Dashboardlayout;