import React from "react";
import { getAllUsuarios } from "../../api/usuaiosApi.js"; 
import '../../src/styles/libros/libros.css';

function Usuarios() {
    const [usuarios, setUsuarios] = React.useState([]);

    // Al montar el componente, hacemos la petición al backend
    React.useEffect(() => {
        getAllUsuarios()
        .then(setUsuarios)
        .catch(console.error);
    }, []);

    return (
        <div style={{ padding: "20px" }}>
        <h2>Lista de Usuarios</h2>
        <table className="table-libros table table-striped-columns">
            <thead style={{ background: "#eee" }}>
            <tr>
                <th>id_usu</th>
                <th>rol_usu</th>
                <th>nom_usu</th>
                <th>apell_usu</th>
                <th>correo_usu</th>
                <th>tipo_doc_usu</th>
                <th>num_doc_usu</th>
                <th>dircc_usu</th>
                <th>tipo_rol</th>
                <th>tipo_doc</th>
            </tr>
            </thead>
            <tbody>
            {usuarios.map((usu) => (
                <tr key={usu.id_usu}>
                    <td>{usu.id_usu}</td>
                    <td>{usu.rol_usu}</td>
                    <td>{usu.nom_usu}</td>
                    <td>{usu.apell_usu}</td>
                    <td>{usu.correo_usu}</td>
                    <td>{usu.tipo_doc_usu}</td>
                    <td>{usu.num_doc_usu}</td>
                    <td>{usu.dircc_usu}</td>
                    <td>{usu.tipo_rol}</td>
                    <td>{usu.tipo_doc}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}

export default Usuarios;
