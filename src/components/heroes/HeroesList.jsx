import { getHeroesByPublisher } from "../../selectors/getHeroesByPublisher";
import HeroCard from "./HeroCard";
import { useMemo } from "react";

const HeroesList = ({ publisher }) => {

    // Para todas las variables que se usen en el return y que no sean un estado, es preferible usar useMemo.
    // Aunque en este caso yo no veo la diferencia de no usarlo

    // const heroes = getHeroesByPublisher(publisher)
    const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher])
        .map(hero => (
            // Siempre que se este imprimiendo multiples veces un mismo elemento se requiere usar un key,
            // pero el key no es una prop
            // Se envian las props desestructuradas {...hero}
            <HeroCard key={hero.id} {...hero} />
        ));

    return (
        // style={{fontFamily: 'cursive'}}
        <div style={{ padding: '1%' }}>
            <h1>{publisher}</h1>
            <hr />
            {/* row-cols-md-5: cada hijo (col) de este div ocupa 1/5 del espacio en una fila en tamaño md */}
            <div className="row row-cols-xs-2 row-cols-sm-3 row-cols-md-5 g-4">
                {heroes}
            </div>
        </div>
    )
}

export default HeroesList
