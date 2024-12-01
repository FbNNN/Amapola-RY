import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';
import './ingresarProducto.css';

const IngresarProducto = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        precioVentaAprox: '',
        cantidad: '',
        CodigoDeBarra: '',
        CostePromedio: '',
    });
    const [scannerVisible, setScannerVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [scanner, setScanner] = useState(null);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Mostrar/Ocultar escáner
    const toggleScanner = () => {
        setScannerVisible(!scannerVisible);
    };

    // Iniciar escáner
    useEffect(() => {
        if (scannerVisible) {
            const newScanner = new Html5QrcodeScanner('reader', {
                fps: 10,
                qrbox: 250,
            }, false);
            setScanner(newScanner);
            newScanner.render(
                (decodedText) => {
                    setFormData({ ...formData, CodigoDeBarra: decodedText });
                    setScannerVisible(false); // Cerrar el escáner automáticamente
                    newScanner.clear(); // Detener el escaneo
                },
                (error) => {
                    console.warn(`Error de escaneo: ${error}`);
                }
            );
        }

        // Limpiar el escáner cuando ya no sea visible
        return () => {
            if (scanner) {
                scanner.clear();
            }
        };
    }, [scannerVisible]); // Se ejecutará cada vez que scannerVisible cambie

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(
                'http://localhost:8000/api/store', // Asegúrate de que la URL coincida con tu ruta Laravel
                formData
            );
            alert('Producto registrado con éxito');
            console.log(response.data);
            // Reiniciar el formulario
            setFormData({
                nombre: '',
                precioVentaAprox: '',
                cantidad: '',
                CodigoDeBarra: '',
                CostePromedio: '',
            });
        } catch (error) {
            console.error('Error al registrar el producto:', error);
            alert('Hubo un error al registrar el producto');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Ingresar Producto</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre del Producto</label>
                    <input 
                        type="text"
                        id="nombre"
                        name="nombre"
                        className="form-control"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Nombre del producto"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="CodigoDeBarra" className="form-label">Código de Barra</label>
                    <div className="input-group">
                        <input 
                            type="text"
                            id="CodigoDeBarra"
                            name="CodigoDeBarra"
                            className="form-control"
                            value={formData.CodigoDeBarra}
                            onChange={handleChange}
                            placeholder="Escanea o ingresa manualmente"
                            required
                        />
                        <button 
                            type="button" 
                            className="btn btn-outline-secondary"
                            onClick={() => {
                                toggleScanner();
                            }}
                        >
                            <i className="bi bi-camera"></i> {/* Ícono de cámara */}
                        </button>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="precioVentaAprox" className="form-label">Precio de Venta Aproximado</label>
                    <input 
                        type="number"
                        id="precioVentaAprox"
                        name="precioVentaAprox"
                        className="form-control"
                        value={formData.precioVentaAprox}
                        onChange={handleChange}
                        placeholder="Precio de venta"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="cantidad" className="form-label">Cantidad</label>
                    <input 
                        type="number"
                        id="cantidad"
                        name="cantidad"
                        className="form-control"
                        value={formData.cantidad}
                        onChange={handleChange}
                        placeholder="Cantidad"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="CostePromedio" className="form-label">Coste Promedio</label>
                    <input 
                        type="text"
                        id="CostePromedio"
                        name="CostePromedio"
                        className="form-control"
                        value={formData.CostePromedio}
                        onChange={handleChange}
                        placeholder="Coste promedio (opcional)"
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary w-100"
                    disabled={loading}
                >
                    {loading ? 'Guardando...' : 'Guardar Producto'}
                </button>
            </form>

            {/* Zona del escáner */}
            {scannerVisible && (
                <div id="reader" className="mt-4 p-3 border rounded bg-light"></div>
            )}
        </div>
    );
};

export default IngresarProducto;
