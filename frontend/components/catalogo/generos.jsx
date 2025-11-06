import React from "react";
import { getAllGeneros } from "../../api/catalogoApi"; 
import '../../src/styles/libros/libros.css';

function Generos() {
    const [generos, setGeneros] = React.useState([]);

    // Al montar el componente, hacemos la petición al backend
    React.useEffect(() => {
        getAllGeneros()
        .then(setGeneros)
        .catch(console.error);
    }, []);

    return (
        <div style={{ padding: "20px" }}>
        <h2>Lista de generos</h2>
        <table className="table-libros table table-striped-columns">
            <thead style={{ background: "#eee" }}>
            <tr>
                <th>id_gen</th>
                <th>nom_gen</th>
            </tr>
            </thead>
            <tbody>
            {generos.map((gen) => (
                <tr key={gen.id_gen}>
                <td>{gen.id_gen}</td>
                <td>{gen.nom_gen}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}

export default Generos;
