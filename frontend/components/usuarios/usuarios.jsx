import React from "react";
import { Link } from "react-router-dom";
import { getAllUsuarios } from "../../api/usuariosApi.js"; 
import ModuleNav from "../common/ModuleNav.jsx";
import '../../src/styles/libros/libros.css';

function Usuarios() {
    const [usuarios, setUsuarios] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [query, setQuery] = React.useState("");
    const itemsPerPage = 10;

    // Al montar el componente, hacemos la petición al backend
    React.useEffect(() => {
        getAllUsuarios()
            .then((data) => {
                setUsuarios(data);
                setCurrentPage(1);
            })
            .catch(console.error);
    }, []);

    // Filtrar todos los usuarios por la consulta
    const filteredUsuarios = usuarios.filter((usu) => {
        const text = [
            usu.id_usu,
            usu.rol_usu,
            usu.nom_usu,
            usu.apell_usu,
            usu.correo_usu,
            usu.tipo_doc_usu,
            usu.num_doc_usu,
            usu.dircc_usu,
            usu.tipo_rol,
            usu.tipo_doc
        ].join(" ").toString().toLowerCase();
        return text.includes(query.toLowerCase());
    });

    // Calcular total de páginas según los resultados filtrados
    const totalPages = Math.max(1, Math.ceil(filteredUsuarios.length / itemsPerPage));

    // Asegurar que currentPage esté dentro de rango cuando cambian los resultados
    React.useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    // Calcular índices para la página actual usando filteredUsuarios
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsuarios = filteredUsuarios.slice(indexOfFirstItem, indexOfLastItem);

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
            <h2>Lista de Usuarios</h2>
            {/* <div className="container text-center">
                <div className="row">
                    <div className="col">
                    <Link to="/createLibros">
                        <button style={{ margin: "10px", padding: "10px 20px" }}>Guardar libro</button>
                    </Link>
                    </div>
                </div>
            </div> */}
            <div className="container text-center">
                <div className="row">
                    <div className="col">
                        <Link to="/createUsuario">
                            <button style={{ margin: "10px", padding: "10px 20px" }}>Crear usuario</button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="filter">
                <input
                    type="text"
                    id="ipt-filter"
                    placeholder="Buscar usuario"
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
                        <th>id_usu</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Tipo Doc</th>
                        <th>Num Doc</th>
                        <th>Dirección</th>
                        <th>Tipo Rol</th>
                        <th>Tipo Doc</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsuarios.length === 0 ? (
                        <tr>
                            <td colSpan="11" style={{ textAlign: "center" }}>
                                {filteredUsuarios.length === 0 ? "No se encontraron resultados" : "No hay elementos en esta página"}
                            </td>
                        </tr>
                    ) : (
                        currentUsuarios.map((usu) => (
                            <tr key={usu.id_usu}>
                                <td>{usu.id_usu}</td>
                                <td>{usu.nom_usu}</td>
                                <td>{usu.apell_usu}</td>
                                <td>{usu.correo_usu}</td>
                                <td>{usu.tipo_doc_usu}</td>
                                <td>{usu.num_doc_usu}</td>
                                <td>{usu.dircc_usu}</td>
                                <td>{usu.tipo_rol}</td>
                                <td>{usu.tipo_doc}</td>
                                <td>
                                    <Link to={`/usuarios/${usu.id_usu}`}>
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
                    Página {currentPage} de {totalPages} | Resultados: {filteredUsuarios.length} | Total de usuarios: {usuarios.length}
                </p>
            </div>
        </div>
    );
}

export default Usuarios;
