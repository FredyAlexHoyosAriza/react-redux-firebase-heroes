import { types } from "../types"
import { googleAuthProvider, firebase } from "../firebase/firebase-config";
import { finishLoading, startLoading } from "./ui";

// Puesto que las llamdas a metodos login se ejecutan desde el handleLogin
// en el LoginScreen, entonces lo normal es llamar starLoginWithEmailPassword alli
export const startLoginWithEmailAndPassword = (email, password) => {
    // Puesto que esta funcion es asincrona, entonces, en el return no se
    // devuelve un objeto sino que devolvemos una callback function que
    // en su interior ejecuta la parte asincrona
    return (dispatch) => {
        // Inicialmente por precaucion desabilitamos el boton submit
        dispatch(startLoading()); // se usa el dispatch sincrono

        // Usando email y password, se verifica si existe el user al
        // interior del objeto firebase, y si existe coincidencia, se
        // establece el estado de dicho user en la app

        // Se quiere que la autenticacion se realice verificando que
        // el usuario ya exista en nuestro proyecto de firebase, para
        // ello firebase cuenta con un metodo que permite autenticacion
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                // actualizamos el estado al llamar al action login en el
                // argumento del dispatch que a la vez se recibe como
                // argumento de este callback function y enviado desde un
                // dispatch igualado al useDispatch de react-redux
                dispatch(login(user.uid, user.displayName))
                // La parte asincrona se ejecuta por fuera del dispatch y
                // cuando esta se resuelve entonces el dispatch se ejecuta
                // de manera sincrona comun y corriente
                dispatch(finishLoading()); // se usa el dispatch sincrono
            })
            .catch((err) => {
                console.log(err.message)
                dispatch(finishLoading(false)); // se usa el dispatch sincrono
            });
    }
}

// Al realizar autenticaciones con email y password de firebase, este no tiene
// de donde obtener el nombre de usuario por ello debemos enviarselo. Pero al
// trabajar con autenticaciones, con Google, Facebook, Twiter, Github, etc,
// todas estas ya tienen un nombre de usuario que es posible consultar
export const registerWithEmialAndPasssword = (name, email, password) => {
    // El middleware thunk previamente instalado, nos permite ejecutar acciones
    // asincronas, con funciones que en lugar de retornar un objeto retornnan una
    // callback function, a la cual le es enviado implicitamente un dispatch que
    // recibe como argumento
    return (dispatch) => {
        dispatch(startLoading());

        // En mi objeto firebase se genera un nuevo user a partir de email, password y name,
        // luego se establece el estado de este user en la app
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                try {
                    await user.updateProfile({
                        displayName: name
                    });
                    dispatch(login(user.uid, name));
                    dispatch(finishLoading());
                } catch (err1) {
                    console.log(err1.message);
                    dispatch(finishLoading());
                }

            })
            .catch((err2) => {
                console.log(err2.message)
                dispatch(finishLoading());
            });
    }

}

export const startGoogleLogin = () => {
    // Aqui creamos nuestra peticion asincrona, y por ende returna una callback
    // function que al igual que en el caso anterior recibe un argumento dispatch el
    // cual es suministrado por un dispatch creado con un useDispatch de react-redux
    // en el componente LoginScreen
    return (dispatch) => {
        dispatch(startLoading());

        // En el objeto firebase se genera un nuevo user a partir de una cuenta de
        // Google. Luego se establece el estado de dicho user en la app

        // Desde firebase llamamos el metodo de ingreso con ventana emergente, el
        // cual, nos permite autenticarnos con Google, el cual toma como argumento
        // un provider, en nuestro caso le enviaremos el googleAuthProvider que fue
        // creado en el archivo firebase/firebase-config. El metodo signInWithPopup
        // retorna una promesa por ello debe ser usado dentro de una async function
        // o con un .then
        firebase.auth().signInWithPopup(googleAuthProvider)
            // dentro del objteto user del objeto devuelto se encuentran los campos
            // buscados: user._delegate.displayName y user._delegate.uid, pero a pesar
            // de que estos campos no esten directamente despues de user firebase me
            // permite accederlos como: user.displayName y user.uid. Ademas de estos
            // campos tambien podria extraerse cualquier campo que necesitemos del
            // objeto user, incluso la url de nuestra foto user.photoURL. Con un
            // useSelector podemos utilizar otros datos del estado
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName));
                dispatch(finishLoading());
            })
            .catch((e) => {
                console.log(e.msg)
                dispatch(finishLoading());
            });
    }
}

// Este login es la parte sincrona, aqui no existen esperas por peticiones,
// las cuales se realizan en la funciones anteriores
// Usaremos esta funcion para actualizar el estado de usuario
export const login = (uid, displayName) => {
    // Los actions llevan type como parametro obligatorio
    return ({
        type: types.login,
        // contiene la actualizacion del state
        // Puesto que llaves y valores tienen el mismo nobre puedo escribir:
        payload: { uid, displayName }
        // Lo cual es esquivalente a:
        // payload: {
        //     uid: uid,
        //     displayName: displayName
        // }
    })
}

// Se deben crear 2 logouts, uno para eliminar el auth state y el otro para
// decirle a firebase que el usuario ya no esta autenticado

export const startLogout = () => {
    return async (dispatch) => {
        // Se solicita al objeto firebase que cierre sesion. Recuerdese que
        // firebase debe comunicarse con un servidor, es decir, es asincrono
        try {
            await firebase.auth().signOut();
            dispatch(logout());
        } catch (error) {
            console.log(error.message);
        }
    }
}

// logout no requiere ser exportado ya que solo se llamara en este archivo
const logout = () => {
    return ({
        type: types.logout
    })
}