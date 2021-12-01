// Funcion que siempre devuelve un estado, y funcion pura, es decir,
// que todo se debe resolver a partir de los argumentos que le llegan
// y no depender de funciones externas

import { types } from "../types";

// Estado de autenticacion, se podra tener un store con diferentes state
// const state = {
//     // user id que almacena firebase
//     uid: 'flksjgla846f4ga',
//     displayName: 'Fredy Alexander Hoyos Ariza', // nombre guardado en la cuenta en el registro
//     password:
// }
export const authReducer = (state = {}, action) => {
  switch (action.type) {
      
    case types.login:
      return {
          uid: action.payload.uid,
          name: action.payload.displayName // se llama displayName puesto que asi se obtiene de firebase
      };

    case types.logout:
      return {}; // tambien podria devolver los campos uid y name con cadenas vacias

    default:
      return state;
  }
};
