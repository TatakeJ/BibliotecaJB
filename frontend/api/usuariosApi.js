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

export async function getUsuarioById(id) {
    try {
        const res = await fetch(`http://localhost:5000/api/usuarios/${id}`);
        const data = await res.json();
        
        if (!data.data) {
            throw new Error('Usuario no encontrado');
        }
        
        return data.data;
    } catch (error) {
        throw new Error('No se pudo obtener el usuario');
    }
}

export async function createUsuario(form) {
    try {
        const res = await fetch("http://localhost:5000/api/usuarios", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });

        const data = await res.json();

        if (!res.ok) {
            // muestra el mensaje devuelto por el backend si existe
            alert(data.message || "Error al crear el usuario.");
            return;
        }

        alert("Usuario creado correctamente (id: " + (data.id ?? "") + ")");
    } catch (err) {
        console.error(err);
        alert("Error de red al intentar crear el usuario.");
    }
}

export async function updateUsuario(id, form) {
    try {
        const validFields = {
            rol_usu: form.rol_usu,
            nom_usu: form.nom_usu,
            apell_usu: form.apell_usu,
            correo_usu: form.correo_usu,
            tipo_doc_usu: form.tipo_doc_usu,
            num_doc_usu: form.num_doc_usu,
            dircc_usu: form.dircc_usu,
        };

        const res = await fetch(`http://localhost:5000/api/usuarios/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(validFields)
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Error al actualizar el usuario");
        }

        return data;
    } catch (error) {
        throw new Error('No se pudo actualizar el usuario: ' + error.message);
    }
}

export async function deleteUsuario(id) {
    try {
        const res = await fetch(`http://localhost:5000/api/usuarios/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Error al eliminar el usuario');
        }

        return data;
    } catch (error) {
        throw new Error('No se pudo eliminar el usuario: ' + error.message);
    }
}