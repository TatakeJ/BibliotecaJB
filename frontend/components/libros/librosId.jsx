import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLibroById } from "../../api/librosApi";

function LibrosId() {
    const { id } = useParams(); // 👈 toma el ID desde la URL
    const [libro, setLibro] = useState(null);

    useEffect(() => {
        if (id) {
        getLibroById(id).then(setLibro).catch(console.error);
        }
    }, [id]);

    if (!libro) return <p>Cargando libro...</p>;

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


