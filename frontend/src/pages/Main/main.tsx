
import React from 'react';
import NavMenu from './components/nav.menu';
import AuthMenu from './components/auth.menu';
import logo from '../../assets/bigLogo.png';
const HomePage: React.FC = () => {
    return (
        <div>
            <div><NavMenu /> <AuthMenu /></div>
            <h1>Добро пожаловать на главную страницу!</h1>
            <img src={logo} alt="Описание изображения" style={{ width: '300px', height: 'auto' }} />
            <p>Это простое приложение для создания событий и их поиска.</p>
        </div>
    );
};

export default HomePage;
