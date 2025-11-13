import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUsuario } from "../../api/usuariosApi.js";
import { getAllTiposDocumento, getAllRoles } from "../../api/catalogoApi.js";

function UsuariosCreate() {

    const navigate = useNavigate();
    const [error, setError] = React.useState(null);
    const [tiposDocumento, setTiposDocumento] = React.useState([]);
    const [roles, setRoles] = React.useState([]);

    const [form, setForm] = React.useState({
        rol_usu: "",
        nom_usu: "",
        apell_usu: "",
        correo_usu: "",
        tipo_doc_usu: "",
        num_doc_usu: "",
        dircc_usu: "",
    });

    React.useEffect(() => {
        getAllTiposDocumento().then(setTiposDocumento).catch(console.error);
        getAllRoles().then(setRoles).catch(console.error);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // validaciones mínimas
        if (form.nom_usu.trim() === "") {
            alert("Ingrese el nombre del usuario.");
            return;
        }
        if (form.apell_usu.trim() === "") {
            alert("Ingrese el apellido del usuario.");
            return;
        }
        if (form.correo_usu.trim() === "") {
            alert("Ingrese el email del usuario.");
            return;
        }
        if (form.num_doc_usu.trim() === "") {
            alert("Ingrese el número de documento.");
            return;
        }

        try {
            await createUsuario(form);
            navigate("/usuarios");
        } catch (err) {
            console.error(err);
            setError(err.message || "Error al crear el usuario.");
        }
    };

    return (
        <div className="cont-create">
            <h1>Crear Nuevo Usuario</h1>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Nombre:</span>
                        <input type="text" className="form-control" id="nom_usu" name="nom_usu" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={form.nom_usu} onChange={handleChange} required/>
                    </div>

                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Apellido:</span>
                        <input type="text" className="form-control" id="apell_usu" name="apell_usu" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={form.apell_usu} onChange={handleChange} required/>
                    </div>

                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Email:</span>
                        <input type="email" className="form-control" id="correo_usu" name="correo_usu" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={form.correo_usu} onChange={handleChange} required/>
                    </div>

                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Tipo de documento:</span>
                        <select className="form-select" aria-label="Default select example" name="tipo_doc_usu" id="select-categoria" value={form.tipo_doc_usu} onChange={handleChange} required>
                            <option value="">Seleccione una tipo de documento</option>
                            {tiposDocumento.map((doc) => (
                                <option key={doc.id_doc} value={doc.id_doc}>
                                    {doc.tipo_doc}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Número de Documento:</span>
                        <input type="text" className="form-control" id="num_doc_usu" name="num_doc_usu" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={form.num_doc_usu} onChange={handleChange} required/>
                    </div>

                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Dirección:</span>
                        <input type="text" className="form-control" id="dircc_usu" name="dircc_usu" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={form.dircc_usu} onChange={handleChange}/>
                    </div>

                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Tipo de Rol:</span>
                        <select className="form-select" aria-label="Default select example" name="rol_usu" id="select-categoria" value={form.rol_usu} onChange={handleChange}>
                            <option value="">Seleccione una tipo de Rol</option>
                            {roles.map((rol) => (
                                <option key={rol.id_rol} value={rol.id_rol}>
                                    {rol.tipo_rol}
                                </option>
                            ))}
                        </select>
                    </div>

                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <button type="submit" class="btn btn-success">Guardar Usuario</button>
                </form>
            </div>
        </div>
    )
}

export default UsuariosCreate;