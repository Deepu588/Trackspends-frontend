import { Link } from "react-router-dom";
const SidebarLogo = () => {
    return (
        <Link to="/dboard" className="sidebar-logo">
            
             <img src={`${process.env.PUBLIC_URL}/assets/images/trackspends-sidebar.png`} alt="site logo" className="light-logo" /> 
            <img src={`${process.env.PUBLIC_URL}/assets/images/logodark.png`} alt="site logo" className="dark-logo" />
            <img src={`${process.env.PUBLIC_URL}/assets/images/trackspends-sidebar-minilogo.png`} alt="site logo" className="logo-icon" />
        </Link>
    );
};

export default SidebarLogo;