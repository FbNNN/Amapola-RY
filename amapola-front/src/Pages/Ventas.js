import React, { useEffect, useState } from 'react';
import { getVentas, getProductos } from '../Services/Api'; // Asegúrate de importar correctamente las funciones

function Ventas() {
    const [ventas, setVentas] = useState([]); // Estado para almacenar las ventas
    const [productos, setProductos] = useState({}); // Para almacenar los productos por su ID
    const [page, setPage] = useState(1); // Página actual
    const [totalPages, setTotalPages] = useState(1); // Total de páginas

    useEffect(() => {
        // Obtener las ventas con paginación
        getVentas(page, 10) // Aquí 10 es el límite de elementos por página
            .then(response => {
                console.log('Respuesta de ventas:', response); // Depuración de la respuesta

                const ventasData = response?.ventasData || []; // Asegúrate de que ventasData sea un arreglo vacío si no existe
                const totalPages = response?.totalPages || 1; // Default a 1 si no hay totalPages

                // Verifica si ventasData es un arreglo
                if (Array.isArray(ventasData)) {
                    setVentas(ventasData); // Establecer las ventas
                    setTotalPages(totalPages); // Establecer el total de páginas

                    // Si las ventas existen, obtenemos los productos
                    const productoIds = ventasData.map(venta => venta.producto_id);
                    return getProductos(productoIds);
                } else {
                    console.error('ventasData no es un arreglo', ventasData);
                    return [];
                }
            })
            .then(productosData => {
                console.log('Respuesta de productos:', productosData); // Depuración de la respuesta

                // Si productosData es válido, lo mapeamos a un objeto de productos
                if (Array.isArray(productosData)) {
                    const productosMap = productosData.reduce((acc, producto) => {
                        acc[producto.id] = producto.nombre;
                        return acc;
                    }, {});
                    setProductos(productosMap);
                } else {
                    console.error('productosData no es un arreglo', productosData);
                }
            })
            .catch(error => {
                console.error('Error al obtener ventas o productos:', error.message);
            });
    }, [page]); // Recargamos cuando cambie la página

    // Función para manejar la paginación
    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    // Paginación
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // Verifica si hay ventas antes de renderizar
    if (!ventas || ventas.length === 0) {
        return <div>Cargando ventas...</div>;
    }

    return (
        <div>
            <h1>Ventas</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad Vendida</th>
                        <th>Precio Venta</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map(venta => (
                        <tr key={venta.idVenta}>
                            <td>{productos[venta.producto_id] || 'Cargando...'}</td>
                            <td>{venta.cantidadVendida}</td>
                            <td>{venta.precioVenta}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Paginación */}
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item">
                        <a
                            className="page-link"
                            href="#"
                            aria-label="Previous"
                            onClick={() => page > 1 && handlePreviousPage()}
                        >
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    {pageNumbers.slice(0, 3).map((number) => (
                        <li key={number} className={`page-item ${page === number ? 'active' : ''}`}>
                            <a className="page-link" href="#" onClick={() => setPage(number)}>
                                {number}
                            </a>
                        </li>
                    ))}
                    <li className="page-item">
                        <a
                            className="page-link"
                            href="#"
                            aria-label="Next"
                            onClick={() => page < totalPages && handleNextPage()}
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
