export async function getAllLibros() {
    const res = await fetch("http://localhost:5000/api/libros");
    const data = await res.json();
    return data.data;
}

export async function getLibroById(id) {
    const res = await fetch(`http://localhost:5000/api/libros/${id}`);
    const data = await res.json();
    return data.data;
}