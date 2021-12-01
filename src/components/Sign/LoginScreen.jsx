// En esta pantalla se requiere autenticar el usuario y actualizar el estado de usuario,
// por ende, desde aqui se debe tener acceso a el action, el cual es un objeto en el
// que se guardan los datos que se usan para actualizar el estado
// Nota: se provee a traves del Provider y se obtiene a traves del context miplicito en redux
import React, { useState } from 'react'
import { Link } from "react-router-dom";
// import { useContext } from 'react'; // useContext es otro hook
// import { AuthContext } from '../../auth/authContext';
// import { types } from '../../types';
import GoogleButton from 'react-google-button'
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux'; // este es una especie de custom hook
import { startGoogleLogin, startLoginWithEmailAndPassword } from '../../actions/auth';
import isEmail from 'validator/lib/isEmail';
import { removeError, setError } from '../../actions/ui';

const LoginScreen = () => {

    // useDispatch podria recibir una funcion dispatch en particular, si no la recibe entonces
    // envia su dispatch sincrono estandar para que sea ejecutado luego de una operacion asincrona
    const dispatch = useDispatch()
    // const {loading} = useSelector((state) => state.ui);
    const loading = useSelector(({ ui }) => ui.loading);
    // const errMsg = useSelector(({ ui }) => ui.errMsg);

    const [formValues, handleInputChange, reset] = useForm({ // definimos el objeto initialState
        email: '',
        password: ''
    })

    const { email, password } = formValues;


    const [formStates, setFormStates] = useState([true, true]);

    const formVerification = () => {
        const inputStates = [true, true];
        if (!isEmail(email)) {
            dispatch(setError('The email is invalid'));
            inputStates[0] = false;
        }
        if (password.length < 6) {
            dispatch(setError('Password is less than 6 characters'));
            inputStates[1] = false;
        }

        return inputStates;
    }

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(removeError());

        const inputStates = formVerification();
        setFormStates(inputStates);

        if (inputStates[0] && inputStates[1]) {

            // Nunca se debe realizar ningun tipo de operacion o proceso con un estado (ni siquiera
            // imprimir en consola) los unicos procesos permitidos con un estado son aquellos que se
            // realizan a partir de un estado previo y que conllevan a la actualizacion del estado.
            // Nunca se debe realizar 2 seteos para el mismo estado en un mismo bloque de codigo, si
            // esto se hace solo prevalecera el ultimo seteo realizado en dicho bloque.

            // email y password permiten obtener un uid y un displayname que devuelve firebase.
            // Aqui enviamos el action login que se importa desde actions/auth
            // Por ende al dar click en Login se actualiza el estado con un usuario
            dispatch(startLoginWithEmailAndPassword(email, password));
            reset();
        }
    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin())
        reset(); // Solo por si entra con Google pero ya habia llenado inputs
    }

    return (
        <div className='container-fluid'>
            <h1>Login Screen</h1>
            <hr />
            {/* Para react las etiquetas for de html se pueden confundir con el for de js,
            por ello en React estas eiquetas cambian su nombre a htmlFor. El atributo required, previamente visto en html,
            impide el submit a no ser que el value en el input sea ingresado*/}
            <form onSubmit={handleLogin}>
                {/* {
                    errMsg &&
                    <div className="alert alert-danger" role="alert">
                        {errMsg}
                    </div>
                } */}
                {
                    formStates[0] ? <></> :
                        <div className="alert alert-warning" role="alert">
                            Invalid email format
                        </div>
                }
                {
                    formStates[1] ? <></> :
                        <div className="alert alert-warning" role="alert">
                            Password is less than 6 characters
                        </div>
                }
                <div className="mb-3">
                    <label htmlFor="signInEmail" className="form-label">Email address</label>
                    <input
                        type="email"
                        placeholder='Enter your email'
                        className="form-control"
                        id="signInEmail"
                        aria-describedby="emailHelp"
                        name='email'
                        value={email}
                        onChange={handleInputChange}
                        autoComplete='on'
                        required
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="signInPassword" className="form-label">Password</label>
                    <input
                        type="password"
                        placeholder='Enter your password'
                        className="form-control"
                        id="signInPassword"
                        name='password'
                        value={password}
                        onChange={handleInputChange}
                        autoComplete='off'
                        required />
                </div>
                <button
                    type="submit"
                    className="btn btn-outline-primary w-100 mb-3"
                    disabled={loading}
                >
                    Login with email and password: {loading.toString()}
                </button>
            </form>

            <div className='w-100'>
                <span className="form-text fw-bold">Or enter using your Google account.</span>
                <GoogleButton className='w-100' disabled={loading} onClick={handleGoogleLogin} />
                <hr />
                <Link to='/register'>Register new user</Link>
            </div>
        </div>
    )
}

export default LoginScreen