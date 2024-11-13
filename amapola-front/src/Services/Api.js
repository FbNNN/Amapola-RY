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

export default api; // Exporta la instancia de axios para ser utilizada en otros módulos
