
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

const NavItem = ({ to, href, icon, children }) => {
    return (
        <li>
            {href ? ( // If href exists, render an external link
                <a href={href} target="_blank" rel="noopener noreferrer" className="nav-item">
                    <Icon icon={icon} className="menu-icon" />
                    <span>{children}</span>
                </a>
            ) : ( // Otherwise, render internal navigation
                <NavLink to={to} className={(navData) => (navData.isActive ? "active-page" : "nav-item")}>
                    <Icon icon={icon} className="menu-icon" />
                    <span>{children}</span>
                </NavLink>
            )}
        </li>
    );
};

export default NavItem;
