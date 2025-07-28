import React, { useEffect, useState } from "react";
import "../../assets/css/registro.reservas.css"; // Asegúrate que exista

const Registroreservas = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem("reservas")) || [];
    setReservas(datos);
  }, []);

  const eliminarReservas = () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar todas las reservas?")) {
      localStorage.removeItem("reservas");
      setReservas([]);
    }
  };

  return (
  
  <div className="registro-container">
    <h1 className="titulo-principal">Reservas Registradas</h1>
    <h2 className="subtitulo">Lista de reservas realizadas</h2>
    
    <div className="navegacion">
      <a href="/" className="btn-nav btn-primario">🏠 Inicio</a>
      <a href="/reservas" className="btn-nav btn-secundario">📅 Realizar Nueva Reserva</a>
    </div>
  
    {reservas.length === 0 ? (
      <p className="sin-reservas">No hay reservas registradas aún.</p>
    ) : (
      <div className="reservas-list">
        {reservas.map((reserva, index) => (
          <div key={index} className="reserva-card">
            <div className="reserva-grid">
              <div className="reserva-item">
                <span className="reserva-label">Nombre: </span>
                <span className="reserva-value">{reserva.nombre}</span>
              </div>
              <div className="reserva-item">
                <span className="reserva-label">Correo: </span>
                <span className="reserva-value">{reserva.correo}</span>
              </div>
              <div className="reserva-item">
                <span className="reserva-label">Documento: </span>
                <span className="reserva-value">{reserva.documento}</span>
              </div>
              <div className="reserva-item">
                <span className="reserva-label">Teléfono: </span>
                <span className="reserva-value">{reserva.telefono}</span>
              </div>
              <div className="reserva-item">
                <span className="reserva-label">Entrada: </span>
                <span className="reserva-value">{reserva.fechaEntrada}</span>
              </div>
              <div className="reserva-item">
                <span className="reserva-label">Salida: </span>
                <span className="reserva-value">{reserva.fechaSalida}</span>
              </div>
              <div className="reserva-item">
                <span className="reserva-label">Habitación: </span>
                <span className="reserva-value">{reserva.tipoHabitacion}</span>
              </div>
              <div className="reserva-item">
                <span className="reserva-label">Personas: </span>
                <span className="reserva-value">{reserva.personas}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}


    <div className="btn-eliminar-container">
      <h3>Borrar todas las reservas</h3>
      <button onClick={eliminarReservas} className="btn-eliminar">
        🗑️ Borrar todas las reservas
      </button>
    </div>
  </div>
);
}
export default Registroreservas;
