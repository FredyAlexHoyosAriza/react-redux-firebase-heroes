import React, { useMemo } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { getHeroById } from '../../selectors/getHeroById';

// Object { "*": "hero/marvel-captain", heroId: "marvel-captain" }
// El asterisco representa el current path o la ruta actual, es decir, 'hero/marvel-captain',
// el campo heroId es todo lo que se define luego de 'hero/', tal y como se establecio en el
// DashboardRouter

const HeroScreen = () => {
    const { heroId } = useParams();
    const navigate = useNavigate() ;
    // const hero = getHeroById(heroId);
    // console.log(hero);
    // pero es mejor tener todos los campos del objeto desestruturados
    // try { // Si no encuentra el heroId se regresa a la raiz, sin doblar el uso de la memoria
    //     var { id, superhero, publisher, alter_ego, first_appearance, characters } = getHeroById(heroId);
    // } catch (error) {
    //     return <Navigate to='/' />;        
    // }

    // Si agregamos nuevo contenido a nuestra HeroCard como un campo en el que constantemente se actualice un gif,
    // esto implicaria un cambio en el estado general de nuestro componente, por lo cual todos los metodo en el
    // componente se volverian a llamar. Para evitar al rellamado de funciones cuyos parametros (dependencias) no
    // han cambiado, es necesario usar el hook useMemo

    // getHeroById(heroId)
    const hero = useMemo(() => getHeroById(heroId), [heroId]);
    if (!hero) {
        // En caso de una busqueda fallida, no se debe ejecutar un return vacio; un componente debe
        // retornar un componente, por ello en lugar de un return sin contenido podemos hacer uso
        // del componente Navigate que nos dirige hacia una ruta deseada, en este caso la ruta raiz
        return <Navigate to='/marvel' />;
    }
    const { id, superhero, publisher, alter_ego, first_appearance, characters } = hero;

    const handleBack = () => {
        // Enviando un -1 a la funcion navigate esta nos devuelve a la ruta anterior
        // En versiones anteriores de React esto se lograba realizando operaciones sobre el history
       navigate(-1);
    }

    return (
        // <b></b> equivale a className='fw-bold'.  margin-top: 5x  -> className='mt-5'
        <div className="card container"
            style={{ justifyContent: 'center', fontFamily: 'cursive', paddingTop: '1%', paddingBottom: '1%' }}
        >
            <div className="row g-0">
                <div className='col-md-4 p-2'>
                    <img src={`./assets/${id}.jpg`} className="card-img-top" alt={superhero} />
                </div>
                <div className='col-md-8'>
                    <div className="card-body">
                        <br />
                        <h1 className="card-title"><b>{publisher}</b></h1>
                        <hr />
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><h2>Superhero: {superhero}</h2></li>
                            <li className="list-group-item"><h3>Alter ego: {alter_ego}</h3></li>
                            <li className="list-group-item"><h3>First appearance: {first_appearance}</h3></li>
                            <li className="list-group-item"><h3>Characters: {characters}</h3></li>
                        </ul>
                        <div className="card-footer">
                            {/* <Link to={`/hero/${id}`}><h3>Regresar</h3></Link> */}
                            <button
                            className='btn btn-primary w-100'
                            // Los eventos onClick no recargan la pagina, si lo hacen los eventos submit
                            onClick={handleBack}
                            >
                            Regresar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroScreen
