import React from "react";
import { createLibro } from "../../api/librosApi.js";
import { getAllCategorias } from "../../api/catalogoApi.js";
import { getAllGeneros } from "../../api/catalogoApi.js";
import { getAllAutores } from "../../api/catalogoApi.js";
import { getAllEditoriales } from "../../api/catalogoApi.js";

function LibrosCreate() {

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

        createLibro(form);
    };

    return (
        <div>
            <h1>Crear Nuevo Libro</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nom_libro">Titulo:</label>
                <input type="text" id="nom_libro" name="nom_libro" value={form.nom_libro} onChange={handleChange} required />
                <br />

                <label htmlFor="select-categoria">Categoria:</label>
                <select name="id_categ" id="select-categoria" value={form.id_categ} onChange={handleChange}>
                    <option value="">Seleccione una categoría</option>
                    {categorias.map((categ) => (
                        <option key={categ.id_categ} value={categ.id_categ}>
                            {categ.nom_categ}
                        </option>
                    ))}
                </select>
                <br />

                <label htmlFor="select-genero">Genero:</label>
                <select name="id_gen" id="select-genero" value={form.id_gen} onChange={handleChange}>
                    <option value="">Seleccione un genero</option>
                    {generos.map((gen) => (
                        <option key={gen.id_gen} value={gen.id_gen}>
                            {gen.nom_gen}
                        </option>
                    ))}
                </select>
                <br />

                <label htmlFor="cant_ejempla">Cantidad de ejemplares:</label>
                <input type="number" id="cant_ejempla" name="cant_ejempla" value={form.cant_ejempla} onChange={handleChange} />
                <br />

                <fieldset>
                    <legend>Disponibilidad:</legend>
                    <div>
                        <input type="radio" id="disponible" name="dispo_libro" value="Disponible" checked={form.dispo_libro === "Disponible"} onChange={handleChange}/>
                        <label htmlFor="disponible">Disponible</label>
                    </div>
                    <div>
                        <input type="radio" id="prestado" name="dispo_libro" value="Prestado" checked={form.dispo_libro === "Prestado"} onChange={handleChange}/>
                        <label htmlFor="prestado">Prestado</label>
                    </div>
                </fieldset>
                <br />

                <label htmlFor="select-autor">Autor:</label>
                <select name="id_autor" id="select-autor" value={form.id_autor} onChange={handleChange}>
                    <option value="">Seleccione un autor</option>
                    {autores.map((autor) => (
                        <option key={autor.id_autor} value={autor.id_autor}>
                            {autor.nom_autor}
                        </option>
                    ))}
                </select>
                <br />

                <label htmlFor="ano_libro">Año:</label>
                <input type="date" id="ano_libro" name="año_libro" value={form["año_libro"]} onChange={handleChange} />
                <br />

                <label htmlFor="select-editorial">Editorial:</label>
                <select name="id_edito" id="select-editorial" value={form.id_edito} onChange={handleChange}>
                    <option value="">Seleccione una editorial</option>
                    {editoriales.map((edito) => (
                        <option key={edito.id_edito} value={edito.id_edito}>
                            {edito.nom_edito}
                        </option>
                    ))}
                </select>
                <br />

                <label htmlFor="edicion_libro">Edición:</label>
                <input type="text" id="edicion_libro" name="edicion_libro" value={form.edicion_libro} onChange={handleChange} />
                <br />

                <label htmlFor="isbn">ISBN:</label>
                <input type="text" id="isbn" name="isbn" value={form.isbn} onChange={handleChange} />
                <br />

                <label htmlFor="fecha_ingreso">Fecha de ingreso:</label>
                <input type="date" id="fecha_ingreso" name="fecha_ingreso" value={form.fecha_ingreso} onChange={handleChange} />
                <br />

                <label htmlFor="idioma">Idioma:</label>
                <input type="text" id="idioma" name="idioma" value={form.idioma} onChange={handleChange} />
                <br />

                <button type="submit">Guardar Libro</button>
            </form>
        </div>
    )
}

export default LibrosCreate;