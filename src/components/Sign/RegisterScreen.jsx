import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import isEmail from 'validator/lib/isEmail';
import { useDispatch } from "react-redux";
import { removeError, setError } from "../../actions/ui";
import { useSelector } from "react-redux";
import { registerWithEmialAndPasssword } from "../../actions/auth";

const RegisterScreen = () => {

    // Custom hooks de react-redux
    const dispatch = useDispatch();
    // Este custom hook nos permite acceder al state de cada reducer almacenado en la store
    // const errMsg = useSelector(({ ui }) => ui.errMsg);
    const loading = useSelector(({ ui }) => ui.loading);

    const [formValues, handleInputChange, reset] = useForm({ // definimos el objeto initialState
        // Para no estar escribiendo los campos en las pruebas inicializamos los campos llenos,
        // pero normalmente se inicializan vacios y el checkbox se inicializa en false
        name: 'Carlos',
        email: 'bety10@gmail.com',
        password: '123456',
        password2: '123456',
        // se inicializa en false ya cuando  hacemos submit se llama a reset que restablece el
        // estado inicial false y por ende el check se hace uncheck
        terms: true
    })

    const { name, email, password, password2, terms } = formValues;

    const [formStates, setFormStates] = useState([true, true, true, true]);

    const formVerification = () => {
        const inputStates = [true, true, true, true];
        if (name.trim().length < 2) {
            dispatch(setError('The name has to be 2 characters long at less'));
            inputStates[0] = false;
        }
        if (!isEmail(email)) {
            dispatch(setError('The email is invalid'));
            inputStates[1] = false;
        }
        if (password.length < 6 || password !== password2) {
            dispatch(setError('Invalid password confirmation or password is less than 6 characters'));
            inputStates[2] = false;
        }
        if (!terms) {
            dispatch(setError('You must agree with the terms conditions to continue'));
            inputStates[3] = false
        }
        return inputStates;
    }

    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(removeError());

        const inputStates = formVerification();
        setFormStates(inputStates);

        if (inputStates[0] && inputStates[1] && inputStates[2] && inputStates[3]) {
            console.log(name, email, password, password2, terms);
            dispatch(registerWithEmialAndPasssword(name, email, password));
            reset();
        }
    }

    return (
        <div className='container-fluid'>
            <h1>Register Screen</h1>
            <hr />
            <form onSubmit={handleRegister}>
                {/* {
                    errMsg &&
                    <div className="alert alert-danger" role="alert">
                        {errMsg}
                    </div>
                } */}

                {
                    formStates[0] ? <></> :
                        <div className="alert alert-warning" role="alert">
                            The name has to be 2 characters long at less
                        </div>
                }
                {
                    formStates[1] ? <></> :
                        <div className="alert alert-warning" role="alert">
                            Invalid email format
                        </div>
                }
                {
                    formStates[2] ? <></> :
                        <div className="alert alert-warning" role="alert">
                            Invalid password confirmation or password is less than 6 characters
                        </div>
                }
                {
                    formStates[3] ? <></> :
                        <div className="alert alert-warning" role="alert">
                            You must agree with the terms conditions to continue
                        </div>
                }
                <div className="mb-3">
                    <label htmlFor="signInName" className="form-label">Name</label>
                    <input
                        type="text"
                        placeholder='Enter your name'
                        className="form-control"
                        id="signInName"
                        name='name'
                        value={name}
                        onChange={handleInputChange}
                        autoComplete='off'
                        required
                    />
                </div>
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
                        placeholder='Enter the password'
                        className="form-control"
                        id="signInPassword"
                        name='password'
                        value={password}
                        onChange={handleInputChange}
                        autoComplete='off'
                        required />
                </div>
                <div className="mb-3">
                    <label htmlFor="signInPassword2" className="form-label">Confirm password</label>
                    <input
                        type="password"
                        placeholder='Repeat the password'
                        className="form-control"
                        id="signInPassword2"
                        name='password2'
                        value={password2}
                        onChange={handleInputChange}
                        autoComplete='off'
                        required />
                </div>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="checkIflogged"
                        name='terms'
                        // El atributo value de un checkbox se llama checked 
                        checked={terms} // El atributo checked es para escritura
                        // value={ terms } // El atributo value es para lectura, por ende no es requerido aqui
                        onChange={handleInputChange}
                    // required
                    />
                    <label className="form-check-label" htmlFor="checkIflogged">Accept terms and conditions</label>
                </div>
                <button
                    type="submit"
                    className="btn btn-outline-primary w-100 mb-3"
                    disabled={loading}
                >
                    Sign up: {loading.toString()}
                </button>
            </form>

            <div>
                <hr />
                <Link to='/login'>I have an account</Link>
            </div>

        </div>
    )
}

export default RegisterScreen
