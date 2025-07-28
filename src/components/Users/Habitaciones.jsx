import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import "../../assets/css/habitaciones.css";

function Habitaciones() {
  const [habitaciones, setHabitaciones] = useState([]);
  const [form, setForm] = useState({ 
    numero: '', 
    tipo: '', 
    estado: 'Disponible', 
    precio: '', 
    indice: -1 
  });

  // Cargar datos al inicio
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('habitaciones')) || [];
    setHabitaciones(data);
  }, []);

  // Guardar datos automáticamente
  useEffect(() => {
    localStorage.setItem('habitaciones', JSON.stringify(habitaciones));
  }, [habitaciones]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const nuevaHab = {
      numero: form.numero.trim(),
      tipo: form.tipo,
      estado: form.estado,
      precio: parseFloat(form.precio).toFixed(2),
    };

    if (form.indice >= 0) {
      // Editar habitación existente
      const nuevas = [...habitaciones];
      nuevas[form.indice] = nuevaHab;
      setHabitaciones(nuevas);
    } else {
      // Agregar nueva habitación
      if (habitaciones.some(h => h.numero === nuevaHab.numero)) {
        alert('Ya existe una habitación con ese número');
        return;
      }
      setHabitaciones([...habitaciones, nuevaHab]);
    }

    // Resetear formulario
    setForm({ numero: '', tipo: '', estado: 'Disponible', precio: '', indice: -1 });
  };

  const editarHabitacion = (i) => {
    const h = habitaciones[i];
    setForm({ 
      numero: h.numero, 
      tipo: h.tipo, 
      estado: h.estado, 
      precio: h.precio, 
      indice: i 
    });
  };

  const eliminarHabitacion = (i) => {
    if (window.confirm('¿Eliminar esta habitación?')) {
      const nuevas = [...habitaciones];
      nuevas.splice(i, 1);
      setHabitaciones(nuevas);
    }
  };

  return (
    <div className="contenedor-habitaciones">
      <Header 
        title="Gestión de Habitaciones"
        navItems={[
          { path: "/inicio", label: "Página Principal" },
          { path: "/paneladmi", label: "Panel de Administrador" }
        ]}
      />

      <div className="contenido-principal">
        <section className="formulario-transparente">
          <h2>{form.indice >= 0 ? 'Editar habitación' : 'Agregar nueva habitación'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="campo-formulario">
              <label htmlFor="numero">Número</label>
              <input 
                type="text" 
                id="numero" 
                value={form.numero} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="campo-formulario">
              <label htmlFor="tipo">Tipo</label>
              <select 
                id="tipo" 
                value={form.tipo} 
                onChange={handleChange} 
                required
              >
                <option value="">Seleccione</option>
                <option>Individual</option>
                <option>Doble</option>
                <option>Suite</option>
              </select>
            </div>

            <div className="campo-formulario">
              <label htmlFor="estado">Estado</label>
              <select 
                id="estado" 
                value={form.estado} 
                onChange={handleChange} 
                required
              >
                <option>Disponible</option>
                <option>Ocupada</option>
                <option>Mantenimiento</option>
              </select>
            </div>

            <div className="campo-formulario">
              <label htmlFor="precio">Precio por noche ($)</label>
              <input 
                type="number" 
                id="precio" 
                value={form.precio} 
                min="0" 
                step="0.01" 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="botones-formulario">
              <button type="submit" className="btn-actualizar">
                {form.indice >= 0 ? 'Actualizar' : 'Guardar'}
              </button>
              <button 
                type="button" 
                className="btn-cancelar" 
                onClick={() => setForm({ 
                  numero: '', 
                  tipo: '', 
                  estado: 'Disponible', 
                  precio: '', 
                  indice: -1 
                })}
              >
                Cancelar
              </button>
            </div>
          </form>
        </section>

        <section className="tabla-habitaciones">
          <h2>Lista de habitaciones</h2>
          <div className="contenedor-tabla">
            <table>
              <thead>
                <tr>
                  <th>Número</th>
                  <th>Tipo</th>
                  <th>Estado</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {habitaciones.length > 0 ? (
                  habitaciones.map((h, i) => (
                    <tr key={i}>
                      <td>{h.numero}</td>
                      <td>{h.tipo}</td>
                      <td>{h.estado}</td>
                      <td>${h.precio}</td>
                      <td>
                        <button 
                          onClick={() => editarHabitacion(i)} 
                          className="btn-editar"
                        >
                          Editar
                        </button>
                        <button 
                          onClick={() => eliminarHabitacion(i)} 
                          className="btn-eliminar"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="sin-registros">
                      No hay habitaciones registradas
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Habitaciones;
