import axios from 'axios';

// Crear una instancia de axios con la configuración base
const api = axios.create({
    baseURL: "http://localhost:8000/api", // Asegúrate de que esta URL es la correcta
    headers: {
        'Content-Type': 'application/json',
    },
});

// Función para obtener los productos desde la API
export const getProductos = async () => {
    try {
        const response = await api.get('/productos'); // Endpoint que se usará para obtener los productos
        return response.data; // Se devuelve la respuesta de la API
    } catch (error) {
        throw new Error('Error al obtener productos: ' + error.message); // Manejo de errores
    }
};

// Función para obtener las compras desde la API
export const getCompras = async (page = 1, limit = 10) => {
    try {
        const response = await api.get('/compras', {
            params: {
                page,
                limit
            }
        });
        // Ajustar la estructura esperada de la respuesta
        return {
            comprasData: response.data.comprasData || [], // Lista de compras
            totalPages: response.data.totalPages || 1 // Total de páginas
        };
    } catch (error) {
        throw new Error('Error al obtener las compras: ' + error.message);
    }
};

// Función para obtener las ventas desde la API
export const getVentas = async (month) => {
    try {
        const response = await api.get('/ventas', {
            params: {
                month
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener ventas:', error);
        throw error;
    }
};

// Función para obtener un producto por ID
export const getProductoById = async (productoId) => {
    try {
        const response = await api.get(`/producto/${productoId}`); // Endpoint para obtener el producto por ID
        return response.data;
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        throw error; // Re-lanzamos el error para que sea manejado por el componente
    }
};
export const getGanancias = (month, year) => {
    return fetch(`/api/ganancias?mes=${month}&anio=${year}`)
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            console.error("Error al obtener ganancias:", error);
            return { ganancias: 0 };
        });
};

export default api; // Exporta la instancia de axios para ser utilizada en otros módulos
