import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { saveTokens } from '../../../utils/localStorage';
import {login} from '../../../api/authService';
const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [redirectCountdown, setRedirectCountdown] = useState<number>(5);
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Сброс ошибок перед отправкой
    //console.log('Environment Variables:', process.env);
    //console.log('API URL:', process.env.REACT_APP_API_URL);
    setError(null);
    setLoading(true);
    console.log('Login:', { email, password });
    login(email, password)
    .then((response) => {
        console.log('Успешный вход:', response);

        const { token, refreshToken } = response;
        saveTokens(token, refreshToken);
        setSuccessMessage(
            'Вы успешно вошли в систему! Вы будете перенаправлены через 5 секунд.'
        );
        startRedirectCountdown();
    })
    .catch((error) => {
        setError(
            error.response
                ? error.response.data.message
                : 'Произошла ошибка при входе'
        );
    })
    .finally(() => {
        setLoading(false);
    });
};
  const startRedirectCountdown = () => {
    let countdown = 5;
    setRedirectCountdown(countdown);
    const timer = setInterval(() => {
      countdown -= 1;
      setRedirectCountdown(countdown);
      if (countdown <= 0) {
        clearInterval(timer);
        navigate('/'); // Перенаправление на домашнюю страницу
      }
    }, 1000);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Вход</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {successMessage && (
          <p>Перенаправление через {redirectCountdown} секунд(ы)...</p>
        )}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Загрузка...' : 'Войти'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
