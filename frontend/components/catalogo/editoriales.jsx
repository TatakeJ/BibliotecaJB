import React from "react";
import { Link } from "react-router-dom";
import { getAllEditoriales } from "../../api/catalogoApi"; 
import '../../src/styles/libros/libros.css';

function Editoriales() {
    const [editoriales, setEditoriales] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [query, setQuery] = React.useState("");
    const itemsPerPage = 10;

    React.useEffect(() => {
        getAllEditoriales()
            .then(data => {
                setEditoriales(data);
                setCurrentPage(1);
            })
            .catch(console.error);
    }, []);

    const filteredEditoriales = editoriales.filter((edito) => {
        const text = [
            edito.id_edito,
            edito.nom_edito
        ].join(" ").toString().toLowerCase();
        return text.includes(query.toLowerCase());
    });

    const totalPages = Math.max(1, Math.ceil(filteredEditoriales.length / itemsPerPage));

    React.useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentEditoriales = filteredEditoriales.slice(indexOfFirstItem, indexOfLastItem);

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
            <div className="container text-center">
                <div className="row">
                    <div className="col">
                        <Link to="/catalogo">
                        <button style={{ margin: "10px", padding: "10px 20px" }}>Atras</button>
                        </Link>
                    </div>
                </div>
            </div>
            <h2>Lista de Editoriales</h2>
            <div className="container text-center">
                <div className="row">
                    <div className="col">
                        <Link to="/editorialesCreate">
                            <button style={{ margin: "10px", padding: "10px 20px" }}>Crear editorial</button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="filter">
                <input
                    type="text"
                    id="ipt-filter"
                    placeholder="Buscar editorial"
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
                        <th>id_edito</th>
                        <th>nom_edito</th>
                    </tr>
                </thead>
                <tbody>
                    {currentEditoriales.length === 0 ? (
                        <tr>
                            <td colSpan="2" style={{ textAlign: "center" }}>
                                {filteredEditoriales.length === 0 ? "No se encontraron resultados" : "No hay elementos en esta página"}
                            </td>
                        </tr>
                    ) : (
                        currentEditoriales.map((edito) => (
                            <tr key={edito.id_edito}>
                                <td>{edito.id_edito}</td>
                                <td>{edito.nom_edito}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div style={{ marginTop: "20px", textAlign: "center" }}>
                <button onClick={goToPreviousPage} disabled={currentPage === 1} style={{ marginRight: "10px", padding: "8px 15px" }}>
                    ← Anterior
                </button>

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

                <button onClick={goToNextPage} disabled={currentPage === totalPages} style={{ marginLeft: "10px", padding: "8px 15px" }}>
                    Siguiente →
                </button>

                <p style={{ marginTop: "10px" }}>
                    Página {currentPage} de {totalPages} | Resultados: {filteredEditoriales.length} | Total: {editoriales.length}
                </p>
            </div>
        </div>
    );
}

export default Editoriales;
