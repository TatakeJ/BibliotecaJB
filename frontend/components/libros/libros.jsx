import { useEffect, useState } from "react";
import { getAllLibros } from "../../api/librosApi.js";

function Libros() {
  const [libros, setLibros] = useState([]);

  var URL = "http://localhost:5173/libros/";

  // Al montar el componente, hacemos la petición al backend
  useEffect(() => {
    getAllLibros().then(setLibros).catch(console.error);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lista de libros</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead style={{ background: "#eee" }}>
          <tr>
            <th>Detalle</th>
            <th>id_libro</th>
            <th>nom_libro</th>
            <th>id_categ</th>
            <th>id_gen</th>
            <th>cant_ejempla</th>
            <th>dispo_libro</th>
            <th>id_autor</th>
            <th>año_libro</th>
            <th>id_edito</th>
            <th>edicion_libro</th>
            <th>isbn</th>
            <th>fecha_ingreso</th>
            <th>idioma</th>
            <th>nom_categ</th>
            <th>nom_gen</th>
            <th>nom_autor</th>
            <th>nacionalidad</th>
            <th>nom_edito</th>
          </tr>
        </thead>
        <tbody>
          {libros.map((libro) => (
            <tr key={libro.id_libro}>
              <td><a href={URL + libro.id_libro}>Detalle</a></td>
              <td>{libro.id_libro}</td>
              <td>{libro.nom_libro}</td>
              <td>{libro.id_categ}</td>
              <td>{libro.id_gen}</td>
              <td>{libro.cant_ejempla}</td>
              <td>{libro.dispo_libro}</td>
              <td>{libro.id_autor}</td>
              <td>{libro.año_libro}</td>
              <td>{libro.id_edito}</td>
              <td>{libro.edicion_libro}</td>
              <td>{libro.isbn}</td>
              <td>{libro.fecha_ingreso}</td>
              <td>{libro.idioma}</td>
              <td>{libro.nom_categ}</td>
              <td>{libro.nom_gen}</td>
              <td>{libro.nom_autor}</td> 
              <td>{libro.nacionalidad}</td>
              <td>{libro.nom_edito}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Libros;
