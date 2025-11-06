import React from "react";
import { getAllPrestamos } from "../../api/prestamosApi.js"; 
import '../../src/styles/libros/libros.css';

function Prestamos() {
    const [prestamos, setPrestamos] = React.useState([]);

    // Al montar el componente, hacemos la petición al backend
    React.useEffect(() => {
        getAllPrestamos()
        .then(setPrestamos)
        .catch(console.error);
    }, []);

    return (
        <div style={{ padding: "20px" }}>
        <h2>Lista de Prestamos</h2>
        <table className="table-libros table table-striped-columns">
            <thead style={{ background: "#eee" }}>
            <tr>
                <th>id_prest</th>
                <th>id_usu</th>
                <th>id_libro</th>
                <th>fecha_prest</th>
                <th>fecha_devol</th>
                <th>fecha_entrega_final</th>
                <th>nom_usu</th>
                <th>apell_usu</th>
                <th>correo_usu</th>
                <th>nom_libro</th>
                <th>isbn</th>
                <th>nom_autor</th>
            </tr>
            </thead>
            <tbody>
            {prestamos.map((prest) => (
                <tr key={prest.id_prest}>
                <td>{prest.id_prest}</td>
                <td>{prest.id_usu}</td>
                <td>{prest.id_libro}</td>
                <td>{prest.fecha_prest}</td>
                <td>{prest.fecha_devol}</td>
                <td>{prest.fecha_entrega_final}</td>
                <td>{prest.nom_usu}</td>
                <td>{prest.apell_usu}</td>
                <td>{prest.correo_usu}</td>
                <td>{prest.nom_libro}</td>
                <td>{prest.isbn}</td>
                <td>{prest.nom_autor}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}

export default Prestamos;
