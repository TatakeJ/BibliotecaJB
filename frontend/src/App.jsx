import { Routes, Route, Link } from "react-router-dom";
import HomePage from "../pages/homePage.jsx";
import GestorLibros from "../pages/librosPage.jsx";
import Libros from "../components/libros/libros.jsx";
import LibrosId from "../components/libros/librosId.jsx";
import LibrosCreate from "../components/libros/librosCreate.jsx";

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
        <Route path="/create" element={<LibrosCreate />} />
      </Routes>
    </div>
  );
}

export default App;
