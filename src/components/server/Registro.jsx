import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/registro.css';

const RegistroCliente = () => {
  const [mensaje, setMensaje] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoUsuario = {
      nombre: e.target.nombre.value,
      correo: e.target.correo.value,
      telefono: e.target.telefono.value,
      documento: e.target.documento.value,
      contrasena: e.target.contrasena.value,
      aprobado: false,
      tipo: "cliente"
    };

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    setMensaje("Registro exitoso. Esperando aprobación del administrador.");
    e.target.reset();
  };

  return (
    <div>
      <header className="encabezado">
        <h1>Hotel Uleam</h1>
          <nav>
            <ul>
              <li>
                <Link to="/" className="nav-link">🏠 Inicio</Link>
              </li>
              <li>
                <Link to="/usuarios" className="nav-link">👤 Clientes Registrados</Link>
              </li>
            </ul>
          </nav>
      </header>

      <main className="contenedor-registro">
        <div className="form-wrapper">
          <form id="formRegistro" onSubmit={handleSubmit}>
            <h2>Crea tu cuenta</h2>

            <label htmlFor="nombre">Nombre
              <input type="text" id="nombre" name="nombre" placeholder="Tu nombre completo" required />
            </label>

            <label htmlFor="correo">Correo electrónico
              <input type="email" id="correo" name="correo" placeholder="ejemplo@correo.com" required />
            </label>

            <label htmlFor="telefono">Teléfono
              <input type="text" id="telefono" name="telefono" placeholder="+593 ..." required />
            </label>

            <label htmlFor="documento">Documento de identidad
              <input type="text" id="documento" name="documento" placeholder="Cédula o pasaporte" required />
            </label>

            <label htmlFor="contrasena">Contraseña
              <input type="password" id="contrasena" name="contrasena" placeholder="Mínimo 6 caracteres" required />
            </label>

            <div className="botones">
              <button type="submit" className="btn primario">Registrarse</button>
              <button type="reset" className="btn secundario">Cancelar</button>
            </div>
          </form>
          <p id="mensaje">{mensaje}</p>
        </div>
      </main>
    </div>
  );
};

export default RegistroCliente;
