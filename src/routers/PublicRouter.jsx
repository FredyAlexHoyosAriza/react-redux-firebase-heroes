// import { useContext } from "react"
import { Navigate } from "react-router-dom";
// import { AuthContext } from "../auth/authContext"

// A traves de las props se puede acceder a los children, es decir
// los componentes de orden inferior a PublicRouter, en este caso
// se accede a LoginScreen
const PublicRouter = ({ children, loggedIn }) => {
    // Se podria tener diferentes tipos de contextos, p. ej. de
    // manejo de API, o de configuraciones en el aplicativo, o
    // de autenticacion como en este caso
    // const { logged } = useContext(AuthContext).user;

    // Si un usuario autenticado trata de acceder al '/login'
    // este es enviado al home screen, en caso contrario se le da
    // paso el paso al LoginScreen
    return (
        <div className='container-fluid mt-3'>
            {loggedIn ? <Navigate to={localStorage.getItem('lastPath') || '/'} /> : children}
        </div>
    )
}

export default PublicRouter
