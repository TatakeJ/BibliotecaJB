import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllLibros } from "../../api/librosApi.js";
import ModuleNav from "../common/ModuleNav.jsx";
import '../../src/styles/libros/libros.css';

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
      <ModuleNav />
      <h2>Lista de libros</h2>
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <Link to="/createLibros">
              <button style={{ margin: "10px", padding: "10px 20px" }}>Guardar libro</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="filter">
        <input
          type="text"
          id="ipt-filter"
          placeholder="Buscar libro"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setCurrentPage(1); // volver a la primera página cuando cambia la búsqueda
          }}
        />
      </div>

      <table className="table-libros" border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
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
                    <button>Ver</button>
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Controles de paginación */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          style={{ marginRight: "10px", padding: "8px 15px" }}
        >
          ← Anterior
        </button>

        {/* Mostrar números de página */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            style={{
              margin: "0 5px",
              padding: "8px 12px",
              backgroundColor: currentPage === page ? "#007bff" : "#f0f0f0",
              color: currentPage === page ? "white" : "black",
              border: "1px solid #ddd",
              cursor: "pointer",
              borderRadius: "4px"
            }}
          >
            {page}
          </button>
        ))}

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          style={{ marginLeft: "10px", padding: "8px 15px" }}
        >
          Siguiente →
        </button>

        <p style={{ marginTop: "10px" }}>
          Página {currentPage} de {totalPages} | Resultados: {filteredLibros.length} | Total de libros: {libros.length}
        </p>
      </div>
    </div>
  );
}

export default Libros;
