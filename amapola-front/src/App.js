import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Productos from './Pages/Productos';
import Compras from './Pages/Compras';
import Ventas from './Pages/Ventas';
import Navbar from './Pages/navbar';
import Footer from './Pages/footer';

function App() {
    return (
        <Router>
            <div className="app-wrapper">
                <Navbar />
                <body>
                    <div className="main-content">
                        {/* Solo mostrar el mensaje de bienvenida en la ruta raíz */}
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <div className="welcome-container text-center my-5">
                                        <h1 className="welcome-message">¡Bienvenido a AmapolaByMz!</h1>
                                        <p>Estamos encantados de que nos visites. Explora nuestros productos y encuentra lo que necesitas.</p>
                                    </div>
                                }
                            />
                            <Route path="/productos" element={<Productos />} />
                            <Route path="/compras" element={<Compras />} />
                            <Route path="/ventas" element={<Ventas />} />
                        </Routes>
                    </div>
                </body>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
