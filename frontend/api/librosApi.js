import { Link, useNavigate } from "react-router-dom";

export async function getAllLibros() {
    try {
        const res = await fetch("http://localhost:5000/api/libros");
        const data = await res.json();
        
        if (!data.data) {
            throw new Error('Libros no encontrados');
        }
        
        return data.data;
    } catch (error) {
        throw new Error('No se pudo obtener la lista de libros');
    }
}

export async function getLibroById(id) {
    try {
        const res = await fetch(`http://localhost:5000/api/libros/${id}`);
        const data = await res.json();
        
        if (!data.data) {
            throw new Error('Libro no encontrado');
        }
        
        return data.data;
    } catch (error) {
        throw new Error('No se pudo encontrar el libro solicitado');
    }
}

export async function createLibro(form) {
    const navigate = useNavigate();

    try {
        const res = await fetch("http://localhost:5000/api/libros/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });

        const data = await res.json();

        if (!res.ok) {
            // muestra el mensaje devuelto por el backend si existe
            alert(data.message || "Error al crear el libro.");
            return;
        }

        alert("Libro creado correctamente (id: " + (data.id ?? "") + ")");
        navigate("/libros");
    } catch (err) {
        console.error(err);
        alert("Error de red al intentar crear el libro.");
    }
}

export async function updateLibro(id, form) {
    try {
        const validFields = {
            nom_libro: form.nom_libro,
            id_categ: form.id_categ,
            id_gen: form.id_gen,
            cant_ejempla: form.cant_ejempla,
            dispo_libro: form.dispo_libro,
            id_autor: form.id_autor,
            "año_libro": form["año_libro"] ? form["año_libro"].split('T')[0] : null,
            id_edito: form.id_edito,
            edicion_libro: form.edicion_libro,
            isbn: form.isbn,
            fecha_ingreso: form.fecha_ingreso ? form.fecha_ingreso.split('T')[0] : null,
            idioma: form.idioma
        };

        const res = await fetch(`http://localhost:5000/api/libros/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(validFields)
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Error al actualizar el libro");
        }

        return data;
    } catch (error) {
        throw new Error('No se pudo actualizar el libro: ' + error.message);
    }
}

export async function deleteLibro(id) {
    try {
        const res = await fetch(`http://localhost:5000/api/libros/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Error al eliminar el libro');
        }

        return data;
    } catch (error) {
        throw new Error('No se pudo eliminar el libro: ' + error.message);
    }
}