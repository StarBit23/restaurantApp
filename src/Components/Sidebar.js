import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ handleLogout, user }) => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/home" activeClassName="active">
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/aboutUs" activeClassName="active">
            Sobre nosotros
          </NavLink>
        </li>
        <li>
          <NavLink to="/reservation" activeClassName="active">
            Reservar mesa
          </NavLink>
        </li>
        <li>
        {user && user.uid === 'JUcIhVZk9wZklNPZKdESdUjH1oj2' && (
          <li>
            <NavLink to="/reservas" activeClassName="active">
              Reservas
            </NavLink>
          </li>
        )}
        </li>
        <li>
          <a href="/" onClick={handleLogout}>
            Cerrar sesión
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
