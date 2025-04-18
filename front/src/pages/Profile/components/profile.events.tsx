import React, { useEffect, useState } from 'react';
import NavBox from '../../../components/navigation/nav.box';
import { useAppDispatch, useSelectorMy,RootState } from '../../../components/store/store'; 
import { fetchProfile, changeProfile, ProfileData,setDataProfile } from '../../../components/store/profile/slices'; //
import { fetchMyEvents, updateEvents } from '../../../components/store/events/slices';

import stylesProfile from '../profile.module.scss';
import { EventData,EventDataAdd } from '../../Events/components/eventsContext';
import stylesEvent from '../../Events/components/event.instance.module.scss';
import stylesEventContainer from '../../Events/components/container.module.scss';
import EventForm from './event.form';
import AddForm from './add.form';
import {changeEvent, addEvent, deleteEvent} from '../../../api/eventService';
import { refresh } from '../../../api/authService';
import { useNavigate } from 'react-router-dom';

const ProfileEvents: React.FC = () => {

const [errorMessage, setErrorMessage] = useState<string>('');
const dispatch = useAppDispatch(); 
const { data: dataEvents, loading: loadingEvents, error: errorEvents } = useSelectorMy((state: RootState) => state.events);
const { data: dataProfile, loading: loadingProfile, error: errorProfile } = useSelectorMy((state: RootState) => state.profile); 
const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
const [isFormOpen, setIsFormOpen] = useState(false);
const [isAddFormOpen, setIsAddFormOpen] = useState(false);
    useEffect(() => {
        dispatch(fetchProfile()); 
        dispatch(fetchMyEvents());
      
        document.body.style.placeItems = 'flex-start';

       
        return () => {
            document.body.style.placeItems = '';
        };
    }, [dispatch]);
    
  
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
            //console.log(updatedEvent);
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

const handleAddClick = () => {
    const today = new Date();
        today.setHours(0, 0, 0, 0); 
        const todayString: string=today.toString();
    if (dataProfile){
        const event:EventData={id:0 ,title:'', description:'', date:todayString, createdBy:dataProfile.id,location:''};
        setSelectedEvent(event);
        setIsAddFormOpen(true);
    }
    
    // 
};

const closeAddForm = () => {
    setIsAddFormOpen(false);
    setSelectedEvent(null);

};

const addNew= (newEvent: EventData) => {
   console.log(newEvent);
    if( dataProfile){
        addEvent({
            id:0,
            title:newEvent.title,
            description:newEvent.description,
            date:newEvent.date,
            createdBy:dataProfile.id,
            location:newEvent.location,
        })
        .then((response) => {
            console.log('Успешный запрос:', response);
            dispatch(fetchMyEvents());
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
        
    };
};
        

const delEvent=(updatedEvent: EventData)=>{
    //console.log(updatedEvent);
            
            deleteEvent(updatedEvent.id)
                .then((response) => {
                    console.log('Успешный запрос:', response);
                    dispatch(fetchMyEvents());
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
                };



return (
        <>
            {loadingEvents && <p>Загрузка...</p>}
            {errorMessage && (
                <div style={{ color: 'red', marginTop: '10px' }}>
            {errorMessage}
            </div>
            )}  
            
            

            
            <p></p>
            {dataEvents && (
                <>
                <button type="button" onClick={()=>handleAddClick()}>Добавить новый ивент</button>
                <div className={stylesEventContainer.containerStyle}>
                {dataEvents.map((event: EventData) => (

                    <div key={event.id} className={stylesEvent.instance} onClick={() => handleEventClick(event)}>
                        <h3>{event.title}</h3> 
                        <p>{event.description}</p> 
                        <p>Дата события: {event.date}</p> 
                        <p>Создано пользователем ID: {event.createdBy}</p> 
                        <p>Локация: {event.location}</p> 
                    </div>

                    ))}
                </div>
                </>)}
            {/* Условный рендеринг формы */}
            {isFormOpen && selectedEvent && (
                <>
                <div className={stylesProfile.overlay} onClick={closeForm}></div>
                <EventForm event={selectedEvent} onClose={closeForm} onSaveChange={saveChange} onDelete={delEvent} />
            </>
            )}
           {isAddFormOpen && selectedEvent && (
                <>
                <div className={stylesProfile.overlay} onClick={closeForm}></div>
                <AddForm event={selectedEvent} onClose={closeAddForm} onAdd={addNew} />
            </>
            )}
           
        </>
    );
};

export default ProfileEvents;
