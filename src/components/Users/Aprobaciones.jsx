import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/aprobaciones.css";

const Aprobaciones = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filtro, setFiltro] = useState("pendiente");

  useEffect(() => {
    const cargarDatos = () => {
      try {
        const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
        const usuariosConEstado = usuariosGuardados.map(usuario => ({
          ...usuario,
          aprobado: usuario.aprobado || false
        }));
        setUsuarios(usuariosConEstado);
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    cargarDatos();
  }, []);

  const actualizarUsuarios = (nuevosUsuarios) => {
    try {
      localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));
      setUsuarios(nuevosUsuarios);
    } catch (error) {
      console.error("Error guardando datos:", error);
    }
  };

  const aprobarUsuario = (documento) => {
    const usuariosActualizados = usuarios.map(usuario => 
      usuario.documento === documento 
        ? { ...usuario, aprobado: true } 
        : usuario
    );
    actualizarUsuarios(usuariosActualizados);
  };

  const rechazarUsuario = (documento) => {
    const usuariosActualizados = usuarios.filter(
      usuario => usuario.documento !== documento
    );
    actualizarUsuarios(usuariosActualizados);
  };

  const usuariosFiltrados = usuarios.filter(usuario => {
    if (filtro === "todos") return true;
    if (filtro === "aprobado") return usuario.aprobado;
    return !usuario.aprobado;
  });

  if (isLoading) {
    return <div className="loading">Cargando clientes...</div>;
  }

  return (
    <div className="registro-container">
      <h1 className="titulo-principal">Gestión de Clientes</h1>
      <h2 className="subtitulo">Aprobación de registros</h2>
      
      <div className="navegacion">
        <Link to="/" className="btn-nav btn-primario">🏠 Inicio</Link>
        <Link to="/registro" className="btn-nav btn-secundario">➕ Nuevo Cliente</Link>
      </div>

      <div className="filtros">
        <button 
          onClick={() => setFiltro("pendiente")} 
          className={filtro === "pendiente" ? "active" : ""}
        >
          Pendientes
        </button>
        <button 
          onClick={() => setFiltro("aprobado")} 
          className={filtro === "aprobado" ? "active" : ""}
        >
          Aprobados
        </button>
        <button 
          onClick={() => setFiltro("todos")} 
          className={filtro === "todos" ? "active" : ""}
        >
          Todos
        </button>
      </div>

      {usuariosFiltrados.length === 0 ? (
        <p className="sin-reservas">No hay clientes {filtro !== "todos" ? `en estado ${filtro}` : "registrados"}.</p>
      ) : (
        <div className="reservas-list">
          {usuariosFiltrados.map((usuario) => (
            <div key={usuario.documento} className="reserva-card">
              <div className="reserva-grid">
                <div className="reserva-item">
                  <span className="reserva-label">Nombre: </span>
                  <span className="reserva-value">{usuario.nombre}</span>
                </div>
                <div className="reserva-item">
                  <span className="reserva-label">Correo: </span>
                  <span className="reserva-value">{usuario.correo}</span>
                </div>
                <div className="reserva-item">
                  <span className="reserva-label">Documento: </span>
                  <span className="reserva-value">{usuario.documento}</span>
                </div>
                <div className="reserva-item">
                  <span className="reserva-label">Teléfono: </span>
                  <span className="reserva-value">{usuario.telefono}</span>
                </div>
                <div className="reserva-item">
                  <span className="reserva-label">Estado: </span>
                  <span className={`reserva-value ${usuario.aprobado ? "aprobado" : "pendiente"}`}>
                    {usuario.aprobado ? "Aprobado" : "Pendiente"}
                  </span>
                </div>
              </div>
              
              {!usuario.aprobado && (
                <div className="acciones">
                  <button 
                    onClick={() => aprobarUsuario(usuario.documento)} 
                    className="btn-aprobar"
                  >
                    Aprobar
                  </button>
                  <button 
                    onClick={() => rechazarUsuario(usuario.documento)} 
                    className="btn-rechazar"
                  >
                    Rechazar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Aprobaciones;