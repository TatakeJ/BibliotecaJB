import { Routes, Route, Link } from "react-router-dom";
import HomePage from "../pages/homePage.jsx";
import Libros from "../components/libros/libros.jsx";
import LibrosId from "../components/libros/librosId.jsx";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>📚 Biblioteca React Router</h1>

      {/* Barra de navegación */}
      {/* <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Inicio</Link>
        <Link to="/libros" style={{ marginRight: "10px" }}>Libros</Link>
      </nav> */}

      {/* Rutas */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/libros" element={<Libros />} />
        <Route path="/libros/:id" element={<LibrosId />} />
      </Routes>
    </div>
  );
}

export default App;
