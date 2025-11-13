import React, { useRef } from "react";
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getAllLibros } from "../../api/librosApi.js";
import ModuleNav from "../common/ModuleNav.jsx";

function Libros() {
  const [libros, setLibros] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [query, setQuery] = React.useState(""); // <-- nuevo estado de búsqueda
  const itemsPerPage = 10;

  // Al montar el componente, hacemos la petición al backend
  React.useEffect(() => {
    getAllLibros()
      .then(data => {
        setLibros(data);
        setCurrentPage(1); // reiniciar a página 1
      })
      .catch(error => {
        console.error("Error al obtener libros:", error);
      });
  }, []);

  // Filtrar todos los libros por la consulta
  const filteredLibros = libros.filter((libro) => {
    const text = [
      libro.id_libro,
      libro.nom_libro,
      libro.nom_autor,
      libro.nom_categ,
      libro.nom_gen,
      libro.nom_edito,
      libro.dispo_libro
    ].join(" ").toString().toLowerCase();
    return text.includes(query.toLowerCase());
  });

  // Calcular total de páginas según los resultados filtrados
  const totalPages = Math.max(1, Math.ceil(filteredLibros.length / itemsPerPage));

  // Asegurar que currentPage esté dentro de rango cuando cambian los resultados
  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Calcular índices para la página actual usando filteredLibros
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLibros = filteredLibros.slice(indexOfFirstItem, indexOfLastItem);

  // Funciones para cambiar de página
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{marginBottom: "20px"}} className="container text-center">
        <div className="row">
          <ModuleNav />
        </div>
      </div>
      <h2 style={{textAlign: "center", marginBottom: "20px"}}>Lista de libros</h2>
      <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px",padding: "10px"}}>
        <div className="input-group w-25">
          <span className="input-group-text" id="basic-addon1"><FaSearch /></span>
          <input type="text" id="ipt-filter" className="form-control" placeholder="Buscar libro" aria-label="Buscar libro" aria-describedby="basic-addon1" value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCurrentPage(1); // volver a la primera página cuando cambia la búsqueda
            }}/>
        </div>
        <div className="container">
              <Link to="/createLibros">
                <button type="button" class="btn btn-outline-primary">Guardar libro</button>
              </Link>
        </div>
      </div>
      <table className="table table-striped-columns" border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th>ID</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Categoría</th>
            <th>Género</th>
            <th>Editorial</th>
            <th>Disponibilidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentLibros.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                {filteredLibros.length === 0 ? "No se encontraron resultados" : "No hay elementos en esta página"}
              </td>
            </tr>
          ) : (
            currentLibros.map((libro) => (
              <tr key={libro.id_libro}>
                <td>{libro.id_libro}</td>
                <td>{libro.nom_libro}</td>
                <td>{libro.nom_autor}</td>
                <td>{libro.nom_categ}</td>
                <td>{libro.nom_gen}</td>
                <td>{libro.nom_edito}</td>
                <td>{libro.dispo_libro}</td>
                <td>
                  <Link to={`/libros/${libro.id_libro}`}>
                    <button type="button" className="btn btn-outline-success">Ver</button>
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
        <div class="btn-group" role="group" aria-label="Basic example">
          <button
            type="button"
            className="btn btn-primary"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            style={{ marginRight: "10px", padding: "8px 15px" }}
          ><BsArrowBarLeft /></button>
          {/* Mostrar números de página */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              type="button"
              className="btn btn-primary"
              key={page}
              onClick={() => goToPage(page)}
              style={{
                    backgroundColor: currentPage === page ? "#8f969eff" : "#0b5ed7",
                    color: currentPage === page ? "white" : "black",}}
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            className="btn btn-primary"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            style={{
                    marginLeft: "10px", 
                    padding: "8px 15px"
                }}
          ><BsArrowBarRight /></button>
        </div>
        <p style={{ marginTop: "10px" }}>
          Página {currentPage} de {totalPages} | Resultados: {filteredLibros.length} | Total de libros: {libros.length}
        </p>
      </div>
    </div>
  );
}

export default Libros;
