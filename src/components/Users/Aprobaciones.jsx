import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../../assets/css/aprobaciones.css";

const Aprobaciones = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [adminToken, setAdminToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
 

  // Cargar datos iniciales
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const usuariosGuardados = JSON.parse(localStorage.getItem("usuariosPendientes")) || [];
        const token = localStorage.getItem("adminToken") || "";
        
        setUsuarios(usuariosGuardados);
        setAdminToken(token);
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    cargarDatos();
  }, []);

  // Validar credenciales de administrador
  const validarAdmin = () => {
    return adminToken === "clave-secreta-admin"; // Cambiar por tu lógica de autenticación real
  };

  // Aprobar usuario
  const aprobarUsuario = (documento) => {
    if (!validarAdmin()) {
      alert("Acceso denegado: Solo administradores pueden realizar esta acción");
      return;
    }

    const usuariosActualizados = usuarios.map(usuario => {
      if (usuario.documento === documento) {
        return { ...usuario, estado: "Aprobado" };
      }
      return usuario;
    });

    setUsuarios(usuariosActualizados);
    localStorage.setItem("usuariosPendientes", JSON.stringify(usuariosActualizados));

    // Mover usuario aprobado a otra lista
    const usuarioAprobado = usuarios.find(u => u.documento === documento);
    if (usuarioAprobado) {
      const usuariosAprobados = JSON.parse(localStorage.getItem("usuariosAprobados")) || [];
      localStorage.setItem(
        "usuariosAprobados",
        JSON.stringify([...usuariosAprobados, usuarioAprobado])
      );
    }
  };

  // Rechazar usuario
  const rechazarUsuario = (documento) => {
    if (!validarAdmin()) {
      alert("Acceso denegado: Solo administradores pueden realizar esta acción");
      return;
    }

    const usuariosFiltrados = usuarios.filter(
      usuario => usuario.documento !== documento
    );
    
    setUsuarios(usuariosFiltrados);
    localStorage.setItem("usuariosPendientes", JSON.stringify(usuariosFiltrados));
  };

  // Guardar token de admin
  const guardarToken = () => {
    localStorage.setItem("adminToken", adminToken);
    alert("Token guardado correctamente");
  };

  if (isLoading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="aprobaciones-container">
      <header className="aprobaciones-header">
        <h1>Solicitudes pendientes</h1>
        <div className="admin-controls">
          <div className="token-input-group">
            <input
              type="password"
              placeholder="Token de administrador"
              value={adminToken}
              onChange={(e) => setAdminToken(e.target.value)}
              className="admin-input"
            />
            <button onClick={guardarToken} className="btn-guardar">
              Guardar
            </button>
          </div>
          <Link to="/panel" className="btn-regresar">
            ← Regresar
          </Link>
        </div>
      </header>

      <div className="aprobaciones-content">
        {usuarios.length > 0 ? (
          <table className="aprobaciones-tabla">
            <thead>
              <tr>
                <th>NOMBRE</th>
                <th>CORREO</th>
                <th>DOCUMENTO</th>
                <th>ESTADO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.documento}>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.correo}</td>
                  <td>{usuario.documento}</td>
                  <td className={`estado ${(usuario.estado || "pendiente").toLowerCase()}`}>
                    {usuario.estado || "Pendiente"}
                  </td>
                  <td>
                    <div className="acciones-botones">
                      <button
                        onClick={() => aprobarUsuario(usuario.documento)}
                        className="btn-aprobar"
                        disabled={!validarAdmin()}
                      >
                        Aprobar
                      </button>
                      <button
                        onClick={() => rechazarUsuario(usuario.documento)}
                        className="btn-rechazar"
                        disabled={!validarAdmin()}
                      >
                        Rechazar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="sin-registros">
            No hay solicitudes pendientes
          </div>
        )}
      </div>
    </div>
  );
};

export default Aprobaciones;