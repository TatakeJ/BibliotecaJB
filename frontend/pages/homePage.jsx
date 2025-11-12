import ModuleNav from "../components/common/ModuleNav";

function HomePage() {
    return (
        <div style={{ padding: "30px", textAlign: "center", fontFamily: "sans-serif" }}>
        <h1>📚 Bienvenido al Sistema de Biblioteca</h1>
        <p>Selecciona un módulo para gestionar:</p>

        <ModuleNav />
        </div>
    );
}

export default HomePage;
