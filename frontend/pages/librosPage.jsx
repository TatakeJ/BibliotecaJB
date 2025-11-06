import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../src/styles/libros/librosPage.css';

function LibrosPage() {
  const libroIdRef = useRef(null);
  const navigate = useNavigate();

  const obtainId = () => {
    const endId = libroIdRef.current?.value ?? "";

    if (endId.trim() === "") {
      alert("Por favor ingresa un ID válido.");
      return;
    }

    navigate(`/libros/${endId}`);
  };

  return (
    <div className="cont-opc-libro">
      <div className="cont-bienvenida">
        <h1>📚 Bienvenido al Sistema de Biblioteca</h1>
        <p>Selecciona una opción para comenzar:</p>
      </div>
      <div className="container text-center">
        <div className="row">
          {/* <div className="col"> */}
            <Link to="/libros">
              <button style={{ margin: "10px", padding: "10px 20px" }}>📘 Ver todos los libros</button>
            </Link>
          {/* </div> */}
          {/* <div className="col"> */}
            <Link to="/createLibros">
              <button style={{ margin: "10px", padding: "10px 20px" }}>Guardar libro</button>
            </Link>
          {/* </div> */}
          {/* <div className="col"> */}
            <input className="int-libroId" ref={libroIdRef} type="text" id="libroId" placeholder="Ingresa el id a consultar" />
            <button onClick={obtainId} style={{ margin: "10px", padding: "10px 20px" }}>🔍 Buscar libro por ID</button>
          {/* </div> */}
        </div>
      </div>

      {/* <div style={{ marginTop: "20px" }}>
        <Link to="/libros">
          <button style={{ margin: "10px", padding: "10px 20px" }}>📘 Ver todos los libros</button>
        </Link>

        <input ref={libroIdRef} type="text" id="libroId" placeholder="Ingresa el id a consultar" />
        <button onClick={obtainId} style={{ margin: "10px", padding: "10px 20px" }}>🔍 Buscar libro por ID</button>

        <Link to="/create">
          <button style={{ margin: "10px", padding: "10px 20px" }}>Guardar libro</button>
        </Link>
      </div> */}
    </div>
  );
}

export default LibrosPage;