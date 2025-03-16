
import React from 'react';
import { Link } from 'react-router-dom';
import './nav.menu.module.scss';
const NavMenu: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/events">Events</Link>
        </li>
        </ul>
    </nav>
  );
};

export default NavMenu;
