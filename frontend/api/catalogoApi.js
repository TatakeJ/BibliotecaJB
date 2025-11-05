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