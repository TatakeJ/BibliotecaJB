import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../src/styles/libros/librosCreate.css";
import { createGenero } from "../../api/catalogoApi.js"; 


function GenerosCreate() {

    const navigate = useNavigate();

    const [form, setForm] = React.useState({
        nom_gen: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // validaciones mínimas
        if (form.nom_gen.trim() === "") {
            alert("Ingrese el nombre del género.");
            return;
        }

        try {
            await createGenero(form);
            navigate("/generos");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="cont-create">
            <h1>Crear Nuevo Género</h1>
            <div className="cont-form">
                <form onSubmit={handleSubmit}>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Nombre:</span>
                        <input type="text" className="form-control" id="nom_gen" name="nom_gen" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={form.nom_gen} onChange={handleChange} required/>
                    </div>

                    <button type="submit">Guardar Género</button>
                </form>
            </div>
        </div>
    )
}

export default GenerosCreate;