import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/habitacionesusuario.css";

const HabitacionesUsuario = () => {
  const [habitaciones, setHabitaciones] = useState([]);

  // Cargar y filtrar habitaciones disponibles
  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("habitaciones")) || [];
      const habitacionesDisponibles = data.filter(
        h => h.estado === "Disponible" && h.numero && h.precio
      );
      setHabitaciones(habitacionesDisponibles);
      console.log("Habitaciones disponibles:", habitacionesDisponibles); // Depuración
    } catch (error) {
      console.error("Error al cargar habitaciones:", error);
    }
  }, []);

  return (
    <div>
      <header className="encabezado">
        <h1>Habitaciones Disponibles</h1>
        <nav>
          <ul>
            <li>
              <Link to="/panel" className="btn btn-secundario"> 🔙 Volver al Panel</Link>
            </li>
            <li>
              <Link to="/reservas" className="btn btn-secundario"> 📅 Realizar Reserva </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="contenedor-habitaciones">
        <section className="tabla">
          <h2>Habitaciones disponibles para reservar</h2>
          {habitaciones.length === 0 ? (
            <p className="mensaje-vacio">No hay habitaciones disponibles en este momento.</p>
          ) : (
            <table id="tablaHabitaciones">
              <thead>
                <tr>
                  <th>Número</th>
                  <th>Tipo</th>
                  <th>Estado</th>
                  <th>Precio por noche</th>
                </tr>
              </thead>
              <tbody>
                {habitaciones.map((h, index) => (
                  <tr key={index}>
                    <td>{h.numero}</td>
                    <td>{h.tipo}</td>
                    <td>{h.estado}</td>
                    <td>${h.precio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
};

export default HabitacionesUsuario;