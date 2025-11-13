import React from "react";
import { Link } from "react-router-dom";
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { getAllCategorias } from "../../api/catalogoApi"; 
import ModuleNav from "../common/ModuleNav.jsx";

function Categorias() {
    const [categorias, setCategorias] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [query, setQuery] = React.useState("");
    const itemsPerPage = 10;

    React.useEffect(() => {
        getAllCategorias()
            .then(data => {
                setCategorias(data);
                setCurrentPage(1);
            })
            .catch(console.error);
    }, []);

    const filteredCategorias = categorias.filter((categ) => {
        const text = [
            categ.id_categ,
            categ.nom_categ
        ].join(" ").toString().toLowerCase();
        return text.includes(query.toLowerCase());
    });

    const totalPages = Math.max(1, Math.ceil(filteredCategorias.length / itemsPerPage));

    React.useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCategorias = filteredCategorias.slice(indexOfFirstItem, indexOfLastItem);

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
            <h2 style={{textAlign: "center", marginBottom: "20px"}}>Lista de Categorías</h2>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px",padding: "10px"}}>
                <div className="input-group w-25">
                    <span className="input-group-text" id="basic-addon1"><FaSearch /></span>
                    <input type="text" id="ipt-filter" className="form-control" placeholder="Buscar categoría" aria-label="Buscar categoría" aria-describedby="basic-addon1" value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setCurrentPage(1); // volver a la primera página cuando cambia la búsqueda
                    }}/>
                </div>
                <div className="container">
                    <Link to="/categoriasCreate">
                        <button type="button" class="btn btn-outline-primary">Crear categoría</button>
                    </Link>
                </div>
            </div>
            <table className="table-libros table table-striped-columns" border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead style={{ background: "#eee" }}>
                    <tr>
                        <th>id_categ</th>
                        <th>nom_categ</th>
                    </tr>
                </thead>
                <tbody>
                    {currentCategorias.length === 0 ? (
                        <tr>
                            <td colSpan="2" style={{ textAlign: "center" }}>
                                {filteredCategorias.length === 0 ? "No se encontraron resultados" : "No hay elementos en esta página"}
                            </td>
                        </tr>
                    ) : (
                        currentCategorias.map((categ) => (
                            <tr key={categ.id_categ}>
                                <td>{categ.id_categ}</td>
                                <td>{categ.nom_categ}</td>
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
                    Página {currentPage} de {totalPages} | Resultados: {filteredCategorias.length} | Total de categorías: {categorias.length}
                </p>
            </div>
        </div>
    );
}

export default Categorias;
