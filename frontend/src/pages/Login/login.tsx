import React from 'react';
import { Link } from 'react-router-dom';
//import NavMenu from './components/nav.menu';
import LoginForm from './components/login.form';

const LoginPage: React.FC = () => {
    return (
        <div>
            
            <h1>Авторизация</h1>
            <LoginForm />
            <Link to="/">На главную</Link>
            <Link to="/auth/register">Регистрация</Link>
        </div>
    );
};

export default LoginPage;