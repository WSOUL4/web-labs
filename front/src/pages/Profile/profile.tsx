// ProfilePage.tsx
import React, { useEffect } from 'react';
import NavBox from '../../components/navigation/nav.box';
import { useAppDispatch, useSelectorMy } from '../../components/store/store'; // Импортируем типизированные хуки
import { fetchProfile } from '../../components/store/slices'; // Импортируем thunk для получения профиля
import { RootState } from '../../components/store/store'; // Импортируйте RootState для типизации
import styles from '../../styles/general.module.scss';

const ProfilePage: React.FC = () => {
    const dispatch = useAppDispatch(); // Используем типизированный dispatch
    
    // Используем типизированный селектор
    const { data, loading, error } = useSelectorMy((state: RootState) => state.profile); // Получаем данные из состояния

    useEffect(() => {
        dispatch(fetchProfile()); // Вызов функции получения профиля при монтировании компонента

        // Настройка стилей при монтировании компонента
        document.body.style.placeItems = 'flex-start';

        // Очистка стилей при размонтировании компонента
        return () => {
            document.body.style.placeItems = '';
        };
    }, [dispatch]);

    return (
        <div>
            <NavBox />
            <h1 className={styles.h1}>Профиль</h1>
            {loading && <p>Загрузка...</p>}
            {error && (
                <div style={{ color: 'red', marginTop: '10px' }}>
                    {error}
                </div>
            )}
            {data && (
                <div>
                    {/* Здесь вы можете отобразить данные профиля */}
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                    {/* Или отобразите конкретные поля */}
                    <p>Имя: {data.name}</p>
                    <p>Email: {data.email}</p>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;