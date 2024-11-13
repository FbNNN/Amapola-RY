import React, { useEffect, useState } from 'react';
import api from '../Services/Api';

function Ventas() {
    const [ventas, setVentas] = useState([]);

    useEffect(() => {
        api.get('/ventas')
            .then(response => setVentas(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Ventas</h1>
            <ul>
                {ventas.map(venta => (
                    <li key={venta.idVenta}>
                        Producto ID: {venta.producto_id} - Cantidad: {venta.cantidadVendida} - Precio: {venta.precioVenta}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Ventas;
