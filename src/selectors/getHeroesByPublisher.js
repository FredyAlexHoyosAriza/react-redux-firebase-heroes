// Esta es solo una funcion no un componente (su nombre empieza en minuscula)
import { heroes } from '../data/heroes';

export const getHeroesByPublisher = (publisher) => {
    if (publisher) {
        return heroes.filter((hero) => hero.publisher === publisher);
    } else return null;
}