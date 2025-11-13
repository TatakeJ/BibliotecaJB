import ModuleNav from "../components/common/ModuleNav";

function HomePage() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "30px", 
            textAlign: "center", 
            fontFamily: "sans-serif", 
            height: "100vh" }}>
            <h1>📚 Bienvenido al Sistema de Biblioteca</h1>
            <p>Selecciona un módulo para gestionar:</p>
            <div className="module-nav w-50 mx-auto my-4 p-3 h-50">
                <div className="container text-center h-100">
                    <div className="row row-cols-2 g-3 p-5 h-100">
                        <ModuleNav />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
