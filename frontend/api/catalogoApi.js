export async function getAllCategorias() {
    try {
        const res = await fetch("http://localhost:5000/api/catalogo/categorias");
        const data = await res.json();
        
        if (!data.data) {
            throw new Error('Categorias no encontrados');
        }
        
        return data.data;
    } catch (error) {
        throw new Error('No se pudo obtener la lista de categorias');
    }
}

export async function createCategoria(form) {
    try {
        const res = await fetch("http://localhost:5000/api/catalogo/categorias", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });

        const data = await res.json();

        if (!res.ok) {
            // muestra el mensaje devuelto por el backend si existe
            alert(data.message || "Error al crear la categoria.");
            return;
        }

        alert("Categoria creada correctamente (id: " + (data.id ?? "") + ")");
    } catch (err) {
        console.error(err);
        alert("Error de red al intentar crear la categoria.");
    }
}

export async function getAllGeneros() {
    try {
        const res = await fetch("http://localhost:5000/api/catalogo/generos");
        const data = await res.json();
        
        if (!data.data) {
            throw new Error('Generos no encontrados');
        }

        return data.data;
    } catch (error) {
        throw new Error("No se pudo obtener la lista de generos");
        
    }
}

export async function createGenero(form) {
    try {
        const res = await fetch("http://localhost:5000/api/catalogo/generos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });

        const data = await res.json();

        if (!res.ok) {
            // muestra el mensaje devuelto por el backend si existe
            alert(data.message || "Error al crear el genero.");
            return;
        }

        alert("Genero creado correctamente (id: " + (data.id ?? "") + ")");
    } catch (err) {
        console.error(err);
        alert("Error de red al intentar crear el genero.");
    }
}

export async function getAllAutores() {
    try {
        const res = await fetch("http://localhost:5000/api/catalogo/autores");
        const data = await res.json();

        if (!data.data) {
            throw new Error('Autores no encontrados');
        }

        return data.data;
    } catch (error) {
        throw new Error("No se pudo obtener la lista de auotores");
        
    }
}

export async function createAutor(form) {
    try {
        const res = await fetch("http://localhost:5000/api/catalogo/autores", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });

        const data = await res.json();

        if (!res.ok) {
            // muestra el mensaje devuelto por el backend si existe
            alert(data.message || "Error al crear el autor.");
            return;
        }

        alert("Autor creado correctamente (id: " + (data.id ?? "") + ")");
    } catch (err) {
        console.error(err);
        alert("Error de red al intentar crear el autor.");
    }
}

export async function getAllEditoriales() {
    try {
        const res = await fetch("http://localhost:5000/api/catalogo/editoriales");
        const data = await res.json();

        if (!data.data) {
            throw new Error('Editoriales no encontrados');
        }

        return data.data;
    } catch (error) {
        throw new Error("No se pudo obtener la lista de Editoriales");
        
    }
}

export async function createEditorial(form) {
    try {
        const res = await fetch("http://localhost:5000/api/catalogo/editoriales", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });

        const data = await res.json();

        if (!res.ok) {
            // muestra el mensaje devuelto por el backend si existe
            alert(data.message || "Error al crear la editorial.");
            return;
        }

        alert("Editorial creado correctamente (id: " + (data.id ?? "") + ")");
    } catch (err) {
        console.error(err);
        alert("Error de red al intentar crear le editorial.");
    }
}

export async function getAllRoles() {
    try {
        const res = await fetch("http://localhost:5000/api/catalogo/roles");
        const data = await res.json();
        
        if (!data.data) {
            throw new Error('Roles no encontrados');
        }
        
        return data.data;
    } catch (error) {
        throw new Error('No se pudo obtener la lista de roles');
    }
}

export async function getAllTiposDocumento() {
    try {
        const res = await fetch("http://localhost:5000/api/catalogo/documentos");
        const data = await res.json();
        
        if (!data.data) {
            throw new Error('Documentos no encontrados');
        }
        
        return data.data;
    } catch (error) {
        throw new Error('No se pudo obtener la lista de documentos');
    }
}