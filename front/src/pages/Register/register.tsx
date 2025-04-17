import React from 'react';
//import NavMenu from './components/nav.menu';
import RegisterForm from './components/register.form';
import { Link } from 'react-router-dom';
import styles from '../../styles/general.module.scss';
import stylesMy from './register.module.scss';
const RegisterPage: React.FC = () => {
  return (
    <div>
      <h1 className={styles.h1}>Регистрация</h1>
      <RegisterForm />
      <Link to="/" className={stylesMy.link}>На главную</Link>
      <Link to="/auth/login" className={stylesMy.link}>Назад к входу</Link>
    </div>
  );
};

export default RegisterPage;
