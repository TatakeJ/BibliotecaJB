import React from "react";
import { getAllAutores } from "../../api/catalogoApi"; 
import '../../src/styles/libros/libros.css';

function Autores() {
    const [autores, setAutores] = React.useState([]);

    // Al montar el componente, hacemos la petición al backend
    React.useEffect(() => {
        getAllAutores()
        .then(setAutores)
        .catch(console.error);
    }, []);

    return (
        <div style={{ padding: "20px" }}>
        <h2>Lista de Autores</h2>
        <table className="table-libros table table-striped-columns">
            <thead style={{ background: "#eee" }}>
            <tr>
                <th>id_autor</th>
                <th>nom_autor</th>
                <th>nacionalidad</th>
            </tr>
            </thead>
            <tbody>
            {autores.map((autor) => (
                <tr key={autor.id_autor}>
                <td>{autor.id_autor}</td>
                <td>{autor.nom_autor}</td>
                <td>{autor.nacionalidad}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}

export default Autores;
