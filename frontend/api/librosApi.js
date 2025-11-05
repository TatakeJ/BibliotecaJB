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