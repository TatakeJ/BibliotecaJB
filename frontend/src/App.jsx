import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from "../pages/homePage.jsx";
import Libros from "../components/libros/libros.jsx";
import LibrosId from "../components/libros/librosId.jsx";
import LibrosCreate from "../components/libros/librosCreate.jsx";
import GestorCatalogo from "../pages/catalogoPage.jsx";
import Autores from "../components/catalogo/autores.jsx";
import AutoresCreate from "../components/catalogo/autoresCreate.jsx";
import Categorias from "../components/catalogo/categorias.jsx";
import CategoriasCreate from "../components/catalogo/categoriasCreate.jsx";
import Generos from "../components/catalogo/generos.jsx";
import GenerosCreate from "../components/catalogo/generosCreate.jsx";
import Editoriales from "../components/catalogo/editoriales.jsx";
import EditorialesCreate from "../components/catalogo/editorialesCreate.jsx";
import Prestamos from "../components/prestamos/prestamos.jsx";
import PrestamosId from "../components/prestamos/prestamosId.jsx";
import PrestamosCreate from "../components/prestamos/prestamosCreate.jsx";
import Usuarios from "../components/usuarios/usuarios.jsx";
import UsuariosId from "../components/usuarios/usuariosId.jsx";
import UsuariosCreate from "../components/usuarios/usuariosCreate.jsx";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>📚 Biblioteca React Router</h1>

      {/* Rutas */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        //Rutas gestion de libros
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
        <Route path="/categoriasCreate" element={<CategoriasCreate />} />
        <Route path="/generos" element={<Generos />} />
        <Route path="/generosCreate" element={<GenerosCreate />} />
        <Route path="/editoriales" element={<Editoriales />} />
        <Route path="/editorialesCreate" element={<EditorialesCreate />} />
        //Rutas gestion de prestamos
        <Route path="/prestamos" element={<Prestamos />} />
        <Route path="/prestamos/:id" element={<PrestamosId />} />
        <Route path="/createPrestamo" element={<PrestamosCreate />} />
        /Rutas gestion de usuarios
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/usuarios/:id" element={<UsuariosId />} />
        <Route path="/createUsuario" element={<UsuariosCreate />} />

      </Routes>
    </div>
  );
}

export default App;
