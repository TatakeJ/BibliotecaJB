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

export async function getPrestamoById(id) {
    try {
        const res = await fetch(`http://localhost:5000/api/prestamos/${id}`);
        const data = await res.json();
        
        if (!data.data) {
            throw new Error('Prestamo no encontrado');
        }
        
        return data.data;
    } catch (error) {
        throw new Error('No se pudo encontrar el prestamo solicitado');
    }
}

// nueva función para crear préstamo
export async function createPrestamo(form) {
    try {
        const res = await fetch("http://localhost:5000/api/prestamos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Error al crear el préstamo");
        }

        return data;
    } catch (error) {
        throw new Error("No se pudo crear el préstamo: " + (error.message || error));
    }
}

// nueva función: llamar al endpoint que devuelve el libro
export async function devolverLibro(id, fecha_entrega_final) {
    try {
        const res = await fetch(`http://localhost:5000/api/prestamos/${id}/devolver`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fecha_entrega_final })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Error al devolver el libro");
        }

        return data;
    } catch (error) {
        throw new Error("No se pudo devolver el libro: " + (error.message || error));
    }
}