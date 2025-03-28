import React from 'react';
import { Link } from 'react-router-dom';
import styles from './nav.menu.module.scss';

const NavMenu: React.FC = () => {
  return (
    <nav className={styles.nav_menu}>
      <ul className={styles.nav_list}>
        <li className={styles.nav_item}>
          <Link className={styles.nav_link} to="/">Home</Link>
        </li>
        <li className={styles.nav_item}>
          <Link className={styles.nav_link} to="/events">Events</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
