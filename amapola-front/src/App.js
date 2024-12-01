import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Compras from './PagesAdmin/Compras';
import Ventas from './PagesAdmin/Ventas';
import NavbarAdmin from './PagesAdmin/navbarAdmin';
import Footer from './PagesAdmin/footer';
import Vender from './PagesAdmin/Vender';
import Login from './PagesAdmin/login';
import Productos from './PagesAdmin/Productos';
import Dashboard from './PagesAdmin/Dashboard';
import Ingresar from './PagesAdmin/ingresarProducto';
import NavbarUser from './PagesUser/navbarUser';


function App() {
    return (
        <Router>
            <div className="app-wrapper">
                <NavbarAdmin />
                <body>
                    <div className="main-content">
                        {/* Solo mostrar el mensaje de bienvenida en la ruta raíz */}
                        <login />
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Login/>
                                }
                            />
                            <Route path="/productos" element={<Productos />} />
                            <Route path="/compras" element={<Compras />} />
                            <Route path="/Dashnoard" element={<Dashboard />} />
                            <Route path="/ventas" element={<Ventas />} />
                            <Route path="/vender" element={<Vender />} />
                            <Route path="/ingresar" element={<Ingresar />} />
                        </Routes>
                    </div>
                </body>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
