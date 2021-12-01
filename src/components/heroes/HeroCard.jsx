import { Link } from "react-router-dom"
// El tener una tarjeta en un componente esta puede ser reciclado en nuestro codigo
const HeroCard = ({ id, superhero, publisher, alter_ego, first_appearance, characters }) => {
    // const editorial = publisher.toLowerCase();
    return (
        // Cada tarjeta sera un col; esto ajusta automaticamente los anchos
        <div className="col">
            <div className="card">
                <img src={`/assets/${id}.jpg`} className="card-img-top" alt={superhero} />
                <div className="card-body">
                    <h5 className="card-title">{superhero}</h5>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Alter ego: {alter_ego}</li>
                        <li className="list-group-item">First appearance: {first_appearance}</li>
                        <li className="list-group-item">Characters: {characters}</li>
                    </ul>
                    <div className="card-footer">
                        <Link to={`/hero/${id}`}>Ver mejor...</Link>
                        {/* `/${editorial}/${id}` */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroCard
