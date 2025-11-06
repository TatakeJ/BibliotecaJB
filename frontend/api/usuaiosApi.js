export async function getAllUsuarios() {
    try {
        const res = await fetch("http://localhost:5000/api/usuarios");
        const data = await res.json();
        
        if (!data.data) {
            throw new Error('Usuarios no encontrados');
        }
        
        return data.data;
    } catch (error) {
        throw new Error('No se pudo obtener la lista de usuarios');
    }
}