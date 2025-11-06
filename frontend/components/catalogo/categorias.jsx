import React from "react";
import { getAllCategorias } from "../../api/catalogoApi"; 
import '../../src/styles/libros/libros.css';

function Categorias() {
    const [categorias, setcategorias] = React.useState([]);

    // Al montar el componente, hacemos la petición al backend
    React.useEffect(() => {
        getAllCategorias()
        .then(setcategorias)
        .catch(console.error);
    }, []);

    return (
        <div style={{ padding: "20px" }}>
        <h2>Lista de Categorias</h2>
        <table className="table-libros table table-striped-columns">
            <thead style={{ background: "#eee" }}>
            <tr>
                <th>id_categ</th>
                <th>nom_categ</th>
            </tr>
            </thead>
            <tbody>
            {categorias.map((categ) => (
                <tr key={categ.id_categ}>
                <td>{categ.id_categ}</td>
                <td>{categ.nom_categ}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}

export default Categorias;
