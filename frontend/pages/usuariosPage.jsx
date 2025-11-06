import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../src/styles/libros/librosPage.css';

function UsuariosPage() {

    return (
        <div className="cont-opc-libro">
            <div className="cont-bienvenida">
                <h1>📚 Bienvenido al Sistema de Biblioteca</h1>
                <p>Selecciona una opción para comenzar:</p>
            </div>
            <div className="container text-center">
                <div className="row">

                    <Link to="/usuarios">
                    <button style={{ margin: "10px", padding: "10px 20px" }}>Ver todos los autores</button>
                    </Link>

                    {/* <Link to="/autoresCreate">
                    <button style={{ margin: "10px", padding: "10px 20px" }}>Guardar autor</button>
                    </Link>

                    <Link to="/categorias">
                    <button style={{ margin: "10px", padding: "10px 20px" }}>Categorias</button>
                    </Link>

                    <Link to="/generos">
                    <button style={{ margin: "10px", padding: "10px 20px" }}>Generos</button>
                    </Link>

                    <Link to="/editoriales">
                    <button style={{ margin: "10px", padding: "10px 20px" }}>Editoriales</button>
                    </Link> */}

                </div>
            </div>
        </div>
    );
}

export default UsuariosPage;