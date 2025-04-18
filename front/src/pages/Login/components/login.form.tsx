import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../components/store/auth.slice'; // Импортируем thunk для входа
import styles from './login.form.module.scss'; // Импортируем стили
import { useAppDispatch, useSelectorMy,RootState } from '../../../components/store/store'; 

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Получаем состояние из Redux
  const {  isLoading, isAuthenticated, errorMessage } = useSelectorMy((state) => state.auth);
  const { data: dataProfile, loading: loadingProfile, error: errorProfile } = useSelectorMy((state: RootState) => state.profile); 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  // Эффект для перенаправления после успешного входа
  useEffect(() => {
    if (isAuthenticated) {
      console.log(dataProfile);
      navigate('/events'); // Перенаправление на страницу событий
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2>Вход</h2>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Загрузка...' : 'Войти'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;