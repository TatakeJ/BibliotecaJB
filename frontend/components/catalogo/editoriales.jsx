import React from "react";
import { getAllEditoriales } from "../../api/catalogoApi"; 
import '../../src/styles/libros/libros.css';

function Editoriales() {
    const [editoriales, setEditoriales] = React.useState([]);

    // Al montar el componente, hacemos la petición al backend
    React.useEffect(() => {
        getAllEditoriales()
        .then(setEditoriales)
        .catch(console.error);
    }, []);

    return (
        <div style={{ padding: "20px" }}>
        <h2>Lista de editoriales</h2>
        <table className="table-libros table table-striped-columns">
            <thead style={{ background: "#eee" }}>
            <tr>
                <th>id_edito</th>
                <th>nom_edito</th>
            </tr>
            </thead>
            <tbody>
            {editoriales.map((edito) => (
                <tr key={edito.id_edito}>
                <td>{edito.id_edito}</td>
                <td>{edito.nom_edito}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}

export default Editoriales;
