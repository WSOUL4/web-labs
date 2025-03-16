import React from 'react';
//import NavMenu from './components/nav.menu';
import RegisterForm from './components/register.form';
import { Link } from 'react-router-dom';
const RegisterPage: React.FC = () => {
    return (
        <div>
           
            <h1>Регистрация</h1>
            <RegisterForm />
            <Link to="/">На главную</Link>
            <Link to="/auth/login">Назад к входу</Link>
        </div>
    );
};

export default RegisterPage;