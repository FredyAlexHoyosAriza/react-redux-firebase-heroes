import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { login } from "../actions/auth";
import LoginScreen from "../components/Sign/LoginScreen";
import RegisterScreen from "../components/Sign/RegisterScreen";
import DashboardRouter from "./DashboardRouter";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";
import { firebase } from "../firebase/firebase-config"

const AppRouter = () => {

    const dispatch = useDispatch();
    const [loggedIn, setLoggedIn] = useState(false)
    // En tanto se reestablece el auth state, a causa de una recarga de pagina, el
    // componente retorna un loading spinner
    const [isAuthReloading, setIsAuthReloading] = useState(true)
    // Para al momento de recargar establecer el estado de autenticacion auth que
    // previamente se establecio en el objeto firebase, creamos el siguiente useEffect.
    useEffect(() => {
        // Un observable es una especie de listener de firebase que detecta cambios en
        // el usuario y en base a ello realiza una actualizacion, pero se le debe indicar
        // cuales son los cambios que debe realizar en la atualizacion
        // Al recargar la pagina se genera un cambio en el objeto firebase, el cual verifica
        // sus datos contra los que se encuentran en el proyecto en el servidor de Firebase.
        // Cambios es un usuario que ya no esta logueado producen un argumeto user vacio
        firebase.auth().onAuthStateChanged((user) => {
            // Si user existe acceda a la propiedad uid y si uid no esta vacio entra al if
            if (user?.uid) { // Cuando se hace logout que pasa ...
                // Se establece el estado del user en la app
                setLoggedIn(true);
                dispatch(login(user.uid, user.displayName))
            } else {
                setLoggedIn(false);
            }
            setIsAuthReloading(false);
        });
    })

    if (isAuthReloading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <div
                    className="spinner-grow text-info"
                    role="status"
                    style={{ width: "3rem", height: "3rem" }}

                />
                <div
                    className="spinner-grow text-info"
                    role="status"
                    style={{ width: "3rem", height: "3rem" }}
                />
                <div
                    className="spinner-grow text-info"
                    role="status"
                    style={{ width: "3rem", height: "3rem" }}
                />
            </div>
        )
    } else {

        return (
            <Router>
                <Routes>

                    {/* RUTAS PRIVADAS */}
                    <Route path="/*" element={
                        <PrivateRouter loggedIn={loggedIn} >
                            <DashboardRouter />
                        </PrivateRouter>
                    } />

                    {/* RUTAS PÚBLICAS */}
                    {/* Nuestra ruta al '/login' no tendra NavBar */}
                    <Route path="/login" element={
                        <PublicRouter loggedIn={loggedIn}>
                            <LoginScreen />
                        </PublicRouter>
                    } />
                    <Route path="/register" element={<RegisterScreen />} />

                </Routes>
            </Router>
        )
    }
}

export default AppRouter
