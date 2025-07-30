import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import '../../assets/css/panel.css';

const Panel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo") || 'null');
    if (!usuarioActivo) {
      navigate("/login");
    }
  }, [navigate]);

  // Datos para las secciones
  const servicios = [
    { nombre: "Limpieza", estado: "Activo" },
    { nombre: "Servicios", estado: "Activo" },
    { nombre: "Transporte", estado: "Inactivo" }
  ];

  const estadisticas = [
    { titulo: "Ocupación", valor: "85%", icono: "📊" },
    { titulo: "Reservas", valor: "24", icono: "📅" },
    { titulo: "Eventos hoy", valor: "3", icono: "🛎️" }
  ];

  return (
    <div className="panel-container">
      <Header 
        title="Sistema de Gestión Hotelera ULEAM"
        navItems={[
          { path: "/inicio", icon: "🏠", label: "Inicio" },
          { path: "/habitacionesusuario", icon: "🛏️", label: "Habitaciones" },
          { path: "/reservas", icon: "📅", label: "Reservas" },
          { path: "/facturacion", icon: "💳", label: "Facturación" }
        ]}
      />

      <main className="contenido-principal">
        {/* Sección de Bienvenida */}
        <section className="seccion-bienvenida">
          <div className="tarjeta-saludo">
            <h2 id="saludo">Hola, Carlos</h2>
            <p>Bienvenido al sistema de gestión hotelera</p>
            <button 
              className="btn-primario"
              onClick={() => navigate('/habitacionesusuario')}
            >
              Habitaciones Diponibles 
            </button>
          </div>
          
          <div className="tarjeta-procesos">
            <h3>Tu Estancia Perfecta Comienza Aquí</h3>
            <ul>
              <li>📶 WiFi gratuito en todas las áreas del hotel</li>
              <li>📍 Ubicación estratégica cerca del centro y la playa</li>
              <li>🛎️ Servicio de atención al cliente 24/7</li>
            </ul>
          </div>
        </section>

        {/* Sección de Estadísticas y Servicios */}
        <section className="seccion-estadisticas">
          <div className="tarjeta-estadisticas">
            <h3>📊 Estado General del Hotel</h3>
            <div className="grid-estadisticas">
              {estadisticas.map((item, index) => (
                <div key={index} className="item-estadistica">
                  <span className="icono">{item.icono}</span>
                  <span className="valor">{item.valor}</span>
                  <span className="titulo">{item.titulo}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="tarjeta-servicios">
            <h3>Servicios</h3>
            <p>Gestión de servicios adicionales</p>
            <div className="lista-servicios">
              {servicios.map((servicio, index) => (
                <div key={index} className="item-servicio">
                  <span>{servicio.nombre}</span>
                  <span className={`estado ${servicio.estado.toLowerCase()}`}>
                    {servicio.estado}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Panel;