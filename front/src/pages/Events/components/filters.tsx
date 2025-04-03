import React, { useState } from 'react';
import { isLoggedIn } from '../../../utils/localStorage';
import { findAll, findMy, findBetweenDates } from '../../../api/eventService';
import { refresh } from '../../../api/authService';
import { useEvents } from './eventsContext'; // Импорт контекст
import styles from './filters.module.scss';

type FilterOption = 'My' | 'Dates' | 'All';

const DropdownFilter: React.FC = () => {
  const { setEvents,clearEvents } = useEvents(); // Получаем setEvents из контекста
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('All');
  const [dateStart, setDateStart] = useState<string>('');
  const [dateEnd, setDateEnd] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const isUserLoggedIn = isLoggedIn();

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value as FilterOption);
    setDateStart('');
    setDateEnd('');
  };

  const handleDateStartChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateStart(event.target.value);
  };

  const handleDateEndChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateEnd(event.target.value);
  };

  const handleSearch = () => {
    
    clearEvents();
    if (selectedFilter === 'All') {
      findAll()
        .then((response) => {
          console.log('Успешный запрос:', response);
          setEvents(response); // Сохраняем события в контексте
          setErrorMessage('');
        })
        .catch((error) => {
          const errorCode = error.response?.status;
          const errorMessage = error.response?.data?.message || 'Что-то пошло не так.';

          if (errorCode === 404) {
            setErrorMessage('Ошибка 404: Не найдено.');
          } else if (errorCode === 500) {
            setErrorMessage('Ошибка 500: Внутренняя ошибка сервера. Попробуйте позже.');
          } else if (errorCode === 401) {
            setErrorMessage('Ошибка 401: Вы не авторизованы, или ваш токен доступа прослочился.\nТокен сделал обновление, попробуйте ещё 1 раз.');
            refresh();
          } else {
            setErrorMessage(`Ошибка ${errorCode}: ${errorMessage}`);
          }
        });
    } else if (selectedFilter === 'My') {
      findMy()
        .then((response) => {
          console.log('Успешный запрос:', response);
          setEvents(response);
          setErrorMessage('');
        })
        .catch((error) => {
          const errorCode = error.response?.status;
          const errorMessage = error.response?.data?.message || 'Что-то пошло не так.';

          if (errorCode === 404) {
            setErrorMessage('Ошибка 404: Не найдено.');
          } else if (errorCode === 500) {
            setErrorMessage('Ошибка 500: Внутренняя ошибка сервера. Попробуйте позже.');
          } else if (errorCode === 401) {
            setErrorMessage('Ошибка 401: Вы не авторизованы, или ваш токен доступа прослочился.\nТокен сделал обновление, попробуйте ещё 1 раз.');
            refresh();
          } else {
            setErrorMessage(`Ошибка ${errorCode}: ${errorMessage}`);
          }
        });
    } else if (selectedFilter === 'Dates') {
      findBetweenDates(dateStart, dateEnd)
        .then((response) => {
          console.log('Успешный запрос:', response);
          setEvents(response);
          setErrorMessage('');
        })
        .catch((error) => {
          const errorCode = error.response?.status;
          const errorMessage = error.response?.data?.message || 'Что-то пошло не так.';

          if (errorCode === 404) {
            setErrorMessage('Ошибка 404: Не найдено.');
          } else if (errorCode === 500) {
            setErrorMessage('Ошибка 500: Внутренняя ошибка сервера. Попробуйте позже.');
          } else if (errorCode === 401) {
            setErrorMessage('Ошибка 401: Вы не авторизованы, или ваш токен доступа прослочился.\nТокен сделал обновление, попробуйте ещё 1 раз.');
            refresh();
          } else {
            setErrorMessage(`Ошибка ${errorCode}: ${errorMessage}`);
          }
        });
    }
  };

  return (
    <div className={styles.container}>
      <label htmlFor="filter" className={styles.label}>Фильтр:</label>
      <select id="filter" value={selectedFilter} onChange={handleFilterChange} className={styles.select}>
        {isUserLoggedIn && <option value="My">Мои</option>}
        <option value="Dates">По датам</option>
        <option value="All">Все</option>
      </select>

      {selectedFilter === 'Dates' && (
        <div>
          <label htmlFor="dateStart" className={styles.label}>Дата начала:</label>
          <input
            type="date"
            id="dateStart"
            value={dateStart}
            onChange={handleDateStartChange}
            className={styles.input}
          />

          <label htmlFor="dateEnd" className={styles.label}>Дата конца:</label>
          <input
            type="date"
            id="dateEnd"
            value={dateEnd}
            onChange={handleDateEndChange}
            className={styles.input}
          />
        </div>
      )}
      <button onClick={handleSearch} className={styles.button}>
        Искать
      </button>
      {errorMessage && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default DropdownFilter;