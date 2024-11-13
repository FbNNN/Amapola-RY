import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProductos } from '../Services/Api'; // Asegúrate de importar la función desde api.js
import './productos.css';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [filter, setFilter] = useState('todos'); // Estado para el filtro de stock
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda local
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || ''; // Obtener término de búsqueda del Navbar

  // Obtener productos al montar el componente
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const productosObtenidos = await getProductos();
        setProductos(productosObtenidos);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  // Mientras se carga la información
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Si no hay productos
  if (productos.length === 0) {
    return <div>No se encontraron productos.</div>;
  }

  // Lógica de filtrado
  const filteredProducts = productos.filter((producto) => {
    // Filtrado por disponibilidad (stock)
    if (filter === 'conStock' && producto.cantidad <= 0) {
      return false;
    }
    if (filter === 'sinStock' && producto.cantidad > 0) {
      return false;
    }

    // Filtrado por búsqueda combinando el término local e input del Navbar
    const searchText = searchTerm.toLowerCase();
    const navbarText = searchQuery.toLowerCase();
    const nombreProducto = producto.nombre.toLowerCase();

    if (searchText && !nombreProducto.includes(searchText)) {
      return false;
    }
    if (navbarText && !nombreProducto.includes(navbarText)) {
      return false;
    }

    return true;
  });

  // Lógica de paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Determina el rango de páginas a mostrar (máximo 3 páginas)
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i >= currentPage - 1 && i <= currentPage + 1 && i > 0 && i <= totalPages) {
      pageNumbers.push(i);
    }
  }

  return (
    <div>
      <h1>Inventario de Productos</h1>

      {/* Filtro de productos */}
      <div className="filter">
        <label>Filtrar por disponibilidad:</label>
        <select
          className="form-select"
          aria-label="Filtro de productos"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="conStock">Con Stock</option>
          <option value="sinStock">Sin Stock</option>
        </select>
      </div>

      {/* Campo de búsqueda */}
      <div className="search">
        <label>Buscar producto:</label>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>{producto.cantidad}</td>
              <td>${producto.precioVentaAprox}</td>
              <td>
                <button type="button" className="btn btn-outline-secondary">Vender</button>
                <button type="button" className="btn btn-outline-secondary">Comprar</button>
                <button type="button" className="btn btn-outline-secondary">Cambiar Nombre</button>
                <button type="button" className="btn btn-outline-secondary">Cambiar Precio</button>
                {producto.codigoDeBarra === '' ? (
                  <button type="button">Agregar Código de Barras</button>
                ) : (
                  <button type="button" className="btn btn-outline-secondary" style={{ display: 'none' }}>
                    Código de Barras Agregado
                  </button>
                )}
              </td>
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
    </div>
  );
};

export default Productos;
