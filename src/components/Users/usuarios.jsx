import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import '../../assets/css/usuarios.css';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const data = JSON.parse(localStorage.getItem("usuarios")) || [];
      setUsuarios(data);
      setCargando(false);
    }, 500);
  }, []);

  const eliminarUsuarios = () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar todos los usuarios?")) {
      localStorage.removeItem("usuarios");
      setUsuarios([]);
    }
  };

  const eliminarUsuario = (index) => {
    if (window.confirm('¿Eliminar este cliente?')) {
      const nuevosUsuarios = [...usuarios];
      nuevosUsuarios.splice(index, 1);
      setUsuarios(nuevosUsuarios);
      localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));
    }
  };

  return (
    <div className="usuarios-container">
      <Header 
        title="Hotel ULEAM"
        navItems={[
          { path: "/panel", label: "🏠 Panel", className: "nav-link" },
          { path: "/registro", label: "➕ Nuevo Cliente", className: "nav-link" }
        ]}
      />

      <div className="usuarios-header">
        <h2 className="usuarios-titulo">Clientes Registrados</h2>
        <div className="usuarios-stats">
          <span className="badge">{usuarios.length} cliente{usuarios.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {cargando ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Cargando clientes...</p>
        </div>
      ) : (
        <div className="usuarios-content">
          {usuarios.length > 0 ? (
            <div className="usuarios-grid">
              {usuarios.map((usuario, index) => (
                <div key={index} className="usuario-card">
                  <div className="usuario-info">
                    <div className="usuario-avatar">
                      {usuario.nombre.charAt(0).toUpperCase()}
                    </div>
                    <h3 className="usuario-nombre">{usuario.nombre}</h3>
                    <div className="usuario-detalle">
                      <span className="usuario-label">Correo:</span>
                      <span className="usuario-value">{usuario.correo}</span>
                    </div>
                    <div className="usuario-detalle">
                      <span className="usuario-label">Documento:</span>
                      <span className="usuario-value">{usuario.documento}</span>
                    </div>
                    <div className="usuario-detalle">
                      <span className="usuario-label">Teléfono:</span>
                      <span className="usuario-value">{usuario.telefono}</span>
                    </div>
                  </div>
                  <div className="usuario-acciones">
                    <button 
                      onClick={() => eliminarUsuario(index)} 
                      className="btn-eliminar"
                    >
                      🗑 Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="usuarios-vacio">
              <div className="empty-state">
                <div className="empty-icon">👤</div>
                <h3>No hay clientes registrados</h3>
                <p>Parece que no hay ningún cliente en el sistema todavía.</p>
                <Link to="/Registro" className="btn-primario"> ➕ Registrar nuevo cliente
                </Link>
              </div>
            </div>
          )}

          {usuarios.length > 0 && (
            <div className="usuarios-acciones">
              <button onClick={eliminarUsuarios} className="btn-eliminar">
                🗑 Eliminar todos los clientes
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Usuarios;