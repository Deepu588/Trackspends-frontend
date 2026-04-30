import { Icon } from "@iconify/react/dist/iconify.js";
import UserProfileDropdown from "./UserProfileDropdown";
import NavItem from "./child/NavItem";
import { Link,NavLink, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { Logout } from "./Logout";
import { toast } from "react-toastify";
const Navbar = ({ onSidebarToggle, onMobileMenuToggle, sidebarActive }) => {
   
    const navigate=useNavigate()
   const handleLogout = useCallback(async () => {
            try {
              //  await Logout();
              await Logout();
                navigate("/", { replace: true });
                toast.info("Logged Out Successfully !!!", { position: "top-right" })
    
            } catch (error) {
                console.error('Error during logout:', error);
                toast.error("Logout failed !!");
    
            }
        }, [navigate]);
   
   
    return (
        <div className="navbar-header register-bg" 
        //id="navbar-bg"
        >
            <div className="row align-items-center justify-content-between">
                <div className="col-auto">
                    <div className="d-flex flex-wrap align-items-center gap-4">
                        <button type="button" className="sidebar-toggle" onClick={onSidebarToggle}>
                            {sidebarActive ? (
                                <Icon icon="iconoir:arrow-right" className="icon text-2xl non-active" />
                            ) : (
                                <Icon icon="heroicons:bars-3-solid" className="icon text-2xl non-active" />
                            )}
                        </button>
                        <button onClick={onMobileMenuToggle} type="button" className="sidebar-mobile-toggle">
                            <Icon icon="heroicons:bars-3-solid" className="icon" />
                        </button>
                        {/* <form className="navbar-search">
                            <input type="text" name="search" placeholder="Search" />
                            <Icon icon="ion:search-outline" className="icon" />
                        </form> */}
                    </div>
                </div>
                <div className="col-auto">
                    <div className="d-flex flex-wrap align-items-center gap-3">
                        {/* <NotificationDropdown />
                        <Help />*/}
                        {/* <UserProfileDropdown />  */}
                          {/* <Link
                    as="button"
                    title="About Author"
                    className="has-indicator w-40-px h-40-px bg-violet rounded-circle d-flex justify-content-center align-items-center"
                >
                    <Icon icon="ix:about" className="text-light text-xxl " />
                </Link> */}
                        {/* <Link
                    as="button"
                    title="Help"
                    className="has-indicator w-40-px h-40-px bg-violet rounded-circle d-flex justify-content-center align-items-center"
                >
                    <Icon icon="material-symbols:help-outline" className="text-light text-xxl" />
                </Link> */}

                 <Link
                    as="button"
                    title="Logout"
                    onClick={handleLogout}
                    className="has-indicator w-40-px h-40-px bg-violet rounded-circle d-flex justify-content-center align-items-center"
                >
                    <Icon icon="lucide:power" className="text-light text-xl hover-bg-transparent hover-text-danger" />
                </Link>

                    </div>
                </div>
            </div>



        </div>
    );
};
export default Navbar;