import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {registerUser} from '../../../api/authService';
import styles from './register.form.module.scss';
const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [redirectCountdown, setRedirectCountdown] = useState<number>(5);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    setError(null);
    setLoading(true);

    registerUser(email, name, password)
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
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        {error && <p className={styles.error}>{error}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}
        {successMessage && (
          <p>Перенаправление через {redirectCountdown} секунд(ы)...</p>
        )}
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Имя:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
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
