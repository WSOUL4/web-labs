import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../api/authService';
import styles from './login.form.module.scss'; // Импортируем стили

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [redirectCountdown, setRedirectCountdown] = useState<number>(5);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    login(email, password)
      .then((response) => {
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
              navigate('/events'); // Перенаправление на страницу событий
          }
      }, 1000);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2>Вход</h2>
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