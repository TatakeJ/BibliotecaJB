import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from "../pages/homePage.jsx";
import GestorLibros from "../pages/librosPage.jsx";
import Libros from "../components/libros/libros.jsx";
import LibrosId from "../components/libros/librosId.jsx";
import LibrosCreate from "../components/libros/librosCreate.jsx";
import GestorCatalogo from "../pages/catalogoPage.jsx";
import Autores from "../components/catalogo/autores.jsx";
import AutoresCreate from "../components/catalogo/autoresCreate.jsx";
import Categorias from "../components/catalogo/categorias.jsx";
import Generos from "../components/catalogo/generos.jsx";
import Editoriales from "../components/catalogo/editoriales.jsx";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>📚 Biblioteca React Router</h1>

      {/* Rutas */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        //Rutas gestion de libros
        <Route path="/librosPage" element={<GestorLibros />} />
        <Route path="/libros" element={<Libros />} />
        <Route path="/libros/:id" element={<LibrosId />} />
        <Route path="/createLibros" element={<LibrosCreate />} />
        //Rutas gestion de catálogo
        <Route path="/catalogo" element={<GestorCatalogo />} />
        //Rutas de autores
        <Route path="/autores" element={<Autores />} />
        <Route path="/autoresCreate" element={<AutoresCreate />} />
        //Rutas de categorías, géneros, editoriales
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/generos" element={<Generos />} />
        <Route path="/editoriales" element={<Editoriales />} />
      </Routes>
    </div>
  );
}

export default App;
