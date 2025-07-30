import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import '../../assets/css/index.css';

const Inicio = () => {
  useEffect(() => {
    const hoy = new Date();
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fechaFormateada = "Hoy es " + hoy.toLocaleDateString("es-ES", opciones);
    document.getElementById("fechaActual").textContent = fechaFormateada;
  }, []);

  return (
    <div className="pagina-inicio">
      <Header 
        title="Hotel ULEAM"
        navItems={[
          { 
            path: "/Login", 
            label: "👤 Iniciar como Usuario",
            className: "btn btn-primario"
          },
          { 
            path: "/Paneladmi", 
            label: "🛠️ Iniciar como Administrador",
            className: "btn btn-secundario"
          }
        ]}
        className="encabezado"
      />

      <main className="contenido-inicio">
        <section className="bienvenida">
          <h2>Bienvenido al sistema de gestión hotelera</h2>
          <p>Reserva y disfruta de la mejor experiencia en Hotel ULEAM.</p>
          <p id="fechaActual" className="fecha-actual"></p>
        </section>

        <section className="galeria-inicio">
          <img
            src="/img/hotel1.jpg" // Usar ruta absoluta
            alt="Vista exterior del hotel"
            className="imagen-inicio"
          />
          <img
            src="/img/hotel2.jpg" // Usar ruta absoluta
            alt="Habitación del hotel"
            className="imagen-inicio"
          />
        </section>
        <div className="cuadro-botones">
          <Link to="/Login" className="btn btn-primario"> 👤 Iniciar Sesión </Link>
          <Link to="/registro" className="btn btn-secundario"> 🔐 Registrate </Link>
        </div>
      </main>
    </div>
  );
};

export default Inicio;