import { Routes, Route } from "react-router-dom";
import DcScreen from "../components/dc/DcScreen";
import HeroScreen from "../components/heroes/HeroScreen";
import MarvelScreen from "../components/marvel/MarvelScreen";
import SearchScreen from "../components/search/SearchScreen";
import NavBar from "../components/ui/NavBar";
const DashboardRouter = () => {
    return (
        <>
            <NavBar />
            <div className='container-fluid'>
                <Routes>
                    {/* Aqui nuestras rutas no requieren '/' ya que este se asigna en el
                    router padre (AppRouter) al llamar este router con '/*'. Ademas puesto
                    que el Router se llama en el padre, aqui en el hijo no es requerido */}
                    <Route path="dc" element={<DcScreen />} />
                    <Route path="marvel" element={<MarvelScreen />} />
                    <Route path="search" element={<SearchScreen />} />
                    {/* Todo lo que aparezca despues de la ruta 'hero/' establecera el campo heroId en los params de la peticion */}
                    <Route path="hero/:heroId" element={<HeroScreen />} />
                    {/* Este '/' no se retira ya que representa la ruta raiz, y al usar el '/' se representa con claridad */}
                    <Route path="/" element={<MarvelScreen />} />
                </Routes>
            </div>
        </>
    )
}

export default DashboardRouter
