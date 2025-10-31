import { useEffect, useState } from "react";

function Libros() {
  const [libros, setLibros] = useState([]);

  // Al montar el componente, hacemos la petición al backend
  useEffect(() => {
    fetch("http://localhost:5000/api/libros")
      .then((res) => res.json())
      .then((data) => setLibros(data.data))
      .catch((error) => console.error("Error al obtener los libros:", error));
  }, []);

  return (
    <div>
      <h2>Lista de libros</h2>
      <table border="1">
        <thead>
          <tr>
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
          </tr>
        </thead>
        <tbody>
          {libros.map((libro) => (
            <tr key={libro.id_libro}>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Libros;
