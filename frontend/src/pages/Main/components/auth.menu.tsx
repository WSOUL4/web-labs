import React from 'react';
import { Link } from 'react-router-dom';
import './auth.menu.module.scss';
const NavMenu: React.FC = () => {
  return (
    <nav>
        <ul>
        <li>
          <Link to="/auth/login">Login</Link>
        </li>
        <li>
          <Link to="/auth/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;