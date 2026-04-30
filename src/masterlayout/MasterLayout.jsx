import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const MasterLayout = ({ children }) => {
    const [sidebarActive, setSidebarActive] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    const toggleSidebar = () => setSidebarActive(!sidebarActive);
    const toggleMobileMenu = () => setMobileMenu(!mobileMenu);

    return (<>
        <section className={mobileMenu ? "overlay active" : "overlay"}>
            <Sidebar
                isActive={sidebarActive}
                isMobileOpen={mobileMenu}
                onMobileClose={toggleMobileMenu}
            />

            <main className={sidebarActive ? "dashboard-main active" : "dashboard-main"}>
                 <Navbar
                    onSidebarToggle={toggleSidebar}
                    onMobileMenuToggle={toggleMobileMenu}
                    sidebarActive={sidebarActive}
                /> 

                <div className={`dashboard-main-body `}>{children}</div>
                {/* <Footer /> */}
            </main>
        </section>
    </>);
};

export default MasterLayout;
