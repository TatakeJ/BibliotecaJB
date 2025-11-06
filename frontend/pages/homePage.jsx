import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div style={{ padding: "30px", textAlign: "center", fontFamily: "sans-serif" }}>
        <h1>📚 Bienvenido al Sistema de Biblioteca</h1>
        <p>Selecciona un módulo para gestionar:</p>

        <div style={{ marginTop: "20px" }}>
            <Link to="/librosPage">
            <button style={{ margin: "10px", padding: "10px 20px" }}>📘 Libros</button>
            </Link>

            <Link to="/catalogo">
            <button style={{ margin: "10px", padding: "10px 20px" }}>📗 Catálogo</button>
            </Link>

            <Link to="/prestamosPage">
            <button style={{ margin: "10px", padding: "10px 20px" }}>📖 Préstamos</button>
            </Link>

            {/* <Link to="/usuarios">
            <button style={{ margin: "10px", padding: "10px 20px" }}>👤 Usuarios</button>
            </Link> */}
        </div>
        </div>
    );
}

export default HomePage;
