// Esta es la store que usara Redux
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "../reducers/authReducer";
import { uiReducer } from "../reducers/uiReducer";
// import { uiReducer } from "../reducers/uiReducer";

// Ojeto para almacenar todos los reducers que se requieran
const reducers = combineReducers({
    auth: authReducer, // authentication state
    ui: uiReducer // user interface state
});
// Si requiere usar las herramientas de redux develpement tools y tambien necesita usar un middleware asincrono
// entonces necesitamos que el middleware se envie como una varible de composeEnhancers
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
    reducers,
    // enviamos como argumento el applyMiddleware que nos pide thunk para poder funcionar
    composeEnhancers( applyMiddleware( thunk ) )
);
