import { types } from "../types";

const initialState = {
    // Se crea variable para bloquear el boton de login
    loading: false,
    // Se crea variable para mensaje de error
    errMsg: null
}

// Los diferentes retornos de un reducer corresponden a
// los diferentes estados de un proceso en particular
export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.uiSetError:
            // se llama en formVerification
            return {
                ...state,
                errMsg: action.payload
            };

        case types.uiRemoveError:
            return {
                ...state,
                errMsg: null
            };

        case types.uiStartLoading:
            // Cuando el usuario da click al boton submit este se deshabilita
            // mientras la peticion se ejecuta, para evitar hacer un nuevo
            // submit cuando la petcion del primer submit aun esta en proceso
            // loading sera enviado al atributo disable del submit button en el login
            return {
                ...state,
                loading: true
            };

        case types.uiFinishLoading:
            return {
                ...state,
                loading: false
            };

        default:
            return state;
    }
}