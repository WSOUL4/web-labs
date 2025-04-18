import React, { useEffect, useState } from 'react';
import NavBox from '../../components/navigation/nav.box';
import Container from './components/container';
import Instance from './components/event.instance';
import Filters from './components/filters';
import styles from '../../styles/general.module.scss';
import { useAppDispatch, useSelectorMy, RootState } from '../../components/store/store'; 
import EventForm from '../Profile/components/event.form'; 
import AddForm from '../Profile/components/add.form'; 
import {  updateEvents } from '../../components/store/events/slices';
import {changeEvent, addEvent, deleteEvent} from '../../api/eventService';
import { refresh } from '../../api/authService';
import { EventData,EventDataAdd } from '../Events/components/eventsContext';
import stylesProfile from '../Profile/profile.module.scss';
const EventPage: React.FC = () => {
  const dispatch = useAppDispatch(); 
  const [errorMessage, setErrorMessage] = useState<string>('');
  const dataEvents = useSelectorMy((state: RootState) => state.events.data);
  const { data: dataProfile, loading: loadingProfile, error: errorProfile } = useSelectorMy((state: RootState) => state.profile); 
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  useEffect(() => {
    document.body.style.placeItems = 'flex-start';

    return () => {
      document.body.style.placeItems = '';
    };
  }, []);

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
        //dispatch(fetchMyEvents());

}
};


const delEvent=(updatedEvent: EventData)=>{
  //console.log(updatedEvent);
          
          deleteEvent(updatedEvent.id)
              .then((response) => {
                  console.log('Успешный запрос:', response);
                  //dispatch(fetchMyEvents());
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

const handleAddClick = () => {
    const today = new Date();
        today.setHours(0, 0, 0, 0); 
        const todayString: string=today.toString();
    if (dataProfile){
        const event:EventData={id:0 ,title:'', description:'', date:todayString, createdBy:dataProfile?.id,location:''};
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
            //dispatch(fetchMyEvents());
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
    <div>
      <NavBox />
      <h1 className={styles.h1}>Ивенты</h1>
      <Filters />
      {errorMessage && (
                <div style={{ color: 'red', marginTop: '10px' }}>
            {errorMessage}
            </div>
            )}  
      {dataProfile &&(
        <>
        <button onClick={handleAddClick}>Добавить новое событие</button>
        <br></br><br></br><br></br>
        
        </>
      )}
      
      <Container>
        {dataEvents && (
          <>
            {dataEvents.map(event => (
              <div key={event.id}>
                <Instance {...event} />
                {event.createdBy === dataProfile?.id && (
                  <>
                  
                    <button onClick={() => handleEventClick(event)}>Редактировать</button>
                    
                  </>
                )}
              </div>
            ))}
          </>
        )}
      </Container>

      {/* Условный рендеринг формы */}
      {isFormOpen && selectedEvent && (
        <>
          <div className={stylesProfile.overlay} onClick={closeForm}></div>
          <EventForm event={selectedEvent} onClose={closeForm} onSaveChange={saveChange} onDelete={delEvent} /* передайте необходимые пропсы */ />
        </>
      )}
      
      {isAddFormOpen && selectedEvent && (
        <>
          <div className={stylesProfile.overlay} onClick={closeAddForm}></div>
          <AddForm event={selectedEvent} onClose={closeAddForm} onAdd={addNew} /* передайте необходимые пропсы */ />
        </>
      )}
      
    </div>
  );
};

export default EventPage;