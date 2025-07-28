import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/server/Login';
import Registro from './components/server/Registro';
import Paneladmin from './components/server/Paneladmin';
import Habitaciones from './components/Users/Habitaciones';
import Reservas from './components/Users/Reservas';
import Usuarios from './components/Users/usuarios'; 
import Aprobaciones from './components/Users/Aprobaciones';
import Facturacion from './components/Users/Facturacion';
import Panel from './components/Users/Panel';
import HabitacionesUsuario from './components/server/Habitacionesusuarios';
import Inicio from './components/server/Inicio';
import Registroreservas from './components/server/Registroreservas';

import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/paneladmi" element={<Paneladmin />} />
          <Route path="/habitaciones" element={<Habitaciones />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/aprobaciones" element={<Aprobaciones />} />
          <Route path="/facturacion" element={<Facturacion />} />
          <Route path="/panel" element={<Panel />} />
          <Route path="/habitacionesusuario" element={<HabitacionesUsuario />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/registroreservas" element={<Registroreservas />} />

          {/* Ruta 404 */}
          <Route path="*" element={<h2>Página no encontrada</h2>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
