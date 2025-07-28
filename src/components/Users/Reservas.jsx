import React, { useState } from "react";
import Header from '../Header/Header'; // Importamos el componente Header
import '../../assets/css/reservas.css';

const ReservaForm = () => {
  const [mensaje, setMensaje] = useState("");

  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    documento: "",
    fechaEntrada: "",
    fechaSalida: "",
    tipoHabitacion: "",
    personas: 1
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormulario({ ...formulario, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    reservas.push(formulario);
    localStorage.setItem("reservas", JSON.stringify(reservas));

    setMensaje("✅ ¡Reserva guardada exitosamente!");
    setFormulario({
      nombre: "",
      correo: "",
      telefono: "",
      documento: "",
      fechaEntrada: "",
      fechaSalida: "",
      tipoHabitacion: "",
      personas: 1
    });
  };

  return (
    <div className="reserva-container">
      <Header 
        title="Reservar Habitación"
        navItems={[
          { path: "/", icon: "🏠", label: "Inicio" },
          { path: "/Registroreservas", icon: "🗂️", label: "Historial" }
        ]}
      />

      <main className="contenido-principal">
        <form id="formReserva" onSubmit={handleSubmit} className="formulario-reserva">
          <h2 className="titulo-formulario">Complete los datos de reserva</h2>
          
          <div className="grupo-campos">
            <div className="campo-formulario">
              <label htmlFor="nombre">Nombre completo:</label>
              <input 
                type="text" 
                id="nombre" 
                value={formulario.nombre} 
                onChange={handleChange} 
                required 
                placeholder="Ej: Juan Pérez"
              />
            </div>

            <div className="campo-formulario">
              <label htmlFor="correo">Correo electrónico:</label>
              <input 
                type="email" 
                id="correo" 
                value={formulario.correo} 
                onChange={handleChange} 
                required 
                placeholder="ejemplo@correo.com"
              />
            </div>
          </div>

          <div className="grupo-campos">
            <div className="campo-formulario">
              <label htmlFor="telefono">Teléfono:</label>
              <input 
                type="tel" 
                id="telefono" 
                value={formulario.telefono} 
                onChange={handleChange} 
                required 
                placeholder="+1234567890"
              />
            </div>

            <div className="campo-formulario">
              <label htmlFor="documento">Documento de identidad:</label>
              <input 
                type="text" 
                id="documento" 
                value={formulario.documento} 
                onChange={handleChange} 
                required 
                placeholder="Cédula o pasaporte"
              />
            </div>
          </div>

          <div className="grupo-campos">
            <div className="campo-formulario">
              <label htmlFor="fechaEntrada">Fecha de entrada:</label>
              <input 
                type="date" 
                id="fechaEntrada" 
                value={formulario.fechaEntrada} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="campo-formulario">
              <label htmlFor="fechaSalida">Fecha de salida:</label>
              <input 
                type="date" 
                id="fechaSalida" 
                value={formulario.fechaSalida} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <div className="grupo-campos">
            <div className="campo-formulario">
              <label htmlFor="tipoHabitacion">Tipo de habitación:</label>
              <select 
                id="tipoHabitacion" 
                value={formulario.tipoHabitacion} 
                onChange={handleChange} 
                required
              >
                <option value="">Seleccione una opción</option>
                <option value="sencilla">Individual</option>
                <option value="doble">Doble</option>
                <option value="suite">Suite</option>
              </select>
            </div>

            <div className="campo-formulario">
              <label htmlFor="personas">Número de personas:</label>
              <input 
                type="number" 
                id="personas" 
                value={formulario.personas} 
                onChange={handleChange} 
                min="1" 
                max="10" 
                required 
              />
            </div>
          </div>

          {mensaje && <div className="mensaje-exito">{mensaje}</div>}

          <div className="botones-form">
            <button type="submit" className="btn-primario">
              Reservar Ahora
            </button>
            <button 
              type="reset" 
              className="btn-secundario"
              onClick={() => setFormulario({
                nombre: "",
                correo: "",
                telefono: "",
                documento: "",
                fechaEntrada: "",
                fechaSalida: "",
                tipoHabitacion: "",
                personas: 1
              })}
            >
              Cancelar
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ReservaForm;