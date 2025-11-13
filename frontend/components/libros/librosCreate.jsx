import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { createLibro } from "../../api/librosApi.js";
import { getAllCategorias } from "../../api/catalogoApi.js";
import { getAllGeneros } from "../../api/catalogoApi.js";
import { getAllAutores } from "../../api/catalogoApi.js";
import { getAllEditoriales } from "../../api/catalogoApi.js";

function LibrosCreate() {

    const navigate = useNavigate();
    const [categorias, setCategorias] = React.useState([]);
    const [generos, setGeneros] = React.useState([]);
    const [autores, setAutores] = React.useState([]);
    const [editoriales, setEditoriales] = React.useState([]);

    const [form, setForm] = React.useState({
        nom_libro: "",
        id_categ: "",
        id_gen: "",
        cant_ejempla: "",
        dispo_libro: "Disponible",
        id_autor: "",
        "año_libro": "",
        id_edito: "",
        edicion_libro: "",
        isbn: "",
        fecha_ingreso: "",
        idioma: ""
    });

    React.useEffect(() => {
        getAllCategorias().then(setCategorias).catch(console.error);
        getAllGeneros().then(setGeneros).catch(console.error);
        getAllAutores().then(setAutores).catch(console.error);
        getAllEditoriales().then(setEditoriales).catch(console.error);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // validaciones mínimas
        if (form.nom_libro.trim() === "") {
            alert("Ingrese el título del libro.");
            return;
        }
        if (!form.id_categ || !form.id_gen) {
            alert("Seleccione categoría y género.");
            return;
        }

        try {
            await createLibro(form);
            navigate("/libros");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="cont-create">
            <h1>Crear Nuevo Libro</h1>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Titulo:</span>
                        <input type="text" className="form-control" id="nom_libro" name="nom_libro" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={form.nom_libro} onChange={handleChange} required/>
                    </div>

                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Categoria:</span>
                        <select className="form-select" aria-label="Default select example" name="id_categ" id="select-categoria" value={form.id_categ} onChange={handleChange}>
                            <option value="">Seleccione una categoría</option>
                            {categorias.map((categ) => (
                                <option key={categ.id_categ} value={categ.id_categ}>
                                    {categ.nom_categ}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Genero:</span>
                        <select className="form-select" aria-label="Default select example" name="id_gen" id="select-genero" value={form.id_gen} onChange={handleChange}>
                            <option value="">Seleccione una genero</option>
                            {generos.map((gen) => (
                                <option key={gen.id_gen} value={gen.id_gen}>
                                    {gen.nom_gen}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Cantidad de ejemplares:</span>
                        <input type="number" className="form-control" id="cant_ejempla" name="cant_ejempla" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={form.cant_ejempla} onChange={handleChange} required/>
                    </div>

                    <fieldset>
                        <legend>Disponibilidad:</legend>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" id="disponible" name="dispo_libro" value="Disponible" checked={form.dispo_libro === "Disponible"} onChange={handleChange}/>
                            <label className="form-check-label" htmlFor="disponible">
                                Disponible
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" id="prestado" name="dispo_libro" value="Prestado" checked={form.dispo_libro === "Prestado"} onChange={handleChange}/>
                            <label className="form-check-label" htmlFor="prestado">
                                Prestado
                            </label>
                        </div>
                    </fieldset>

                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Autor:</span>
                        <select className="form-select" aria-label="Default select example" name="id_autor" id="select-autor" value={form.id_autor} onChange={handleChange}>
                            <option value="">Seleccione un autor</option>
                            {autores.map((autor) => (
                                <option key={autor.id_autor} value={autor.id_autor}>
                                    {autor.nom_autor}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Año:</span>
                        <input type="date" className="form-control" id="ano_libro" name="año_libro" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={form["año_libro"]} onChange={handleChange} required/>
                    </div>

                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Editorial:</span>
                        <select className="form-select" aria-label="Default select example" name="id_edito" id="select-editorial" value={form.id_edito} onChange={handleChange}>
                            <option value="">Seleccione una editorial</option>
                            {editoriales.map((edito) => (
                                <option key={edito.id_edito} value={edito.id_edito}>
                                    {edito.nom_edito}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Edición:</span>
                        <input type="text" className="form-control" id="edicion_libro" name="edicion_libro" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={form.edicion_libro} onChange={handleChange} required/>
                    </div>

                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">ISBN:</span>
                        <input type="text" className="form-control" id="isbn" name="isbn" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={form.isbn} onChange={handleChange} required/>
                    </div>

                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Fecha de ingreso:</span>
                        <input type="date" className="form-control" id="fecha_ingreso" name="fecha_ingreso" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={form.fecha_ingreso} onChange={handleChange} required/>
                    </div>

                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Idioma:</span>
                        <input type="text" className="form-control" id="idioma" name="idioma" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={form.idioma} onChange={handleChange} required/>
                    </div>

                    <button type="submit" class="btn btn-success">Guardar Libro</button>
                </form>
            </div>
        </div>
    )
}

export default LibrosCreate;