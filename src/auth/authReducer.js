// El reduce solo puede hacer uso de lo que se tenga en este archivo, por ende,
// reduce no hace llamados asincronos ni a ningun otro recurso
// Basicamente el reducer no es mas que una funcion que evalua casos determinados para
// actualizar un estado. Actualiza el estado de datos de usuario cuando se ejecutan los
// metodos login o logout

// Cuando el archivo en types se llama index solo es necesario llamar a la carpeta types
import { types } from "../types";


// Los objetos state y action son enviado internamente, yo solo se que el action es el que
// yo envio desde los componentes Login y NavBar a traves del metodo dispatch, pero aun no
// se como se enviaria el parametro state, solo se que por omision es un objeto vacio.
export const authReducer = (state = {}, action) => {
  // Cada action genera un case y cada case modifica el estado de una u otra manera, esto
  // se realiza usando un switch. El action es un objeto que contiene un objeto type el
  // cual contiene los metodos disponibles, p. ej. login, logout, add, toggle, clear
  // completed, etc. El switch verifica el action que llega. Los value son los types
  // disponibles en el archivo types que aqui se importo.
  switch (action.type) {
    case types.login:
        return {
          // Cuando el user se autentica se usa el action para actualizar el estado.
          // En el action vienen los datos que se usaran para actualizar el estado
          // Usualmente los datos que modifican el estado vienen en el action.payload
          ...action.payload, // copia por valor a la que se añade el campo logged:true
          logged: true
        }

    case types.logout:
        return {
          // Nuestra variable logged es la que permite si un usuario visualiza una u otra ruta
          logged: false
        }


    default:
        // Todo reducer siempre debe devolver un estado, es decir que por defecto se
        // realiza un return del estado sin modificar
        return state
  }
};
// authReducer permite manejar estados mas complejos o grandes de lo que se hace con useSate
// El action son todos los metodos disponibles que se tienen para actuar sobre el state
// Por ejemplo en nuestro caso los metodos login y logout

// Hay 2 formas de trabajar con los types, la primera es utilizando strings directamente dentro
// del action, en cada action se escribiria como se llama el metodo, p, ej, 'add', 'login', etc.
// La segunda forma se utiliza mucho y evita reescribir los action en caso de alguna modificacion
// y es usando la carpeta src/types

// En un reducer se podria tener diferentes tipos de variables que requirieran de un estado manejado a traves del contexto
// p. ej. posibles variables de usuario como: nombre, correo, foto, password, etc, todos estos podrian ser enviados en el
// campo payload como un estado de usuario (un objeto). Si se tuvieran otro tipo de variables propias del entorno del
// aplicativo, p. ej. variables de: verificacion de autenticacion, verificacion del tema de back ground (p. je. tema oscuro),
// tamaño del texto fuente, etc, entonces, estas variables tambien se podrian tener su control en un reducer, que permitiria
// resetear este tipo de variables a un estado alamacenado de configuracion previa luego de que el usuario se autentique
