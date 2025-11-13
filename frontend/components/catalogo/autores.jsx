import React from "react";
import { Link } from "react-router-dom";
import { getAllAutores } from "../../api/catalogoApi"; 
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import ModuleNav from "../common/ModuleNav.jsx";

function Autores() {
    const [autores, setAutores] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [query, setQuery] = React.useState("");
    const itemsPerPage = 10;

    React.useEffect(() => {
        getAllAutores()
            .then(data => {
                setAutores(data);
                setCurrentPage(1);
            })
            .catch(console.error);
    }, []);

    const filteredAutores = autores.filter((autor) => {
        const text = [
            autor.id_autor,
            autor.nom_autor,
            autor.nacionalidad
        ].join(" ").toString().toLowerCase();
        return text.includes(query.toLowerCase());
    });

    const totalPages = Math.max(1, Math.ceil(filteredAutores.length / itemsPerPage));

    React.useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAutores = filteredAutores.slice(indexOfFirstItem, indexOfLastItem);

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
            <h2 style={{textAlign: "center", marginBottom: "20px"}}>Lista de Autores</h2>

            <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px",padding: "10px"}}>
                <div className="input-group w-25">
                    <span className="input-group-text" id="basic-addon1"><FaSearch /></span>
                    <input type="text" id="ipt-filter" className="form-control" placeholder="Buscar autor" aria-label="Buscar autor" aria-describedby="basic-addon1" value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setCurrentPage(1); // volver a la primera página cuando cambia la búsqueda
                    }}/>
                </div>
                <div className="container">
                    <Link to="/autoresCreate">
                        <button type="button" class="btn btn-outline-primary">Crear autor</button>
                    </Link>
                </div>
            </div>

            <table className="table-libros table table-striped-columns" border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead style={{ background: "#eee" }}>
                    <tr>
                        <th>id_autor</th>
                        <th>nom_autor</th>
                        <th>nacionalidad</th>
                    </tr>
                </thead>
                <tbody>
                    {currentAutores.length === 0 ? (
                        <tr>
                            <td colSpan="3" style={{ textAlign: "center" }}>
                                {filteredAutores.length === 0 ? "No se encontraron resultados" : "No hay elementos en esta página"}
                            </td>
                        </tr>
                    ) : (
                        currentAutores.map((autor) => (
                            <tr key={autor.id_autor}>
                                <td>{autor.id_autor}</td>
                                <td>{autor.nom_autor}</td>
                                <td>{autor.nacionalidad}</td>
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
                Página {currentPage} de {totalPages} | Resultados: {filteredAutores.length} | Total de libros: {autores.length}
                </p>
            </div>
        </div>
    );
}

export default Autores;
