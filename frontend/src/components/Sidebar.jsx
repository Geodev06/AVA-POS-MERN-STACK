import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Sidebar = () => {

    const { user } = useAuthContext()

    const NavLink = ({ to, children, props }) => {
        const resolvepath = useResolvedPath(to)
        const isActive = useMatch({ path: resolvepath.pathname, end: true })

        return (
            <li>
                <Link to={to} {...props} className={isActive ? "nav-link text-white d-flex align-items-center active" : "nav-link text-white  d-flex align-items-center"}>
                    {children}
                </Link>
            </li>
        )

    }
    const style = {
        width: '300px'
    }

    const { logout } = useLogout()

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark sidebar" style={style}>
            <div className="d-flex flex-column m-0 p-3">
                <p href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-4 text-white fw-bold">AVA - Dashboard</span>
                </p>
                <div>
                    <span className="text-white m-0 mx-3">Ageo agnote</span>
                    <span className="badge bg-info text-white">Administrator</span>
                </div>
            </div>

            <ul className="nav nav-pills flex-column mb-auto mt-5">
                <li>
                    <span className="fw-bold text-secondary mb-1">menu</span>
                </li>
                <NavLink to={!user ? '/' : '/dashboard'}>
                    <i className="bx bx-home fs-3 mx-1"></i>
                    Dashboard
                </NavLink>

                <NavLink to={!user ? '/' : '/product'}>
                    <i className="bx bx-category fs-3 mx-1"></i>
                    Product
                </NavLink>

                <NavLink to={!user ? '/' : '/setting'}>
                    <i className="bx bx-cog fs-3 mx-1"></i>
                    Setting
                </NavLink>


                <li>
                    <a href="#" onClick={logout} className="nav-link text-white  d-flex align-items-center">
                        <i className="bx bx-log-out fs-3 mx-1"></i>
                        Log out
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;