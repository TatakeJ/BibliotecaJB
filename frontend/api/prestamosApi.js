export async function getAllPrestamos() {
    try {
        const res = await fetch("http://localhost:5000/api/prestamos");
        const data = await res.json();
        
        if (!data.data) {
            throw new Error('Prestamos no encontrados');
        }
        
        return data.data;
    } catch (error) {
        throw new Error('No se pudo obtener la lista de prestamos');
    }
}