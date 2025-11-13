import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { createAutor } from "../../api/catalogoApi.js"; 


function AutoresCreate() {

    const navigate = useNavigate();

    const [form, setForm] = React.useState({
        nom_autor: "",
        nacionalidad: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // validaciones mínimas
        if (form.nom_autor.trim() === "" || form.nacionalidad.trim() === "") {
            alert("Ingrese el nombre y nacionalidad del autor.");
            return;
        }

        try {
            await createAutor(form);
            navigate("/autores");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="cont-create">
            <h1>Crear Nuevo Autor</h1>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Nombre:</span>
                        <input type="text" className="form-control" id="nom_autor" name="nom_autor" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={form.nom_autor} onChange={handleChange} required/>
                    </div>

                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Nacionalidad:</span>
                        <input type="text" className="form-control" id="nacionalidad" name="nacionalidad" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={form.nacionalidad} onChange={handleChange} required/>
                    </div>

                    <button type="submit" class="btn btn-success">Guardar Autor</button>
                </form>
            </div>
        </div>
    )
}

export default AutoresCreate;