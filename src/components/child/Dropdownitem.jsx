import { Link, NavLink } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
//import NavItem from "./NavItem";

const DropdownItem = ({ icon, title, submenuItems }) => {
    return (
        <li className="dropdown"
        >
            {title === 'Projects' ? (<>
                {/* <NavItem icon={icon} to={`/${title}`} className='menu-icon' >{title}</NavItem> */}
                <Link to="#">
                    <Icon icon={icon} className="menu-icon" />
                    <span>{title}</span>
                </Link>


            </>) : (<>
                <Link to='#'>
                    <Icon icon={icon} className="menu-icon" />
                    <span>{title}</span>
                </Link></>)}
            <ul className="sidebar-submenu"
            >
                {submenuItems.map((item, index) => (
                    <li key={index}>
                        <NavLink
                            to={item.to}
                            className={(navData) => (navData.isActive ? "active-page" : "")}
                        >
                            <i className={`ri-circle-fill circle-icon ${item.iconColor} w-auto`} />
                            {item.title}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </li>
    );
};
export default DropdownItem;

