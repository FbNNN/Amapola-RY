import React, { useEffect, useState } from 'react';
import api from '../Services/Api';

function Compras() {
    const [compras, setCompras] = useState([]);

    useEffect(() => {
        api.get('/compras')
            .then(response => setCompras(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Compras</h1>
            <ul>
                {compras.map(compra => (
                    <li key={compra.idCompra}>
                        Producto ID: {compra.producto_id} - Cantidad: {compra.cantidadComprada} - Precio: {compra.precioCompra}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Compras;
