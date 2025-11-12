import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLibroById, updateLibro, deleteLibro } from "../../api/librosApi";
import { getAllCategorias, getAllGeneros, getAllAutores, getAllEditoriales } from "../../api/catalogoApi.js";

function LibrosId() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [autores, setAutores] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [editoriales, setEditoriales] = useState([]);
    const [libro, setLibro] = useState(null);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({});
    const [originalData, setOriginalData] = useState(null);

    useEffect(() => {
        if (id) {
            getLibroById(id)
                .then(data => {
                    // Formatear la fecha antes de establecerla en el estado
                    const formattedData = {
                        ...data,
                        "año_libro": data["año_libro"] ? data["año_libro"].split('T')[0] : '',
                        fecha_ingreso: data.fecha_ingreso ? data.fecha_ingreso.split('T')[0] : ''
                    };
                    setLibro(data);
                    setFormData(formattedData);
                    setOriginalData(formattedData);
                })
                .catch(error => {
                    setError(error.message);
                    setLibro(null);
                });

            getAllCategorias()
                .then(setCategorias)
                .catch(console.error);

            getAllGeneros()
                .then(setGeneros)
                .catch(console.error);

            getAllAutores()
                .then(setAutores)
                .catch(console.error);

            getAllEditoriales()
                .then(setEditoriales)
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
                'nom_libro','id_categ','id_gen','cant_ejempla','dispo_libro',
                'id_autor','año_libro','id_edito','edicion_libro','isbn','fecha_ingreso','idioma'
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
            await updateLibro(id, formData);
            alert("Libro actualizado exitosamente");
            navigate("/libros"); // Redirigir a la lista de libros
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDelete = async () => {
        const ok = window.confirm("¿Seguro que desea eliminar este libro? Esta acción no se puede deshacer.");
        if (!ok) return;

        try {
            await deleteLibro(id);
            alert("Libro eliminado correctamente.");
            navigate("/libros");
        } catch (err) {
            console.error(err);
            setError(err.message || "Error al eliminar el libro.");
        }
    };

    if (error) return <p>Error: {error}</p>;
    if (!libro) return <p>Cargando...</p>;

    return (
        <>
            <div className="detalle-libro">
                <h2>Detalle del libro {id}</h2>
                <p><b>Título:</b> {libro.nom_libro}</p>
                <p><b>Autor:</b> {libro.nom_autor}</p>
                <p><b>Categoría:</b> {libro.nom_categ}</p>
                <p><b>Editorial:</b> {libro.nom_edito}</p>
            </div>
            
            <div>
                <button onClick={() => document.getElementById("form-actualizar").style.display = "block"}>
                    Editar
                </button>
                <button onClick={handleDelete}>Eliminar</button>
            </div>

            <div id="form-actualizar" style={{display: "none"}}>
                <h3>Actualizar Libro</h3>
                <form onSubmit={handleUpdate}>
                    <div>
                        <label htmlFor="nom_libro">Título:</label>
                        <input 
                            type="text" 
                            id="nom_libro" 
                            name="nom_libro" 
                            value={formData.nom_libro || ''} 
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="categoria">Categoria:</label>
                        <select name="id-categoria" id="select-categoria" value={formData.id_categ || ''} onChange={handleChange}>
                            <option value="">Seleccione una categoria</option>
                            {categorias.map((categ) => (
                                <option key={categ.id_categ} value={categ.id_categ}>
                                    {categ.nom_categ}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="genero">Genero:</label>
                        <select name="id-genero" id="select-genero" value={formData.id_categ || ''} onChange={handleChange}>
                            <option value="">Seleccione una genero</option>
                            {generos.map((gen) => (
                                <option key={gen.id_gen} value={gen.id_gen}>
                                    {gen.nom_gen}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="cant_ejempla">Cantidad de ejemplares:</label>
                        <input 
                            type="number" 
                            id="cant_ejempla" 
                            name="cant_ejempla" 
                            value={formData.cant_ejempla || ''} 
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="dispo_libro">Disponibilidad:</label>
                        <select 
                            id="dispo_libro" 
                            name="dispo_libro" 
                            value={formData.dispo_libro || ''} 
                            onChange={handleChange}
                        >
                            <option value="Disponible">Disponible</option>
                            <option value="Prestado">Prestado</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="autor">Autor:</label>
                        <select name="id-autor" id="select-autor" value={formData.id_autor || ''} onChange={handleChange}>
                            <option value="">Seleccione un autor</option>
                            {autores.map((autor) => (
                                <option key={autor.id_autor} value={autor.id_autor}>
                                    {autor.nom_autor}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="ano_libro">Año:</label>
                        <input 
                            type="date" 
                            id="ano_libro" 
                            name="año_libro" 
                            value={formData["año_libro"] || ''} 
                            onChange={handleChange}
                            max="2100-12-31"
                        />
                    </div>

                    <div>
                        <label htmlFor="editorial">Editorial:</label>
                        <select name="id-editorial" id="select-editorial" value={formData.id_edito || ''} onChange={handleChange}>
                            <option value="">Seleccione una editorial</option>
                            {editoriales.map((edito) => (
                                <option key={edito.id_edito} value={edito.id_edito}>
                                    {edito.nom_edito}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="edicion_libro">Edición:</label>
                        <input 
                            type="text" 
                            id="edicion_libro" 
                            name="edicion_libro" 
                            value={formData.edicion_libro || ''} 
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="isbn">ISBN:</label>
                        <input 
                            type="text" 
                            id="isbn" 
                            name="isbn" 
                            value={formData.isbn || ''} 
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="fecha_ingreso">Fecha de ingreso:</label>
                        <input 
                            type="date" 
                            id="fecha_ingreso" 
                            name="fecha_ingreso" 
                            value={formData.fecha_ingreso || ''} 
                            onChange={handleChange}
                            max="2100-12-31"
                        />
                    </div>

                    <div>
                        <label htmlFor="idioma">Idioma:</label>
                        <input 
                            type="text" 
                            id="idioma" 
                            name="idioma" 
                            value={formData.idioma || ''} 
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit">Guardar Cambios</button>
                    <button type="button" onClick={() => document.getElementById("form-actualizar").style.display = "none"}>
                        Cancelar
                    </button>
                </form>
            </div>
        </>
    );
}

export default LibrosId;