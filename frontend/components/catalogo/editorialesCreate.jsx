import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { createEditorial } from "../../api/catalogoApi.js"; 


function EditorialesCreate() {

    const navigate = useNavigate();

    const [form, setForm] = React.useState({
        nom_edito: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // validaciones mínimas
        if (form.nom_edito.trim() === "") {
            alert("Ingrese el nombre del género.");
            return;
        }

        try {
            await createEditorial(form);
            navigate("/editoriales");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="cont-create">
            <h1>Crear Nuevo Editorial</h1>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Nombre:</span>
                        <input type="text" className="form-control" id="nom_edito" name="nom_edito" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={form.nom_edito} onChange={handleChange} required/>
                    </div>

                    <button type="submit" class="btn btn-success">Guardar Editorial</button>
                </form>
            </div>
        </div>
    )
}

export default EditorialesCreate;