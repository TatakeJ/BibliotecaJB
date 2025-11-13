import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPrestamoById, devolverLibro } from "../../api/prestamosApi.js";

function PrestamosId() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [prestamo, setPrestamo] = useState(null);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({});
    const [originalData, setOriginalData] = useState(null);

    useEffect(() => {
        if (id) {
            getPrestamoById(id)
                .then(data => {
                    // Formatear las fechas antes de establecerlas en el estado
                    const formattedData = {
                        ...data,
                        fecha_prest: data.fecha_prest ? data.fecha_prest.split('T')[0] : '',
                        fecha_devol: data.fecha_devol ? data.fecha_devol.split('T')[0] : '',
                        fecha_entrega_final: data.fecha_entrega_final ? data.fecha_entrega_final.split('T')[0] : ''
                    };
                    setPrestamo(data);
                    setFormData(formattedData);
                    setOriginalData(formattedData);
                })
                .catch(error => {
                    setError(error.message);
                    setPrestamo(null);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDevolver = async (e) => {
        e.preventDefault();

        if (prestamo.fecha_entrega_final) {
            alert("Este préstamo ya fue devuelto.");
            return;
        }

        const ok = window.confirm("¿Confirmar devolución del libro \"" + prestamo.nom_libro + "\" para " + prestamo.nom_usu + " " + prestamo.apell_usu + " ?");
        if (!ok) return;

        const fechaHoy = new Date().toISOString().split("T")[0];
        try {
            await devolverLibro(id, fechaHoy);
            alert("Devolución registrada.");
            navigate("/prestamos");
        } catch (err) {
            console.error(err);
            setError(err.message || "Error al devolver el libro.");
        }
    };

    if (error) return <p>Error: {error}</p>;
    if (!prestamo) return <p>Cargando...</p>;

    return (
        <>
            <div className="card w-50 mx-auto my-4 text-center">
                <div className="card-header">
                    <h2>Detalle del Préstamo {id}</h2>
                </div>
                <div className="card-body">
                    <p><b>Usuario:</b> {prestamo.nom_usu} {prestamo.apell_usu}</p>
                    <p><b>Email:</b> {prestamo.correo_usu}</p>
                    <p><b>Libro:</b> {prestamo.nom_libro}</p>
                    <p><b>Autor:</b> {prestamo.nom_autor}</p>
                    <p><b>ISBN:</b> {prestamo.isbn}</p>
                    <p><b>Fecha de Préstamo:</b> {prestamo.fecha_prest}</p>
                    <p><b>Fecha Límite de Devolución:</b> {prestamo.fecha_devol}</p>
                    <p><b>Fecha de Entrega Final:</b> {prestamo.fecha_entrega_final || "Pendiente"}</p>
                    <p><b>Estado:</b> {prestamo.fecha_entrega_final ? "Devuelto" : "Activo"}</p>
                </div>
                <div className="card-footer">
                    <button 
                        onClick={() => document.getElementById("form-devolver").style.display = "block"}
                        disabled={!!prestamo.fecha_entrega_final}
                    >
                        Registrar Devolución
                    </button>
                    <button onClick={() => navigate("/prestamos")}>Volver</button>
                </div>
            </div>

            <div id="form-devolver" style={{display: "none"}} className="card w-50 mx-auto my-4 text-center">
                <div className="card-header">
                    <h3>Registrar Devolución</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleDevolver}>
                        <div>
                            <label htmlFor="nom_libro">Libro:</label>
                            <input 
                                type="text" 
                                id="nom_libro" 
                                value={prestamo.nom_libro || ''} 
                                disabled
                            />
                        </div>

                        <div>
                            <label htmlFor="nom_usu">Usuario:</label>
                            <input 
                                type="text" 
                                id="nom_usu" 
                                value={`${prestamo.nom_usu} ${prestamo.apell_usu}` || ''} 
                                disabled
                            />
                        </div>

                        <div>
                            <label htmlFor="fecha_prest">Fecha de Préstamo:</label>
                            <input 
                                type="date" 
                                id="fecha_prest" 
                                value={formData.fecha_prest || ''} 
                                disabled
                            />
                        </div>

                        <div>
                            <label htmlFor="fecha_devol">Fecha Límite de Devolución:</label>
                            <input 
                                type="date" 
                                id="fecha_devol" 
                                value={formData.fecha_devol || ''} 
                                disabled
                            />
                        </div>

                        <div>
                            <p style={{ color: "red", marginTop: "15px" }}>
                                <b>La devolución se registrará con la fecha de hoy</b>
                            </p>
                        </div>

                        <button type="submit">Confirmar Devolución</button>
                        <button type="button" onClick={() => document.getElementById("form-devolver").style.display = "none"}>
                            Cancelar
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default PrestamosId;