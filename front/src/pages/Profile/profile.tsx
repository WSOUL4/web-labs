// ProfilePage.tsx
import React, { useEffect, useState } from 'react';
import NavBox from '../../components/navigation/nav.box';
import { useAppDispatch, useSelectorMy,RootState } from '../../components/store/store'; 
import { fetchProfile, changeProfile, ProfileData,setDataProfile } from '../../components/store/profile/slices'; //
import { fetchMyEvents, updateEvents } from '../../components/store/events/slices';
import styles from '../../styles/general.module.scss';
import stylesProfile from './profile.module.scss';
import { EventData,EventDataAdd } from '../Events/components/eventsContext';
import stylesEvent from '../Events/components/event.instance.module.scss';
import stylesEventContainer from '../Events/components/container.module.scss';
import EventForm from './components/event.form';
import AddForm from './components/add.form';
import {changeEvent, addEvent, deleteEvent} from '../../api/eventService';
import { refresh } from '../../api/authService';
import { useNavigate } from 'react-router-dom';
const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const dispatch = useAppDispatch(); 
    
    // Используем типизированный селектор
    const { data: dataProfile, loading: loadingProfile, error: errorProfile } = useSelectorMy((state: RootState) => state.profile); 
    const { data: dataEvents, loading: loadingEvents, error: errorEvents } = useSelectorMy((state: RootState) => state.events);
    const [editMode, setEditMode] = useState<{[key: string]: boolean}>({});
    const [formValues, setFormValues] = useState<Partial<ProfileData>>({});
    // Состояние для управления формой
    const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof ProfileData, string>>>({});
    const validateField = (field: keyof ProfileData, value: string): string => {
        switch (field) {
          case 'name':
          case 'surname':
          case 'fname':
            if (!value.trim()) return 'Поле не может быть пустым';
            return '';
          case 'gender':
            if (value && !['Мужской', 'Женский'].includes(value)) return 'Некорректное значение пола';
            return '';
          case 'birthday':
            if (value && isNaN(Date.parse(value))) return 'Некорректная дата';
            return '';
          default:
            return '';
        }
      };
    useEffect(() => {
        dispatch(fetchProfile()); 
        dispatch(fetchMyEvents());
      
        document.body.style.placeItems = 'flex-start';

       
        return () => {
            document.body.style.placeItems = '';
        };
    }, [dispatch]);
