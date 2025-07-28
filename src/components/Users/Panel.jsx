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
    } else {
      const saludo = document.getElementById("saludo");
      if (saludo) saludo.textContent = "Hola, " + usuarioActivo.nombre;
    }
  }, [navigate]);

  return (
    <div className="panel-container">
      <Header 
        title="Bienvenido a nuestro Hotel"
        navItems={[
          { path: "/inicio", icon: "🏠", label: "Inicio" },
          { path: "/habitacionesusuario", icon: "🛏️", label: "Habitaciones" },
          { path: "/reservas", icon: "📅", label: "Reservas" },
          { path: "/facturacion", icon: "💳", label: "Facturación" }
        ]}
      />

      <main className="contenido-principal">
        <section className="bienvenida">
          <h2 id="saludo">¡Hola, Usuario!</h2>
          <p>Desde aquí puedes acceder a las funciones principales del sistema.</p>
          <div className="contenedor-imagen">
            <img 
              src="../img/hotel1.jpg" 
              alt="Habitación del hotel" 
              className="imagen-panel" 
            />
            <div className="overlay">
              <button 
                className="btn-explorar"
                onClick={() => navigate('/habitacionesusuario')}
              >
                Explorar Habitaciones
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Panel;