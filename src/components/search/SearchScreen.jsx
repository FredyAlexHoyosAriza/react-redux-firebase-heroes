import React, { useMemo } from 'react' //, useState 
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { useForm } from '../../hooks/useForm';
import { getHeroesByName } from '../../selectors/getHeroesByName'
import HeroCard from '../heroes/HeroCard';


// Para caprturar lo value de toodos los input que se tengan en el formulario se requiere un custom hook conocido
// como Los value son retornados en un objeto el cual desestructuraremos para obtener los inputs requeridos
const SearchScreen = () => {

    // Usaremos el hook location, el cual nos permite la ruta actual en la que se este
    const location = useLocation();
    const navigate = useNavigate();

    // console.log(location);
    // Object { pathname: "/search", search: "", hash: "", state: null, key: "default" }
    // de aqui nos interesan el pathname y el search, es decir, la ruta actual y el query de busqueda.
    // requerimos instalar: npm i query-string

    //  q='': default value cuando no existe un query de busqueda en la url
    const { q = '' } = queryString.parse(location.search) // el metodo parse se usa para capturar el location.search
    // console.log(q); // q = 'spider'
    // El queryString permite extraer el campo search del objeto location, el cual almacena en sus campos los
    // diferentes contenidos de la url

    // Para capturar los valores del formulario usamos el custom hook useForm
    const [formValues, handleInputChange] = useForm({ // definimos el objeto initialState
        // searchText se inicializa con el valor de la query q
        searchText: q
    })
    // El useForm permite que el texto de busqueda (query) en el input se guarde en un estado interno al useForm.
    // Si se recarga la pagina, a fin de cuentas, se actualiza el texto del input con el valor del search en el
    // objeto location, el cual se captura como una peticion (q) usando el metodo parse de la libreria queryString.

    // useForm retorna un arreglo con 2 elementos; los formValues son todos los valores del formaulario que se esta
    // capturando y la funcion llamada handleInputChange que permite conectar cada input value con su estado, es
    // decir, que esta funcion permite actualizar el estado asignado a cada input value usando como identificador
    // el name de cada input.
    // Nota" El metodo handleInputChange es el metodo (event-listener) que se asigna al evento onChange

    const { searchText } = formValues;
    // formaValues contiene todos los elementos del formulario, es decir, que si este tuviese 50 inputs diferentes
    // se podria capturar cada value respectivo y extraerlos todos a partir de destructuracion

    // const [searchText, setSearchText] = useState(q);
    // const [heroesQuery, setHeroesQuery] = useState([]);

    // const handleInputChange = (e) => {
    //     setSearchText(e.target.value);
    // }

    const handleSearch = (e) => {
        e.preventDefault();
        //setHeroesQuery(getHeroesByName(searchText));
        // Al actualizar el navigate con el texto de busqueda (query) en el input, este texto aparece al final de la
        // url y por ende, de forma implicita se actualiza el campo search del objeto location, lo cual implica que si
        // se recarga la pagina, entonces, con el queryString.parse se extraera nuevamente el query (q), que se envia
        // como estado inicial del custom hook useForm, que es un hook de estado para el manejo de multiples estados,
        // y por ende, retorna un objeto que podria contener multiples estados el cual se desestructura para obetener
        // el campo searchText que se asigna al value del input, y ademas tambien retorna una funcion para el manejo
        // de multiples estados; const [formValues, handleInputChange] = useForm({searchText: q})
        navigate(`?q=${searchText}`)
        // Al hacer submit se actualiza el campo search de la url y por ende, se actualiza el location.search, al cual
        // se puede acceder con la referencia q
    }

    // Solamente cuando se detecte un cambio en q se llama a getHeroesByName. El segundo parametro es un array con las
    // dependencias escuchadas, es decir que un cambio en cualquiera de estas, ejecuta el llamado al callback function,
    // el cual toma las dependencias como parametros; en este caso un cambio en q provoca un llamado a getHeroesByName
    const heroes = useMemo(() => getHeroesByName(q), [q]);

    return (
        <div>
            <h1>Search Screen</h1>
            <hr />
            <div className="row">
                {/* Se toman 5 de 12 columnas en el row */}
                <div className="col-5">
                    {/* <h3>
                        Buscar heroe
                    </h3> */}
                    <form action="search"
                        className='row g-3' // g-3: el 3 indica la separacion los hijos directos (divs) en el form
                        onSubmit={handleSearch}
                    >
                        <div className='col-12'>
                            <label htmlFor="heroes" className='form-label'>Buscar héroe: </label>
                            <input
                                id='heroes'
                                type="text"
                                placeholder='Digite un nombre de heroe'
                                className='form-control'
                                autoComplete='off' // Se desactivan sugerencias de busqueda
                                // Se asigna un nombre al campo input; este sera el nombre con el que se podra obtener
                                // el value del input a traves del hook useForm. El nombre debe ser unico ya que este
                                // sera el identificador para obtener el value
                                name="searchText"
                                onChange={handleInputChange}
                                value={searchText} // El valor del value se guarda en el searchText y viceversa 
                            />
                        </div>
                        {/* El contenedor div es col-12 pero el hijo button tiene su tamaño por default */}
                        <div className='col-12'>
                            <button className='btn btn-primary' type='submit'>Buscar</button>
                        </div>
                    </form>

                </div>
                {/* Se toman 7 de 12 columnas en el row*/}
                <div className="col-7">
                    <h3>
                        Resultados
                    </h3>
                    <div className="row row-cols-xs-2 row-cols-sm-3 row-cols-md-3 g-4">
                        {
                            heroes.map((hero) => (
                                <HeroCard key={hero.id} {...hero} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchScreen
