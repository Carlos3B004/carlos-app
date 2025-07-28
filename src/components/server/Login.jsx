import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../Header/Header';
import '../../assets/css/login.css';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [codigoAdmin, setCodigoAdmin] = useState('');
  const [mensaje, setMensaje] = useState('');

  const navigate = useNavigate();
  const mostrarCampoCodigo = tipoUsuario === 'admin';

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos vacíos
    if (!correo || !contrasena || !tipoUsuario) {
      setMensaje('❌ Complete todos los campos obligatorios.');
      return;
    }

    // Validación para admin
    if (tipoUsuario === 'admin') {
      if (!codigoAdmin) {
        setMensaje('❌ Ingrese el código de administrador.');
        return;
      }
      if (codigoAdmin !== 'ULEAM123') {
        setMensaje('❌ Código de administrador incorrecto.');
        return;
      }
      navigate('/paneladmi');
    } else {
      const usuarioActivo = {
        correo,
        nombre: correo.split('@')[0]
      };
      localStorage.setItem('usuarioActivo', JSON.stringify(usuarioActivo));
      navigate('/panel');
    }
  };

  return (
    <div className="login-container">
      <Header 
        title="Hotel ULEAM"
        navItems={[
          { path: "/", icon: "🏠", label: "Inicio" }
        ]}
      />

      <main className="contenedor-login">
        <form onSubmit={handleSubmit} className="formulario-login">
          <h2 className="titulo-login">Accede a tu cuenta</h2>

          <div className="campo-formulario">
            <label htmlFor="correo">Correo electrónico:</label>
            <input
              type="email"
              id="correo"
              placeholder="ejemplo@correo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              className="input-login"
            />
          </div>

          <div className="campo-formulario">
            <label htmlFor="contrasena">Contraseña:</label>
            <input
              type="password"
              id="contrasena"
              placeholder="Tu contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
              className="input-login"
            />
          </div>

          <div className="campo-formulario">
            <label htmlFor="tipoUsuario">Tipo de usuario:</label>
            <select
              id="tipoUsuario"
              value={tipoUsuario}
              onChange={(e) => {
                setTipoUsuario(e.target.value);
                setMensaje('');
                setCodigoAdmin('');
              }}
              required
              className="select-login"
            >
              <option value="">Seleccione</option>
              <option value="usuario">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          {mostrarCampoCodigo && (
            <div className="campo-formulario">
              <label htmlFor="codigoAdmin">Código de administrador:</label>
              <input
                type="password"
                id="codigoAdmin"
                placeholder="Código secreto"
                value={codigoAdmin}
                onChange={(e) => setCodigoAdmin(e.target.value)}
                className="input-login"
              />
            </div>
          )}

          <button type="submit" className="boton-login">
            Iniciar Sesión
          </button>

          <p className="enlace-registro">
            ¿No tienes una cuenta? <Link to="/registro" className="enlace-registro-texto">Regístrate aquí</Link>
          </p>

          {mensaje && <p className="mensaje-error">{mensaje}</p>}
        </form>
      </main>
    </div>
  );
};

export default Login;