import React from 'react' // rafce
import AppRouter from './routers/AppRouter'
import { Provider } from 'react-redux' // Se importa el Provider de react redux
import { store } from './store/store'

const HeroesApp = () => {

    // Ya no necesitamos crear un contexto ya redux nos brinda un context
    // Provider que podemos usar

    // Se define todo el aplicativo como un hijo del Provider.
    // A partir de aqui se envia un contexto a todo el aplicativo.
    // Quien realmente provee el contexto es el Provider de redux,
    // pero el Provider requiere de la store de reducers para enviarla a
    // lo largo del aplicativo, ya que esta es una especie de fuente de
    // verdad del estado del aplicativo. Ahora al revisar en el arbol de
    // componentes (navegador) vemos que despues del HeroesApp aparece el
    // Provider de redux. ya no se requiere state y dispatch sino la store
    return (

        // Nota: se provee a traves del Provider y se obtiene a traves del
        // useContext
        <Provider store={store}>
            {/* Se envia la store a traves del
            context del aplicativo, para que de esta forma los estados
            puedan ser actulizados, desde otras vistas y usando el metodo
            dispatch. P. ej. donde se requiera actulizar user Luego de
            una autenticacion o donde se requiera verificar si el user
            esta autenticado.*/}
            <AppRouter />
        </Provider>
    )
}

export default HeroesApp


