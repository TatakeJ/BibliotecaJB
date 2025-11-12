import React from "react";
import { Link } from "react-router-dom";
import { getAllPrestamos, devolverLibro } from "../../api/prestamosApi.js"; 
import ModuleNav from "../common/ModuleNav.jsx";
import '../../src/styles/libros/libros.css';

function Prestamos() {
    const [prestamos, setPrestamos] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [query, setQuery] = React.useState("");
    const itemsPerPage = 10;

    // Al montar el componente, hacemos la petición al backend
    React.useEffect(() => {
        loadPrestamos();
    }, []);

    // helper para recargar la lista
    const loadPrestamos = () => {
        getAllPrestamos()
            .then((data) => {
                setPrestamos(data);
                setCurrentPage(1);
            })
            .catch(console.error);
    };

    // Filtrar todos los préstamos por la consulta
    const filteredPrestamos = prestamos.filter((prest) => {
        const text = [
            prest.id_prest,
            prest.id_usu,
            prest.id_libro,
            prest.nom_usu,
            prest.apell_usu,
            prest.correo_usu,
            prest.nom_libro,
            prest.isbn,
            prest.nom_autor,
            prest.fecha_prest,
            prest.fecha_devol
        ].join(" ").toString().toLowerCase();
        return text.includes(query.toLowerCase());
    });

    // Calcular total de páginas según los resultados filtrados
    const totalPages = Math.max(1, Math.ceil(filteredPrestamos.length / itemsPerPage));

    // Asegurar que currentPage esté dentro de rango cuando cambian los resultados
    React.useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    // Calcular índices para la página actual usando filteredPrestamos
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPrestamos = filteredPrestamos.slice(indexOfFirstItem, indexOfLastItem);

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

    // Handler para devolver libro con confirmación
    const handleDevolver = async (prest) => {
        if (prest.fecha_entrega_final) {
            alert("Este préstamo ya fue devuelto.");
            return;
        }

        const ok = window.confirm("¿Confirmar devolución del libro \"" + prest.nom_libro + "\" para " + prest.nom_usu + " " + prest.apell_usu + " ?");
        if (!ok) return;

        const fechaHoy = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
        try {
            await devolverLibro(prest.id_prest, fechaHoy);
            alert("Devolución registrada.");
            loadPrestamos(); // refrescar lista
        } catch (err) {
            console.error(err);
            alert(err.message || "Error al devolver el libro.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <ModuleNav />
            <h2>Lista de Prestamos</h2>
            <div className="container text-center">
                <div className="row">
                    <div className="col">
                        <Link to="/createPrestamo">
                            <button style={{ margin: "10px", padding: "10px 20px" }}>Crear prestamo</button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="filter">
                <input
                    type="text"
                    id="ipt-filter"
                    placeholder="Buscar préstamo"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setCurrentPage(1);
                    }}
                />
            </div>

            <table className="table-libros table table-striped-columns" border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead style={{ background: "#eee" }}>
                    <tr>
                        <th>id_prest</th>
                        <th>Usuario</th>
                        <th>Libro</th>
                        <th>fecha_prest</th>
                        <th>fecha_devol</th>
                        <th>fecha_entrega_final</th>
                        <th>Email</th>
                        <th>ISBN</th>
                        <th>Autor</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPrestamos.length === 0 ? (
                        <tr>
                            <td colSpan="10" style={{ textAlign: "center" }}>
                                {filteredPrestamos.length === 0 ? "No se encontraron resultados" : "No hay elementos en esta página"}
                            </td>
                        </tr>
                    ) : (
                        currentPrestamos.map((prest) => (
                            <tr key={prest.id_prest}>
                                <td>{prest.id_prest}</td>
                                <td>{prest.nom_usu} {prest.apell_usu}</td>
                                <td>{prest.nom_libro}</td>
                                <td>{prest.fecha_prest}</td>
                                <td>{prest.fecha_devol}</td>
                                <td>{prest.fecha_entrega_final || "Pendiente"}</td>
                                <td>{prest.correo_usu}</td>
                                <td>{prest.isbn}</td>
                                <td>{prest.nom_autor}</td>
                                <td style={{ display: "flex", gap: "5px" }}>
                                    <button
                                        onClick={() => handleDevolver(prest)}
                                        disabled={!!prest.fecha_entrega_final}
                                        style={{ padding: "5px 10px" }}
                                    >
                                        Devolver
                                    </button>
                                    <Link to={`/prestamos/${prest.id_prest}`}>
                                        <button style={{ padding: "5px 10px" }}>Ver</button>
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
                    Página {currentPage} de {totalPages} | Resultados: {filteredPrestamos.length} | Total de préstamos: {prestamos.length}
                </p>
            </div>
        </div>
    );
}

export default Prestamos;
