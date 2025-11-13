import React from "react";
import { Link } from "react-router-dom";
import { getAllGeneros } from "../../api/catalogoApi";
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import ModuleNav from "../common/ModuleNav.jsx";

function Generos() {
    const [generos, setGeneros] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [query, setQuery] = React.useState("");
    const itemsPerPage = 10;

    React.useEffect(() => {
        getAllGeneros()
            .then(data => {
                setGeneros(data);
                setCurrentPage(1);
            })
            .catch(console.error);
    }, []);

    const filteredGeneros = generos.filter((gen) => {
        const text = [
            gen.id_gen,
            gen.nom_gen
        ].join(" ").toString().toLowerCase();
        return text.includes(query.toLowerCase());
    });

    const totalPages = Math.max(1, Math.ceil(filteredGeneros.length / itemsPerPage));

    React.useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentGeneros = filteredGeneros.slice(indexOfFirstItem, indexOfLastItem);

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
            <h2 style={{textAlign: "center", marginBottom: "20px"}}>Lista de Géneros</h2>

            <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px",padding: "10px"}}>
                <div className="input-group w-25">
                    <span className="input-group-text" id="basic-addon1"><FaSearch /></span>
                    <input type="text" id="ipt-filter" className="form-control" placeholder="Buscar géneros" aria-label="Buscar géneros" aria-describedby="basic-addon1" value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setCurrentPage(1); // volver a la primera página cuando cambia la búsqueda
                    }}/>
                </div>
                <div className="container">
                    <Link to="/generosCreate">
                        <button type="button" class="btn btn-outline-primary">Crear géneros</button>
                    </Link>
                </div>
            </div>

            <table className="table-libros table table-striped-columns" border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead style={{ background: "#eee" }}>
                    <tr>
                        <th>id_gen</th>
                        <th>nom_gen</th>
                    </tr>
                </thead>
                <tbody>
                    {currentGeneros.length === 0 ? (
                        <tr>
                            <td colSpan="2" style={{ textAlign: "center" }}>
                                {filteredGeneros.length === 0 ? "No se encontraron resultados" : "No hay elementos en esta página"}
                            </td>
                        </tr>
                    ) : (
                        currentGeneros.map((gen) => (
                            <tr key={gen.id_gen}>
                                <td>{gen.id_gen}</td>
                                <td>{gen.nom_gen}</td>
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
                Página {currentPage} de {totalPages} | Resultados: {filteredGeneros.length} | Total de libros: {generos.length}
                </p>
            </div>
        </div>
    );
}

export default Generos;