//<pre>{JSON.stringify(dataProfile, null, 2)}</pre>
    useEffect(() => {
    setFormValues({
      name: dataProfile?.name,
      surname: dataProfile?.surname,
      fname: dataProfile?.fname,
      gender: dataProfile?.gender,
      birthday: dataProfile?.birthday,
    });
  }, [dataProfile]);
  const startEdit = (field: keyof ProfileData) => {
    setEditMode(prev => ({ ...prev, [field]: true }));
  };

  const cancelEdit = (field: keyof ProfileData) => {
    if(dataProfile){
        setFormValues(prev => ({ ...prev, [field]: dataProfile[field] }));
        setEditMode(prev => ({ ...prev, [field]: false }));
    }
    
  };

  const saveField = async (field: keyof ProfileData) => {
    try {
      if (!dataProfile?.id) {
        throw new Error('ID профиля отсутствует');
      }
      
      const errorMsg = validateField(field, String(formValues[field] ?? ''));
    if (errorMsg) {
        setErrors(prev => ({ ...prev, [field]: errorMsg }));
        return; // Не сохраняем если ошибка
    
}
      // Отправляем всю форму + id
      await dispatch(changeProfile({ id: dataProfile.id, ...formValues })).unwrap();
      setEditMode(prev => ({ ...prev, [field]: false }));
      dispatch(setDataProfile({ id: dataProfile.id, ...formValues })); 
    } catch (error) {
      console.error('Ошибка при сохранении', error);
    }
  };

  const onChangeField = (field: keyof ProfileData, value: string) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
  
    const errorMsg = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: errorMsg }));
  };
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
        
    }

        
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
                <>
                <div className={stylesProfile.profileContainer}>
                    
                <h2>Имя:</h2>

            {editMode.name ? (
            <>
                <input 
                type="text" 
                value={formValues.name || ''} 
                onChange={e => onChangeField('name', e.target.value)} 
                />
                {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
                <button onClick={() => saveField('name')}>Сохранить</button>
                <button onClick={() => cancelEdit('name')}>Отмена</button>
            </>
            ) : (
            <>
                <p>{dataProfile.name}</p>
                <button onClick={() => startEdit('name')}>Изменить</button>
            </>
            )}

      <h2>Фамилия:</h2>
      {editMode.surname ? (
        <>
          <input 
            type="text" 
            value={formValues.surname || ''} 
            onChange={e => onChangeField('surname', e.target.value)} 
          />
          {errors.surname && <div style={{ color: 'red' }}>{errors.surname}</div>}
          <button onClick={() => saveField('surname')}>Сохранить</button>
          <button onClick={() => cancelEdit('surname')}>Отмена</button>
        </>
      ) : (
        <>
          <p>{dataProfile.surname}</p>
          <button onClick={() => startEdit('surname')}>Изменить</button>
        </>
      )}

      {/* Аналогично для fname */}
      
      <h2>Отчество:</h2>
      {editMode.fname ? (
        <>
          <input 
            type="text" 
            value={formValues.fname || ''} 
            onChange={e => onChangeField('fname', e.target.value)} 
          />
          {errors.fname && <div style={{ color: 'red' }}>{errors.fname}</div>}
          <button onClick={() => saveField('fname')}>Сохранить</button>
          <button onClick={() => cancelEdit('fname')}>Отмена</button>
        </>
      ) : (
        <>
          <p>{dataProfile.fname}</p>
          <button onClick={() => startEdit('fname')}>Изменить</button>
        </>
      )}

      {/* Пол */}
      
      <h2>Пол:</h2>
      {editMode.gender ? (
        <>
          {/* Можно сделать select */}
          <select value={formValues.gender || ''} onChange={e=>onChangeField('gender', e.target.value)}>
            <option value="">Выберите пол</option>
            <option value="Мужской">Мужской</option>
            <option value="Женский">Женский</option>
            {/* Другие варианты */}
          </select>
          {errors.gender && <div style={{ color: 'red' }}>{errors.gender}</div>}
          <button onClick={() => saveField('gender')}>Сохранить</button>
          <button onClick={() => cancelEdit('gender')}>Отмена</button>
        </>
      ) : (
        <>
          <p>{dataProfile.gender}</p>
          <button onClick={() => startEdit('gender')}>Изменить</button>
        </>
      )}

       {/* День рождения */}

       <h2>День рождения:</h2>
       {editMode.birthday ? (
         <>
           {/* input type date */}
           <input 
             type="date" 
             value={formValues.birthday || ''} 
             onChange={e=>onChangeField('birthday', e.target.value)} 
           />
           {errors.birthday && <div style={{ color: 'red' }}>{errors.birthday}</div>}
           <button onClick={() => saveField('birthday')}>Сохранить</button>
           <button onClick={() => cancelEdit('birthday')}>Отмена</button>
         </>
       ) : (
         <>
           <p>{dataProfile.birthday}</p>
           <button onClick={() => startEdit('birthday')}>Изменить</button>
         </>
       )}
                    <h2 className={stylesProfile.profileHeader}>Email: </h2>
                    <p className={stylesProfile.profileText}>{dataProfile.email}</p>
                    <h2 className={stylesProfile.profileHeader}>Ваш ID: </h2>
                    <p className={stylesProfile.profileText}>{dataProfile.id}</p>
                </div>
                <button type="button" onClick={()=>handleAddClick()}>Добавить новый ивент</button>
                <p></p>
                </>
            )}


            {dataEvents && (
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
                </div>)}
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
           
        </div>
    );
};

export default ProfilePage;
