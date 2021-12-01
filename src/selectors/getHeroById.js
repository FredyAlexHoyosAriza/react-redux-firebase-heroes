// Esta es solo una funcion no un componente (su nombre empieza en minuscula)
import { heroes } from "../data/heroes";

export const getHeroById = (id) => {
  if (id) { // id unico, find para encontrar la primer coincidencia
    return heroes.find((hero) => hero.id === id);
  } else return null;
};
