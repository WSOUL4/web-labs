import React, { useEffect } from 'react';
import NavBox from '../../components/navigation/nav.box';
import styles from '../../styles/general.module.scss';
const NotFoundPage: React.FC = () => {
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
      <h1 className={styles.h1}>404</h1>
      <p>
        Если вы попали сюда, значит этого функционала пока нет, или вы
        неправильно ввели ссылку.
      </p>
    </div>
  );
};

export default NotFoundPage;
