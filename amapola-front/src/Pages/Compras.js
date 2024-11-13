import React, { useEffect, useState } from 'react';
import api from '../Services/Api';

function Compras() {
    const [compras, setCompras] = useState([]); // Lista de compras
    const [productos, setProductos] = useState({}); // Productos por ID
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const [itemsPerPage] = useState(10); // Elementos por página
    const [loading, setLoading] = useState(false); // Estado de carga

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Activamos la carga

            try {
                // Obtener todas las compras
                const response = await api.get('/compras');
                setCompras(response.data); // Establecer todas las compras

                // Obtener los productos para las compras
                const productoIds = response.data.map(compra => compra.producto_id);
                const productosResponse = await api.get('/productos', { params: { ids: productoIds.join(',') } });

                // Mapeamos los productos por su id
                const productosMap = productosResponse.data.reduce((acc, producto) => {
                    acc[producto.id] = producto.nombre;
                    return acc;
                }, {});
                setProductos(productosMap);
            } catch (error) {
                console.error('Error al obtener compras:', error.message);
            } finally {
                setLoading(false); // Desactivamos la carga
            }
        };

        fetchData();
    }, []); // Este efecto solo se ejecuta una vez cuando el componente se monta

    // Calcular las compras a mostrar en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = compras.slice(indexOfFirstItem, indexOfLastItem);

    // Total de páginas
    const totalPages = Math.ceil(compras.length / itemsPerPage);

    // Generamos los números de página (limitados a 3)
    let pageNumbers = [];
    const maxVisiblePages = 3;

    if (totalPages <= maxVisiblePages) {
        pageNumbers = [...Array(totalPages).keys()].map(i => i + 1); // Si hay pocas páginas, mostramos todas
    } else {
        const startPage = Math.max(1, currentPage - 1); // La página inicial de la ventana visible
        const endPage = Math.min(totalPages, currentPage + 1); // La página final de la ventana visible
        pageNumbers = [...Array(endPage - startPage + 1).keys()].map(i => startPage + i); // Limitar a 3 páginas
    }

    // Función para manejar el cambio de página
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <h1>Compras</h1>
            {loading ? (
                <p>Cargando...</p> // Mensaje de carga
            ) : (
                <>
                    <table className="">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad Comprada</th>
                                <th>Precio Compra</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length > 0 ? (
                                currentItems.map(compra => (
                                    <tr key={compra.idCompra}>
                                        <td>{productos[compra.producto_id] || 'Cargando...'}</td>
                                        <td>{compra.cantidadComprada}</td>
                                        <td>{compra.precioCompra}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">No hay compras disponibles.</td>
                                </tr>
                            )}
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
                                    onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                                >
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            {pageNumbers.map((number) => (
                                <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                    <a className="page-link" href="#" onClick={() => paginate(number)}>
                                        {number}
                                    </a>
                                </li>
                            ))}
                            <li className="page-item">
                                <a
                                    className="page-link"
                                    href="#"
                                    aria-label="Next"
                                    onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                                >
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </>
            )}
        </div>
    );
}

export default Compras;
