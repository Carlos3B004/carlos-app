import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import '../../assets/css/paneladmi.css';

const Paneldeadmin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
    if (!usuarioActivo) {
      navigate('/login');
    }
  }, [navigate]);

  const navItems = [
    { path: "/", icon: "🏠", label: "Inicio" },
    { path: "/aprobaciones", icon: "👥", label: "Usuarios" },
    { path: "/registro", icon: "📝", label: "Registrar" },
    { path: "/reservas", icon: "📅", label: "Reservas" },
    { path: "/habitaciones", icon: "🛏️", label: "Habitaciones" },
    { path: "/facturacion", icon: "💳", label: "Facturación" }
  ];

  return (
    <div className="panel-admin">
      <Header 
        title="Panel de Administración"
        navItems={navItems}
        className="encabezado-admin"
      />
      
      <main>
        <section className="bienvenida">
          <h2 id="saludo">¡Hola, Administrador!</h2>
          <p>La excelencia comienza con una buena administración.</p>
          <img src="../img/hotel.jpg" alt="Habitación del hotel" className="imagen-panel" />
        </section>
      </main>
    </div>
  );
};

export default Paneldeadmin;