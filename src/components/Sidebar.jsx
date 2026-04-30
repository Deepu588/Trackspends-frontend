// Sidebar.jsx
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect,useCallback } from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";
import SidebarLogo from "./child/SidebarLogo";
import DropdownItem from "./child/Dropdownitem";
import NavItem from "./child/NavItem";
//import Cookies from 'js-cookie';
import {toast} from 'react-toastify'
import { Logout } from "./Logout";
import Cookies from "js-cookie";

import { getAvatarUrl } from "../helper/AvatarGenerator";
const Sidebar = ({ isActive, isMobileOpen, onMobileClose }) => {
     const location = useLocation();
     const userName = Cookies.get("userName");
    // const lead_from = Cookies.get("lead_from");
        const navigate=useNavigate()

    useEffect(() => {
        const handleDropdownClick = (event) => {
            event.preventDefault();
            const clickedLink = event.currentTarget;
            const clickedDropdown = clickedLink.closest(".dropdown");

            if (!clickedDropdown) return;

            const isActive = clickedDropdown.classList.contains("open");

            // Close all dropdowns
            const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
            allDropdowns.forEach((dropdown) => {
                dropdown.classList.remove("open");
                const submenu = dropdown.querySelector(".sidebar-submenu");
                if (submenu) {
                    submenu.style.maxHeight = "0px";
                }
            });

            // Toggle clicked dropdown
            if (!isActive) {
                clickedDropdown.classList.add("open");
                const submenu = clickedDropdown.querySelector(".sidebar-submenu");
                if (submenu) {
                    submenu.style.maxHeight = `${submenu.scrollHeight}px`;
                }
            }
        };

        const dropdownTriggers = document.querySelectorAll(
            ".sidebar-menu .dropdown > a, .sidebar-menu .dropdown > Link"
        );



        dropdownTriggers.forEach((trigger) => {
            trigger.addEventListener("click", handleDropdownClick);
        });

        return () => {
            dropdownTriggers.forEach((trigger) => {
                trigger.removeEventListener("click", handleDropdownClick);
            });

        };
    }, [location.pathname]);

    const getClassName = () => {
        if (isActive) return "sidebar active";
        if (isMobileOpen) return "sidebar sidebar-open";
        return "sidebar";
    };


     

    return (
        <>
            <aside className={getClassName()} 
            //id="sidebar-bg"
             >
                <div className="register-bg">
                <button onClick={onMobileClose} type="button" className="sidebar-close-btn">
                    <Icon icon="radix-icons:cross-2" />
                </button>
                <SidebarLogo />
                <div className="sidebar-menu-area">
                    <ul className="sidebar-menu" id="sidebar-menu">
                        <NavItem to="/dboard" icon="radix-icons:dashboard">
                            Dashboard
                        </NavItem>

                      

                        {/* <NavItem to="/admin" icon="hugeicons:microsoft-admin">Admin Page</NavItem> */}
                      

                        <NavItem icon="solar:bill-check-linear"
                            to="/add-expense"
                        //href="https://chromewebstore.google.com/detail/tgenai/kacddfcmhlfaaoojmmhgabpddjcgpiie"

                        >Add Expense</NavItem>
                        <NavItem icon="streamline-ultimate:cash-payment-bills"
                            to="/expenses"
                        // href="https://marketplace.atlassian.com/apps/1235136/ai-testfusion?hosting=cloud&tab=overview"
                        > View Expense</NavItem>
                        <NavItem icon="hugeicons:savings"
                            //  to={`${process.env.REACT_APP_ENVIRONMENT_NAME === 'dev' ? '/testcase-generator' : '/coming-soon'}`}
                            to="/monthlysavings"
                        //href="https://tgenai-web.onrender.com/login" 

                        >Know Your Savings</NavItem>
                        
                        <NavItem to="/chat" icon="si:ai-edit-line">AI Advisor</NavItem>
                                                 <NavItem to="/history" icon="ri:chat-history-line">Chat History</NavItem>
   
                            <NavItem icon="fluent-mdl2:total"
                            to="/total-expenses"
                        // href="https://marketplace.atlassian.com/apps/1235136/ai-testfusion?hosting=cloud&tab=overview"
                        > Total Expense</NavItem>

                        <NavItem icon="material-symbols:feedback-outline-rounded"
                            to="/send-feedback"
                        // href="https://marketplace.atlassian.com/apps/1235136/ai-testfusion?hosting=cloud&tab=overview"
                        > Feedback</NavItem>

                    </ul >


                   <div className="mt-auto border-t text-violet pt-3 d-flex align-items-center gap-3 px-2 pb-2">
     <img
      src={`${getAvatarUrl(userName|| 'Unknown User')}`}
      alt="user"
      className="rounded-circle"
      width={38}
      height={38}
      style={{ objectFit: "cover" }}
    /> 
    <div className="overflow-hidden">
      <p className="mb-0 fw-semibold text-sm text-truncate">{userName}</p>
      {/* <small className="text-muted text-truncate d-block">annamdeepak1912@gmail.com</small> */}
    </div>
    <div >
{/* <Link as='button' title="Logout" onClick={handleLogout} >
 <Icon icon="lucide:power" className="icon text-md hover-bg-transparent hover-text-danger " /> </Link> */}
    </div>
  </div>

                </div ></div>
            </aside >
        </>
    );
};
export default Sidebar;