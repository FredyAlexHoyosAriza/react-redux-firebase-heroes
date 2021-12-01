import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { startLogout } from "../../actions/auth";

const NavBar = () => {
    // El 'hook' useNavigate nos permite empujar a los usuarios
    // en las diferentes rutas sin hacer recargas de las paginas

    const name = useSelector(({ auth }) => auth.name);
    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(startLogout());
    }

    return ( // fixed-top
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <div className="container-fluid">
                <Link
                    className="navbar-brand"
                    to='/'
                >
                    Heroes
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav">
                        {/* NavLink nos permite retornar si la ruta no esta activa, que nos da control sobre el active */}
                        {/* Al parecer isActive es un estado de <NavLink> que se retorna a traves de props */}
                        <NavLink // Se desestructuran las props
                            className={({ isActive }) => `nav-item nav-link ${isActive && 'active'}`} // isActive ? 'active' : ''
                            // aria-current="page"
                            to='/marvel'
                        >
                            Marvel
                        </NavLink>
                        <NavLink
                            className={({ isActive }) => `nav-item nav-link ${isActive && 'active'}`}
                            to='/dc'
                        >
                            DC
                        </NavLink>
                        <NavLink
                            className={({ isActive }) => `nav-item nav-link ${isActive && 'active'}`}
                            to='/search'
                        >
                            Search
                        </NavLink>
                        {/* <NavLink
                            className="nav-item nav-link desabled"
                            to='/'
                        >
                            Desabled
                        </NavLink> */}
                    </div>
                    <div className="d-flex justify-content-end collapse navbar-collapse w-100" id="navbarNav">
                        <span className="nav-item nav-link text-info">
                            { name }
                        </span>
                        <button
                        className="nav-item btn btn-outline-secondary" type="submit"
                        onClick={() => handleLogOut()}>
                        Log out
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    ) //  dual-collapse2 order-3
}

export default NavBar
