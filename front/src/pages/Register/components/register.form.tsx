import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {registerUser} from '../../../api/authService';

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [redirectCountdown, setRedirectCountdown] = useState<number>(5);
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    setError(null);
    setLoading(true);

    registerUser(email, name, password) // Используем функцию registerUser
            .then((response) => {
                console.log('Регистрация успешна:', response);
                setSuccessMessage(
                    'Регистрация успешна! Вы будете перенаправлены через 5 секунд.'
                );
                startRedirectCountdown();
            })
            .catch((error) => {
                setError(
                    error.response
                        ? error.response.data.message
                        : 'Произошла ошибка при регистрации'
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
        navigate('/auth/login');
      }
    }, 1000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Регистрация</h2>
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
          <label htmlFor="name">Name:</label>
          <input
            type="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        <div>
          <label htmlFor="confirmPassword">Подтвердите пароль:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Загрузка...' : 'Зарегистрировать'}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
