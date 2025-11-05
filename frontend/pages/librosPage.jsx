import { Link } from "react-router-dom";

function librosPage() {
    return (
        <div style={{ padding: "30px", textAlign: "center", fontFamily: "sans-serif" }}>
        <h1>📚 Bienvenido al Sistema de Biblioteca</h1>
        <p>Selecciona una opción para comenzar:</p>

        <div style={{ marginTop: "20px" }}>
            <Link to="/libros">
            <button style={{ margin: "10px", padding: "10px 20px" }}>📘 Ver todos los libros</button>
            </Link>

            <Link to="/libros/1">
            <button style={{ margin: "10px", padding: "10px 20px" }}>🔍 Buscar libro por ID</button>
            </Link>
        </div>
        </div>
    );
}

export default librosPage;