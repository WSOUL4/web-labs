import React, {useEffect, useState} from 'react';
import NavBox from '../../components/navigation/nav.box';
import { getProfile } from '../../api/profile';
import styles from '../../styles/general.module.scss';

const ProfilePage: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string>('');
    useEffect(() => {
        // Функция для получения профиля
        const fetchProfile = async () => {
          
            
            getProfile()
            .then((response) => {
                console.log('Успешный запрос:', response);
                
              })
            .catch((error) => {
                      const errorCode = error.response?.status;
                      const errorMessage = error.response?.data?.message || 'Что-то пошло не так.';
            
                      if (errorCode === 404) {
                        setErrorMessage('Ошибка 404: Не найдено.');
                      } else if (errorCode === 500) {
                        setErrorMessage('Ошибка 500: Внутренняя ошибка сервера. Попробуйте позже.');
                      } else if (errorCode === 401) {
                        setErrorMessage('Ошибка 401: Вы не авторизованы, или ваш токен доступа прослочился.');
                       
                      } else {
                        setErrorMessage(`Ошибка ${errorCode}: ${errorMessage}`);
                      }
                    });
                };
    
        // Вызов функции получения профиля
        fetchProfile();
    
        // Настройка стилей при монтировании компонента
        document.body.style.placeItems = 'flex-start';
        
        // Очистка стилей при размонтировании компонента
        return () => {
          document.body.style.placeItems = '';
        };
        
      }, []); // Пустой массив зависимостей означает, что эффект выполнится только один раз при монтировании
  return (
    <div>
      <NavBox />
      <h1 className={styles.h1}>Профиль</h1>
      {errorMessage && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;