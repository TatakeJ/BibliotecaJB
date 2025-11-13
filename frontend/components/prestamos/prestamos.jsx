import React from "react";
import { Link } from "react-router-dom";
import { getAllPrestamos, devolverLibro } from "../../api/prestamosApi.js";
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import ModuleNav from "../common/ModuleNav.jsx";

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
            <div style={{marginBottom: "20px"}} class="container text-center">
                <div class="row">
                    <ModuleNav />
                </div>
            </div>
            <h2 style={{textAlign: "center", marginBottom: "20px"}}>Lista de Prestamos</h2>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px",padding: "10px"}}>
                <div className="input-group w-25">
                    <span className="input-group-text" id="basic-addon1"><FaSearch /></span>
                    <input type="text" id="ipt-filter" className="form-control" placeholder="Buscar prestamo" aria-label="Buscar prestamo" aria-describedby="basic-addon1" value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setCurrentPage(1); // volver a la primera página cuando cambia la búsqueda
                    }}/>
                </div>
                <div className="container">
                    <Link to="/createPrestamo">
                        <button type="button" class="btn btn-outline-primary">Crear prestamo</button>
                    </Link>
                </div>
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
                                        type="button" 
                                        className="btn btn-outline-info"
                                        onClick={() => handleDevolver(prest)}
                                        disabled={!!prest.fecha_entrega_final}
                                        style={{ padding: "5px 10px" }}
                                    >
                                        Devolver
                                    </button>
                                    <Link to={`/prestamos/${prest.id_prest}`}>
                                        <button type="button" className="btn btn-outline-success">Ver</button>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Controles de paginación */}
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
                Página {currentPage} de {totalPages} | Resultados: {filteredPrestamos.length} | Total de libros: {prestamos.length}
                </p>
            </div>
        </div>
    );
}

export default Prestamos;
