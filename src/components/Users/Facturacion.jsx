import React, { useState } from "react";
import Header from '../Header/Header'; 
import "../../assets/css/facturacion.css";

const Facturacion = () => {
  const [docBuscar, setDocBuscar] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [factura, setFactura] = useState(null);

  const handleBuscar = (e) => {
    e.preventDefault();

    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    const habitaciones = JSON.parse(localStorage.getItem("habitaciones")) || [];

    const res = reservas.find((r) => r.documento === docBuscar);

    if (!res) {
      setMensaje("No se encontró ninguna reserva con ese documento.");
      setFactura(null);
      return;
    }

    const habitacion = habitaciones.find((h) => h.tipo === res.tipoHabitacion);
    const precioNoche = habitacion ? parseFloat(habitacion.precio) : 50;

    const fechaInicio = new Date(res.fechaEntrada);
    const fechaFin = new Date(res.fechaSalida);
    const dias = Math.ceil((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24));
    const subtotal = dias * precioNoche;
    const impuestos = subtotal * 0.12;
    const total = subtotal + impuestos;

    const nuevaFactura = {
      documento: res.documento,
      nombre: res.nombre,
      correo: res.correo,
      total,
      fecha: new Date().toLocaleDateString(),
      fechaEntrada: res.fechaEntrada,
      fechaSalida: res.fechaSalida,
      tipoHabitacion: res.tipoHabitacion,
      precioNoche,
      dias,
      subtotal,
      impuestos,
    };

    setFactura(nuevaFactura);
    setMensaje("");
  };

  const generarFactura = () => {
    if (!factura) return;

    const facturas = JSON.parse(localStorage.getItem("facturas")) || [];
    facturas.push(factura);
    localStorage.setItem("facturas", JSON.stringify(facturas));

    setMensaje("Factura generada y guardada exitosamente.");
    setFactura(null);
  };

  return (
    <div className="facturacion-container">
      {/* Usamos el componente Header reutilizable */}
      <Header 
        title="Generar Factura"
        navItems={[
          { path: "/", icon: "🏠", label: "Principal" }
        ]}
      />

      <div className="facturacion-content">
        <form onSubmit={handleBuscar} className="facturacion-form">
          <label htmlFor="docBuscar">Documento de identidad:</label>
          <input
            type="text"
            id="docBuscar"
            value={docBuscar}
            onChange={(e) => setDocBuscar(e.target.value)}
            required
            placeholder="Ingrese el número de documento"
          />
          <button type="submit" className="btn-buscar">Buscar Reserva</button>
        </form>

        {factura && (
          <section className="factura-section">
            <h2>Factura del Cliente</h2>
            <div className="factura-grid">
              <div className="factura-item">
                <div className="factura-label">Nombre:</div>
                <div className="factura-value">{factura.nombre}</div>
              </div>
              <div className="factura-item">
                <div className="factura-label">Correo:</div>
                <div className="factura-value">{factura.correo}</div>
              </div>
              <div className="factura-item">
                <div className="factura-label">Fechas:</div>
                <div className="factura-value">{factura.fechaEntrada} al {factura.fechaSalida}</div>
              </div>
              <div className="factura-item">
                <div className="factura-label">Tipo de Habitación:</div>
                <div className="factura-value">{factura.tipoHabitacion}</div>
              </div>
              <div className="factura-item">
                <div className="factura-label">Precio por noche:</div>
                <div className="factura-value">${factura.precioNoche.toFixed(2)}</div>
              </div>
              <div className="factura-item">
                <div className="factura-label">Días de estadía:</div>
                <div className="factura-value">{factura.dias}</div>
              </div>
              <div className="factura-item">
                <div className="factura-label">Subtotal:</div>
                <div className="factura-value">${factura.subtotal.toFixed(2)}</div>
              </div>
              <div className="factura-item">
                <div className="factura-label">Impuestos (12%):</div>
                <div className="factura-value">${factura.impuestos.toFixed(2)}</div>
              </div>
              <div className="factura-total">
                <div className="factura-label">Total a pagar:</div>
                <div className="factura-value">${factura.total.toFixed(2)}</div>
              </div>
            </div>

            <button onClick={generarFactura} className="btn-generar">Generar Factura</button>
          </section>
        )}

        {mensaje && (
          <p className={`mensaje ${mensaje.includes("éxito") ? "mensaje-exito" : "mensaje-error"}`}>
            {mensaje}
          </p>
        )}
      </div>
    </div>
  );
};

export default Facturacion;