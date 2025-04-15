import React from 'react';
import { Link } from 'react-router-dom';
import styles from './auth.menu.module.scss';
import { handleLogout } from '../../utils/localStorage';
import {  useSelectorMy,useAppDispatch } from '../store/store';
import { logout } from '../store/auth.slice';
//import handleLogout from '@utils/localStorage';
const NavMenu: React.FC = () => {
  // Проверяем наличие токенов в локальном хранилище
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  const dispatch = useAppDispatch(); 
  const {isAuthenticated}=useSelectorMy((state)=>state.auth)
  const localLogout=()=>{
    //console.log('logging out');
    dispatch(logout());
  }
  return (
    <nav className={styles.nav_menu}>
      <ul className={styles.nav_list}>
        {isAuthenticated===true && token && refreshToken ? (
          // Если токены есть, отображаем ссылки для выхода или других защищенных страниц
          <>
            <li className={styles.nav_item}>
              <Link className={styles.nav_link} to="/profile">
                Profile
              </Link>
            </li>
            <li className={styles.nav_item}>
            <Link className={styles.nav_link} to="/">
              <button
                className={`${styles.nav_link} ${styles.nav_button}`}

                onClick={localLogout}
              >
                Logout
              </button>
              </Link>
            </li>
          </>
        ) : (
          // Если токенов нет, показываем ссылки для входа и регистрации
          <>
            <li className={styles.nav_item}>
              <Link className={styles.nav_link} to="/auth/login">
                Login
              </Link>
            </li>
            <li className={styles.nav_item}>
              <Link className={styles.nav_link} to="/auth/register">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavMenu;
