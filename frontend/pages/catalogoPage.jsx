import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ModuleNav from "../components/common/ModuleNav";
import '../src/styles/libros/librosPage.css';

function CatalogoPage() {

    return (
        <div className="cont-opc-libro">
            <ModuleNav />
            <div className="cont-bienvenida">
                <h1>📚 Bienvenido al Sistema de Biblioteca</h1>
                <p>Selecciona una opción para comenzar:</p>
            </div>
            <div className="container text-center">
                <div className="row">
                    <div className="col">
                        <Link to="/autores">
                        <button style={{ margin: "10px", padding: "10px 20px" }}>Ver autores</button>
                        </Link>
                    </div>
                    <div className="col">
                        <Link to="/categorias">
                        <button style={{ margin: "10px", padding: "10px 20px" }}>Ver categorías</button>
                        </Link>
                    </div>
                    <div className="col">
                        <Link to="/generos">
                        <button style={{ margin: "10px", padding: "10px 20px" }}>Generos</button>
                        </Link>
                    </div>
                    <div className="col">
                        <Link to="/editoriales">
                        <button style={{ margin: "10px", padding: "10px 20px" }}>Editoriales</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CatalogoPage;