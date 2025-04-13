// ProfilePage.tsx
import React, { useEffect, useState } from 'react';
import NavBox from '../../components/navigation/nav.box';
import { useAppDispatch, useSelectorMy,RootState } from '../../components/store/store'; 
import { fetchProfile } from '../../components/store/profile/slices'; 
import { fetchMyEvents, updateEvents } from '../../components/store/events/slices';
import styles from '../../styles/general.module.scss';
import stylesProfile from './profile.module.scss';
import { EventData } from '../Events/components/eventsContext';
import stylesEvent from '../Events/components/event.instance.module.scss';
import stylesEventContainer from '../Events/components/container.module.scss';
import EventForm from './components/event.form';
import {changeEvent} from '../../api/eventService';
import { refresh } from '../../api/authService';
const ProfilePage: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const dispatch = useAppDispatch(); 
    
    // Используем типизированный селектор
    const { data: dataProfile, loading: loadingProfile, error: errorProfile } = useSelectorMy((state: RootState) => state.profile); 
    const { data: dataEvents, loading: loadingEvents, error: errorEvents } = useSelectorMy((state: RootState) => state.events);

    // Состояние для управления формой
    const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchProfile()); 
        dispatch(fetchMyEvents());
      
        document.body.style.placeItems = 'flex-start';

       
        return () => {
            document.body.style.placeItems = '';
        };
    }, [dispatch]);
//<pre>{JSON.stringify(dataProfile, null, 2)}</pre>
//
// Функция для открытия формы
const handleEventClick = (event: EventData) => {
    setSelectedEvent(event);
    setIsFormOpen(true);
};

// Функция для закрытия формы
const closeForm = () => {
    setIsFormOpen(false);
    setSelectedEvent(null);

};
const saveChange = (updatedEvent: EventData) => {
// Обновляем массив событий с новым значением
//console.log(updatedEvent);
if (dataEvents) {
    const updatedEvents = dataEvents.map(event => {
        if (event.id === updatedEvent.id) {
            changeEvent(updatedEvent)
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
                    setErrorMessage('Ошибка 401: Вы не авторизованы, или ваш токен доступа прослочился.\nТокен сделал обновление, попробуйте ещё 1 раз.');
                    refresh();
                } else {
                    setErrorMessage(`Ошибка ${errorCode}: ${errorMessage}`);
                }
                });
                
                return updatedEvent; // Если id совпадает, возвращаем обновленное событие
            } else {
                return event; // В противном случае возвращаем текущее событие
            }
        });
        dispatch(updateEvents(updatedEvents));
        console.log(updatedEvents); // Для проверки результата
        dispatch(fetchMyEvents());

}
};
    return (
        <div>
            <NavBox />
            <h1 className={styles.h1}>Профиль</h1>
            {loadingProfile && <p>Загрузка...</p>}
            {errorMessage && (
                <div style={{ color: 'red', marginTop: '10px' }}>
            {errorMessage}
            </div>
            )}  
            {errorProfile && (
                <div style={{ color: 'red', marginTop: '10px' }}>
                    {errorProfile}
                </div>
            )}

            {dataProfile && (
                <div className={stylesProfile.profileContainer}>
                    <h2 className={stylesProfile.profileHeader}>Имя: </h2>
                    <p className={stylesProfile.profileText}>{dataProfile.name}</p>
                    <h2 className={stylesProfile.profileHeader}>Email: </h2>
                    <p className={stylesProfile.profileText}>{dataProfile.email}</p>
                </div>
            )}


            {dataEvents && (
                <div className={stylesEventContainer.containerStyle}>
                {dataEvents.map((event: EventData) => ( // Используем тип EventData
                    <div key={event.id} className={stylesEvent.instance} onClick={() => handleEventClick(event)}>
                        <h3>{event.title}</h3> {/* Заголовок события */}
                        <p>{event.description}</p> {/* Описание события */}
                        <p>Дата события: {event.date}</p> {/* Дата события */}
                        <p>Создано пользователем ID: {event.createdBy}</p> {/* ID создателя */}
                    </div>
                    ))}
                </div>)}
            {/* Условный рендеринг формы */}
            {isFormOpen && selectedEvent && (
                <>
                <div className={stylesProfile.overlay} onClick={closeForm}></div>
                <EventForm event={selectedEvent} onClose={closeForm} onSaveChange={saveChange} />
            </>
            )}
           
            
        </div>
    );
};

export default ProfilePage;