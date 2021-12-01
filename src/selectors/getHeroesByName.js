// Esta es solo una funcion no un componente (su nombre empieza en minuscula)
import { heroes } from "../data/heroes";

export const getHeroesByName = (name = "") => { // valor por defecto string vacio

  // console.log('llamado a getHeroesByName');
  if (name.length === 0) {
    return [];
  } else {
      name = name.trim().toLowerCase();
      // retorna todas los heroes que contengan el string name dentro de sus nombres
    return heroes.filter((hero) => hero.superhero.toLowerCase().includes(name));
  }
};
