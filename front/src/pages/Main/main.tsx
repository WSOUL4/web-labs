import React, { useEffect } from 'react';
import NavBox from '../../components/navigation/nav.box';
import logo from '../../assets/bigLogo.png';
import styles from '../../styles/general.module.scss';
const HomePage: React.FC = () => {
  useEffect(() => {
    //document.body.style.display = 'flex';
    document.body.style.placeItems = 'flex-start';

    return () => {
      //document.body.style.display = '';
      document.body.style.placeItems = '';
    };
  }, []);
  return (
    <div>
      <NavBox />
      <h1 className={styles.h1}>Добро пожаловать на главную страницу!</h1>
      <img
        src={logo}
        alt="Описание изображения"
        style={{ width: '300px', height: 'auto' }}
      />
      <p className={styles.h1}>Это простое приложение для создания событий и их поиска.</p>
    </div>
  );
};

export default HomePage;
