import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLibroById } from "../../api/librosApi";

function LibrosId() {
    const { id } = useParams();
    const [libro, setLibro] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            getLibroById(id)
                .then(setLibro)
                .catch(error => {
                    setError(error.message);
                    setLibro(null);
                });
        }
    }, [id]);

    if (error) return <p>Error: {error}</p>;
    if (!libro) return <p>Cargando...</p>;

    return (
        <div>
        <h2>Detalle del libro {id}</h2>
        <p><b>Título:</b> {libro.nom_libro}</p>
        <p><b>Autor:</b> {libro.nom_autor}</p>
        <p><b>Categoría:</b> {libro.nom_categ}</p>
        <p><b>Editorial:</b> {libro.nom_edito}</p>
        </div>
    );
}

export default LibrosId;


