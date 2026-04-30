import React, { useEffect, useState, useCallback } from 'react';
import { Dropdown } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import {Logout} from './Logout'
import Cookies from 'js-cookie';

const UserProfileDropdown = () => {

    const navigate = useNavigate();

    //const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    let username = Cookies.get("username");
    // 2. Function to update the theme on the HTML element
   


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
        <>
            <Dropdown className="dropdown">

                <Dropdown.Toggle
                    as="button"
                    className="has-indicator w-40-px h-40-px bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center"
                >
                    <Icon icon="iconoir:profile-circle" className="text-primary-light text-xl" />
                </Dropdown.Toggle>


                <Dropdown.Menu className="dropdown-menu to-top dropdown-menu-sm">
                    <div className="py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2">
                        <div>
                            <h6 className="text-lg text-primary-light fw-semibold mb-2">

                                {
                                    username && (username)
                                    //atob(username)
                                }
                            </h6>
                            <span className="text-secondary-light fw-medium text-sm">
                                {Cookies.get("role_name")}
                            </span>
                        </div>
                        {/* <button type="button" className="hover-text-danger">
                        <Icon icon="radix-icons:cross-1" className="icon text-xl" />
                    </button> */}
                    </div>

                    <ul className="to-top-list">
                        <li>
                            <Dropdown.Item as={Link} to="/view-profile" className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                                <Icon icon="solar:user-linear" className="icon text-xl" /> My Profile
                            </Dropdown.Item>
                        </li>
                        <li>


                            <Dropdown.Item as={Link} 
                            //onClick={handleThemeToggle}
                             className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                                <Icon icon="tabler:sun" className="icon text-xl" /> Change Theme
                                {/* <ThemeToggleButton />  */}
                            </Dropdown.Item>
                        </li>

                        {/* <li>
                        <Dropdown.Item as={Link} to="/company" className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                            <Icon icon="icon-park-outline:setting-two" className="icon text-xl" /> Settings
                        </Dropdown.Item>
                    </li> */}
                        <li>
                            <Dropdown.Item 
                            onClick={handleLogout} 
                            className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-danger d-flex align-items-center gap-3">
                                <Icon icon="lucide:power" className="icon text-xl" /> Log Out
                            </Dropdown.Item>
                        </li>
                    </ul>
                </Dropdown.Menu>
            </Dropdown>

        </>
    );
};

export default UserProfileDropdown;
