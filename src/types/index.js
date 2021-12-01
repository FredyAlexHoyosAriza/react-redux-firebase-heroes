// Este types exporta un array de direrentes tipos en donde se tiene relacionado lo que se usara

// objeto que contiene los metodos disponibles
export const types = {

    // AUTHENTICATION TYPES

    // Si por algun motivo se require cambiar el nombre del type, es decir, el nombre de la
    // funcion, entonces, solo debe cambiarse en este archivo, al cual tienen acceso todos
    // las componentes que hagan uso de esta parametrizacion de los types.
    login: '[Auth] Login', //[el tipo del metodo] la cadena con la cual se invoca el metodo
    logout: '[Auth] Logout',

    // USER INTERFACE TYPES

    uiSetError: '[UI] Set Error',
    uiRemoveError: '[UI] Remove Error',

    uiStartLoading: '[UI] Start Loading',
    uiFinishLoading: '[UI] Finish Loading'
}