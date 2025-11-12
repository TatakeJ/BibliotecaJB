import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createPrestamo } from "../../api/prestamosApi.js";
import { getAllLibros } from "../../api/librosApi.js";

function PrestamosCreate() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [libros, setLibros] = useState([]);
  const [error, setError] = useState(null);
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    id_usu: "",
    id_libro: "",
    fecha_prest: today,
    fecha_devol: "" // opcional; el usuario puede elegir
  });

  useEffect(() => {
    // cargar libros
    getAllLibros()
      .then(setLibros)
      .catch((err) => console.error("Error cargando libros:", err));

    // cargar usuarios (si tienes un usuariosApi puedes usarlo; aquí llamo directo al endpoint)
    fetch("http://localhost:5000/api/usuarios")
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) setUsuarios(data.data);
        else setUsuarios([]);
      })
      .catch((err) => {
        console.error("Error cargando usuarios:", err);
        setUsuarios([]);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.id_usu || !form.id_libro) {
      setError("Seleccione usuario y libro.");
      return;
    }

    // validar fechas
    if (form.fecha_devol) {
      const prest = new Date(form.fecha_prest);
      const devol = new Date(form.fecha_devol);
      if (devol < prest) {
        setError("La fecha de devolución no puede ser anterior a la fecha de préstamo.");
        return;
      }
    }

    try {
      await createPrestamo({
        id_usu: Number(form.id_usu),
        id_libro: Number(form.id_libro),
        fecha_prest: form.fecha_prest,
        fecha_devol: form.fecha_devol || null
      });

      alert("Préstamo creado correctamente.");
      navigate("/prestamos");
    } catch (err) {
      console.error(err);
      setError(err.message || "Error al crear el préstamo.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Crear Préstamo</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label>
          <select name="id_usu" value={form.id_usu} onChange={handleChange}>
            <option value="">Seleccione usuario</option>
            {usuarios.map((u) => (
              <option key={u.id_usu} value={u.id_usu}>
                {u.nom_usu} {u.apell_usu} ({u.correo_usu})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Libro:</label>
          <select name="id_libro" value={form.id_libro} onChange={handleChange}>
            <option value="">Seleccione libro</option>
            {libros.map((l) => (
              <option key={l.id_libro} value={l.id_libro}>
                {l.nom_libro} — {l.nom_autor} ({l.dispo_libro} / {l.cant_ejempla})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Fecha de préstamo:</label>
          <input
            type="date"
            name="fecha_prest"
            value={form.fecha_prest}
            onChange={handleChange}
            max="2100-12-31"
          />
        </div>

        <div>
          <label>Fecha de devolución (opcional):</label>
          <input
            type="date"
            name="fecha_devol"
            value={form.fecha_devol}
            onChange={handleChange}
            min={form.fecha_prest}
            max="2100-12-31"
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div style={{ marginTop: 10 }}>
          <button type="submit">Crear Préstamo</button>
          <Link to="/prestamos">
            <button type="button" style={{ marginLeft: 8 }}>
              Cancelar
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default PrestamosCreate;