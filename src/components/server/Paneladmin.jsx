import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import '../../assets/css/paneladmi.css';

const Paneldeadmin = () => {
  const navigate = useNavigate();
  
  // Datos fijos
  const estadisticas = {
    usuariosRegistrados: 14,
    reservasHoy: 18,
    ocupacionActual: 76,
    ingresosMes: 12500,
    habitacionesDisponibles: 14,
    checkinsPendientes: 5
  };

  const alertas = [
    { tipo: 'seguridad', mensaje: '2 intentos de login fallidos', fecha: 'Hoy', prioridad: 'alta' },
    { tipo: 'sistema', mensaje: 'Actualización disponible', fecha: 'Ayer', prioridad: 'media' },
  ];

  useEffect(() => {
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
    if (!usuarioActivo) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="panel-admin">
      <Header 
        title="Panel de Administración"
        navItems={[
          { path: "/", icon: "🏠", label: "Inicio" },
          { path: "/aprobaciones", icon: "👥", label: "Usuarios" },
          { path: "/registro", icon: "📝", label: "Registrar" },
          { path: "/reservas", icon: "📅", label: "Reservas" },
          { path: "/habitaciones", icon: "🛏️", label: "Habitaciones" },
          { path: "/facturacion", icon: "💳", label: "Facturación" },
        ]}
        className="encabezado-admin"
      />
      
      <main className="contenido-admin">
        {/* Sección de Bienvenida y Resumen */}
        <section className="seccion-bienvenida-admin">
          <div className="tarjeta-saludo-admin">
            <h2 id="saludo">¡Hola, Administrador!</h2>
            <p>Control completo del sistema hotelero - {new Date().toLocaleDateString('es-ES', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
            
            <div className="resumen-admin">
              <div className="resumen-item-admin">
                <span className="resumen-valor">{estadisticas.usuariosRegistrados}</span>
                <span className="resumen-label">Usuarios registrados</span>
              </div>
              <div className="resumen-item-admin">
                <span className="resumen-valor">{estadisticas.reservasHoy}</span>
                <span className="resumen-label">Reservas hoy</span>
              </div>
              <div className="resumen-item-admin">
                <span className="resumen-valor">{estadisticas.ocupacionActual}%</span>
                <span className="resumen-label">Ocupación</span>
              </div>
            </div>
          </div>
          
          <div className="tarjeta-acciones-admin">
            <h3>Acciones Rápidas</h3>
            <div className="acciones-grid-admin">
              <button className="accion-btn-admin" onClick={() => navigate('/registro')}>
                <span className="accion-icono">➕</span>
                <span>Registrar Usuario</span>
              </button>
              <button className="accion-btn-admin" onClick={() => navigate('/habitaciones')}>
                <span className="accion-icono">🛏️</span>
                <span>Agregar Habitación</span>
              </button>
            </div>
          </div>
        </section>

        {/* Sección de Estadísticas y Alertas */}
        <section className="seccion-estadisticas-admin">
          <div className="tarjeta-estadisticas-admin">
            <h3>Estadísticas del Sistema</h3>
            <div className="metricas-grid-admin">
              <div className="metrica-item-admin">
                <div className="metrica-valor">${estadisticas.ingresosMes.toLocaleString()}</div>
                <div className="metrica-label">Ingresos mensuales</div>
                <div className="metrica-tendencia">↑ 8% vs mes anterior</div>
              </div>

              <div className="metrica-item-admin">
                <div className="metrica-valor">98.7%</div>
                <div className="metrica-label">Uptime sistema</div>
                <div className="metrica-tendencia">Estable</div>    
              </div>
            </div>
          </div>

          <div className="tarjeta-alertas-admin">
            <h3>Alertas del Sistema</h3>
            <div className="alertas-lista-admin">
              {alertas.map((alerta, index) => (
                <div key={index} className={`alerta-item-admin ${alerta.prioridad}`}>
                  <div className="alerta-icono">
                    {alerta.tipo === 'seguridad' && '🔒'}
                    {alerta.tipo === 'sistema' && '⚠️'}
                  </div>
                  <div className="alerta-contenido">
                    <div className="alerta-mensaje">{alerta.mensaje}</div>
                    <div className="alerta-detalle">
                      <span className="alerta-fecha">{alerta.fecha}</span>
                      <span className="alerta-prioridad">{alerta.prioridad}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>   
      </main>
    </div>
  );
};

export default Paneldeadmin;