import React, { useEffect, useState } from 'react';
import { getVentas } from '../Services/Api'; // Asegúrate de tener una función para obtener las ventas
import './Ventas.css';

function Ventas() {
    const [ventas, setVentas] = useState([]);  // Almacena todas las ventas
    const [paginatedVentas, setPaginatedVentas] = useState([]);  // Almacena las ventas de la página actual
    const [mesSeleccionado, setMesSeleccionado] = useState(new Date().getMonth() + 1); // Mes actual
    const [currentPage, setCurrentPage] = useState(1);  // Página actual
    const [ganancias, setGanancias] = useState(null);  // Almacena las ganancias calculadas
    const [mostrarGanancias, setMostrarGanancias] = useState(false); // Estado para mostrar/ocultar ganancias
    const ventasPorPagina = 10;  // Número de ventas por página
    const anioSeleccionado = new Date().getFullYear(); // Año actual

    // Cargar ventas al montar el componente o cambiar el mes
    useEffect(() => {
        cargarVentas(mesSeleccionado, anioSeleccionado);
        if (mostrarGanancias) {
            calcularGanancias(mesSeleccionado, anioSeleccionado);
        }
    }, [mesSeleccionado, mostrarGanancias]); // Asegurarse de que las ganancias se calculen cuando el estado cambie

    // Cargar ventas desde el API
    const cargarVentas = (month, year) => {
        getVentas(month, year)
            .then(data => {
                console.log("Datos de ventas:", data);
                setVentas(data);
                setPaginatedVentas(data.slice(0, ventasPorPagina)); // Solo mostrar las primeras ventas
            })
            .catch(error => console.error("Error al cargar ventas:", error));
    };

    // Calcular las ganancias desde el API
    const calcularGanancias = (month, year) => {
        fetch(`http://localhost:8000/api/ganancias?mes=${month}&anio=${year}`)
            .then(response => response.json())
            .then(data => {
                setGanancias(data.ganancias);
            })
            .catch(error => {
                console.error("Error al calcular ganancias:", error);
            });
    };

    // Manejar el cambio de mes
    const handleMesChange = (e) => {
        setMesSeleccionado(e.target.value);
        setCurrentPage(1);  // Resetear la página a la 1 cuando el mes cambie
    };

    // Función para formatear el número sin decimales y con separador de miles
    const formatearGanancias = (ganancias) => {
        const numeroGanancias = parseFloat(ganancias);

        // Si ganancias no es un número válido, retorna '0'
        if (isNaN(numeroGanancias)) {
            return '0';
        }

        // Formatear el número sin decimales y con separadores de miles
        return numeroGanancias.toLocaleString('es-ES', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
    };

    // Cambiar de página
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        const indexOfLastVenta = pageNumber * ventasPorPagina;
        const indexOfFirstVenta = indexOfLastVenta - ventasPorPagina;
        setPaginatedVentas(ventas.slice(indexOfFirstVenta, indexOfLastVenta));
    };

    // Alternar la visibilidad de las ganancias
    const toggleGanancias = () => {
        setMostrarGanancias(!mostrarGanancias); // Alternar entre mostrar/ocultar ganancias
    };

    // Obtener el rango de páginas a mostrar (3 páginas máximo)
    const getPageNumbers = () => {
        const totalPages = Math.ceil(ventas.length / ventasPorPagina);
        let startPage = Math.max(1, currentPage - 1);
        let endPage = Math.min(totalPages, currentPage + 1);

        // Ajustar el rango para que no se pase de los límites
        if (totalPages > 3) {
            if (currentPage === 1) {
                endPage = Math.min(3, totalPages);
            } else if (currentPage === totalPages) {
                startPage = Math.max(totalPages - 2, 1);
            }
        }

        let pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div>
            <h1>Ventas</h1>

            {/* Selector de Mes */}
            <div className="filter-container">
                <label>Filtrar por mes:</label>
                <select value={mesSeleccionado} onChange={handleMesChange}>
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {new Date(0, i).toLocaleString('es-ES', { month: 'long' })}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                {/* Botón para mostrar/ocultar ganancias */}
                <div>
                    <button type="button" class="btn btn-outline-secondary" onClick={() => setMostrarGanancias(!mostrarGanancias)}>
                        {mostrarGanancias ? 'Ocultar Ganancias' : 'Mostrar Ganancias'}
                    </button>

                    {mostrarGanancias && ganancias !== null && (
                        <div className="ganancias-container">
                            <h3>Ganancias del mes: ${formatearGanancias(ganancias)}</h3>
                        </div>
                    )}
                </div>
            </div>

            {/* Tabla de Ventas */}
            <table className="ventas-table">
                <thead>
                    <tr>
                        <th>ID Venta</th>
                        <th>Producto</th>
                        <th>Cantidad Vendida</th>
                        <th>Precio Venta</th>
                        <th>Fecha Venta</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedVentas.length > 0 ? (
                        paginatedVentas.map((venta) => (
                            <tr key={venta.idVenta}>
                                <td>{venta.idVenta}</td>
                                <td>{venta.producto ? venta.producto.nombre : 'Sin nombre'}</td>
                                <td>{venta.cantidadVendida}</td>
                                <td>{venta.precioVenta}</td>
                                <td>{venta.fechaVenta}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No hay ventas disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Paginación con Estilo Bootstrap */}
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <a
                            className="page-link"
                            href="#"
                            aria-label="Previous"
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>

                    {getPageNumbers().map(page => (
                        <li
                            key={page}
                            className={`page-item ${currentPage === page ? 'active' : ''}`}
                        >
                            <a
                                className="page-link"
                                href="#"
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </a>
                        </li>
                    ))}

                    <li className={`page-item ${currentPage * ventasPorPagina >= ventas.length ? 'disabled' : ''}`}>
                        <a
                            className="page-link"
                            href="#"
                            aria-label="Next"
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Ventas;
