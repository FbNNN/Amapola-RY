import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar Bootstrap
import './footer.css'; // Importa el archivo CSS de footer

function Footer() {
  return (
    <footer>
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">AmapolaByMz</h5>
            <p>
              Aqui encuentras tu Maquillaje Preferido!!
            </p>
          </div>

          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">Síguenos</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#">Facebook</a>
              </li>
              <li>
                <a href="#">Twitter</a>
              </li>
              <li>
                <a href="https://www.instagram.com/amapola_by_mz/?hl=es-la">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center p-3">
        <span>&copy; 2024 AmapolaByMz | Todos los derechos reservados</span>
      </div>
    </footer>
  );
}

export default Footer;
