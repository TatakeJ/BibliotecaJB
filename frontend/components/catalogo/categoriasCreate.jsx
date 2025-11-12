import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../src/styles/libros/librosCreate.css";
import { createCategoria } from "../../api/catalogoApi.js"; 


function CategoriasCreate() {

    const navigate = useNavigate();

    const [form, setForm] = React.useState({
        nom_categ: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // validaciones mínimas
        if (form.nom_categ.trim() === "") {
            alert("Ingrese la categoría.");
            return;
        }

        try {
            await createCategoria(form);
            navigate("/categorias");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="cont-create">
            <h1>Crear Nueva Categoria</h1>
            <div className="cont-form">
                <form onSubmit={handleSubmit}>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Nombre:</span>
                        <input type="text" className="form-control" id="nom_categ" name="nom_categ" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={form.nom_categ} onChange={handleChange} required/>
                    </div>

                    <button type="submit">Guardar Categoría</button>
                </form>
            </div>
        </div>
    )
}

export default CategoriasCreate;