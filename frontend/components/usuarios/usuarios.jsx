import React from "react";
import { Link } from "react-router-dom";
import { getAllUsuarios } from "../../api/usuariosApi.js";
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";
import { FaSearch } from "react-icons/fa"; 
import ModuleNav from "../common/ModuleNav.jsx";

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
            <div style={{marginBottom: "20px"}} class="container text-center">
                <div class="row">
                    <ModuleNav />
                </div>
            </div>
            <h2 style={{textAlign: "center", marginBottom: "20px"}}>Lista de Usuarios</h2>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px",padding: "10px"}}>
                <div className="input-group w-25">
                    <span className="input-group-text" id="basic-addon1"><FaSearch /></span>
                    <input type="text" id="ipt-filter" className="form-control" placeholder="Buscar usuario" aria-label="Buscar usuario" aria-describedby="basic-addon1" value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setCurrentPage(1); // volver a la primera página cuando cambia la búsqueda
                    }}/>
                </div>
                <div className="container">
                    <Link to="/createUsuario">
                        <button type="button" class="btn btn-outline-primary">Crear usuario</button>
                    </Link>
                </div>
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
                Página {currentPage} de {totalPages} | Resultados: {filteredUsuarios.length} | Total de libros: {usuarios.length}
                </p>
            </div>
        </div>
    );
}

export default Usuarios;
