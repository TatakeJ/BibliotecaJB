import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUsuarioById, updateUsuario, deleteUsuario } from "../../api/usuariosApi.js";
import { getAllTiposDocumento, getAllRoles } from "../../api/catalogoApi.js";

function UsuariosId() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [tipoDocumento, setTipoDocumento] = useState([]);
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({});
    const [originalData, setOriginalData] = useState(null);

    useEffect(() => {
        if (id) {
            getUsuarioById(id)
                .then(data => {
                    setUsuario(data);
                    setFormData(data);
                    setOriginalData(data);
                })
                .catch(error => {
                    setError(error.message);
                    setUsuario(null);
                });

            getAllTiposDocumento()
                .then(setTipoDocumento)
                .catch(console.error);

            getAllRoles()
                .then(setRoles)
                .catch(console.error);
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        
        if (originalData) {
            const fields = [
                'id_usu', 'rol_usu', 'nom_usu', 'apell_usu', 'correo_usu',
                'tipo_doc_usu', 'num_doc_usu', 'dircc_usu', 'tipo_rol', 'tipo_doc'
            ];

            const getVal = (obj, key) => {
                if (!obj) return undefined;
                if (obj[key] !== undefined) return obj[key];
                const dash = key.replace(/_/g, '-');
                return obj[dash] !== undefined ? obj[dash] : obj[key];
            };

            const changed = fields.some(k => {
                const orig = (getVal(originalData, k) ?? "").toString();
                const cur = (getVal(formData, k) ?? "").toString();
                return orig !== cur;
            });

            if (!changed) {
                alert("No hay cambios para actualizar.");
                return;
            }
        }

        try {
            await updateUsuario(id, formData);
            alert("Usuario actualizado exitosamente");
            navigate("/usuarios");
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDelete = async () => {
        const ok = window.confirm("¿Seguro que desea eliminar este usuario? Esta acción no se puede deshacer.");
        if (!ok) return;

        try {
            await deleteUsuario(id);
            alert("Usuario eliminado correctamente.");
            navigate("/usuarios");
        } catch (err) {
            console.error(err);
            setError(err.message || "Error al eliminar el usuario.");
        }
    };

    if (error) return <p>Error: {error}</p>;
    if (!usuario) return <p>Cargando...</p>;

    return (
        <>
        <div class="card w-50 mx-auto my-4 text-center">
            <div class="card-header">
                <h2>Detalle del usuario {id}</h2>
            </div>
            <div class="card-body">
                <p><b>Nombre:</b> {usuario.nom_usu}</p>
                <p><b>Apellido:</b> {usuario.apell_usu}</p>
                <p><b>Email:</b> {usuario.correo_usu}</p>
                <p><b>Tipo de documento:</b> {usuario.tipo_doc_usu}</p>
                <p><b>Número de documento:</b> {usuario.num_doc_usu}</p>
                <p><b>Dirección:</b> {usuario.dircc_usu}</p>
                <p><b>Rol:</b> {usuario.tipo_rol}</p>
            </div>
            <div class="card-footer">
                <button onClick={() => document.getElementById("form-actualizar").style.display = "block"}>
                    Editar
                </button>
                <button onClick={handleDelete}>Eliminar</button>
            </div>
        </div>
        <div class="card w-50 mx-auto my-4 text-center" id="form-actualizar" style={{display: "none"}}>
            <div class="card-header">
                <h3>Actualizar Usuario</h3>
            </div>
            <div class="card-body">
                <form onSubmit={handleUpdate}>
                    <div>
                        <label htmlFor="nom_usu">Nombre:</label>
                        <input 
                            type="text" 
                            id="nom_usu" 
                            name="nom_usu" 
                            value={formData.nom_usu || ''} 
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="apell_usu">Apellido:</label>
                        <input 
                            type="text" 
                            id="apell_usu" 
                            name="apell_usu" 
                            value={formData.apell_usu || ''} 
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="correo_usu">Email:</label>
                        <input 
                            type="email" 
                            id="correo_usu" 
                            name="correo_usu" 
                            value={formData.correo_usu || ''} 
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="documento">Tipo de documento:</label>
                        <select name="tipo_doc_usu" id="tipo_doc_usu" value={formData.tipo_doc_usu || ''} onChange={handleChange}>
                            <option value="">Seleccione un documento</option>
                            {tipoDocumento.map((doc) => (
                                <option key={doc.id_doc} value={doc.id_doc}>
                                    {doc.tipo_doc}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="num_doc_usu">Número de documento:</label>
                        <input 
                            type="text" 
                            id="num_doc_usu" 
                            name="num_doc_usu" 
                            value={formData.num_doc_usu || ''} 
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="dircc_usu">Dirección:</label>
                        <input 
                            type="text" 
                            id="dircc_usu" 
                            name="dircc_usu" 
                            value={formData.dircc_usu || ''} 
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="documento">Tipo de rol:</label>
                        <select name="rol_usu" id="rol_usu" value={formData.rol_usu || ''} onChange={handleChange}>
                            <option value="">Seleccione un rol</option>
                            {roles.map((rol) => (
                                <option key={rol.id_rol} value={rol.id_rol}>
                                    {rol.tipo_rol}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit">Guardar Cambios</button>
                    <button type="button" onClick={() => document.getElementById("form-actualizar").style.display = "none"}>
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
        </>
    );
}

export default UsuariosId;