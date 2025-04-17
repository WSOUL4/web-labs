import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './components/login.form';
import {isLoggedIn} from '../../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/general.module.scss';
import stylesMy from './login.module.scss';
import { useAppDispatch, useSelectorMy } from '../../components/store/store'; 
const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const {isAuthenticated}=useSelectorMy((state)=>state.auth)
    useEffect(() => {
    // Проверяем, залогинен ли пользователь
    if (isAuthenticated) {
      // Если да, перенаправляем на страницу событий
      navigate('/events');
    }
  }, [navigate]); // Зависимость для useEffect
  return (
    <div>
      <h1 className={styles.h1}>Авторизация</h1>
      <LoginForm />
      <Link to="/" className={stylesMy.link}>На главную</Link>
      <Link to="/auth/register" className={stylesMy.link}>Регистрация</Link>
    </div>
  );
};

export default LoginPage;
