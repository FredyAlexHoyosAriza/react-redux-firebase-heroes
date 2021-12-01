// Router para el manejo de rutas privadas, accesibles solo cuando
// el usuario ha ingresado satisfactoriamente al aplicativo.
// Aqui se debe verificar si el usuario esta logeado, si es asi se
// retorna un componente y sino el usuario es enviado a otra ruta

import { useEffect } from "react"
import { Navigate, useLocation } from "react-router-dom";

// A traves de las props se puede acceder a los children, es decir
// los componentes de orden inferior a PrivateRouter, en este caso
// se accede a DashboardRouter
const PrivateRouter = ({ children, loggedIn }) => {

    // Me permite conocer la ruta actual en el aplicativo
    // Aqui se obtienen los strings pathname y search
    const { pathname, search } = useLocation();
    useEffect(() => {
        console.log(loggedIn);
        if (loggedIn) {
            // Esta accion se podria realizar solo al hacer logout
            // pero se tiene el inconveniente de que si el token se
            // vence, el usuario nunca da click en logout, en cuyo
            // caso la ultima ruta nunca sera guardada. Si se
            // almacenara la ruta actual en el context, el codigo
            // seria un poco mas complejo y se deberia hacer uso
            // del dispath cada vez que se actualice la ruta, por
            // ello tambien se requiere useEffect. Al final, por la 
            // persistencia es preferible el localStorage
            localStorage.setItem('lastPath', pathname + search);
        }
    }, [loggedIn, pathname, search])

    // Si el usuario esta autenticado entonces se da paso al
    // componente hijo, es decir, que se retorna el componente
    // hijo DashboardRouter y sino se retorna un componente
    // Navigate que devuelve el usuario hacia el login
    return (
        loggedIn ? children : <Navigate to='/login' />
    )
}

export default PrivateRouter

// Nota: El componente <Navigate /> es una especie de router dummy
// que permite hacer navegacion

// Nota: los componentes hijos pueden se uno o varios y si asi
// fuera tambien se podria acceder a uno en paricular
