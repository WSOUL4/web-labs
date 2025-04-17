import React, { useRef, useEffect, useState } from 'react';
import { EventData } from '../../Events/components/eventsContext'; 
import styles from './event.form.module.scss';

interface EventFormProps {
    event: EventData;
    onClose: () => void;
    onAdd: (newEvent: EventData) => void;
}

const EventAddForm: React.FC<EventFormProps> = ({ event, onClose, onAdd }) => {
    const formRef = useRef<HTMLDivElement>(null);
    const [title, setTitle] = useState(event.title);
    const [description, setDescription] = useState(event.description);
    const [date, setDate] = useState(event.date);
    const [location, setLocation] = useState(event.location);
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // Состояние для сообщения об ошибке

    const handleClickOutside = (event: MouseEvent) => {
        if (formRef.current && !formRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    const handleAdd = () => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Убираем время из текущей даты

        if (selectedDate < today) {
            setErrorMessage('Дата не может быть раньше сегодняшнего дня.');
            return;
        }
        if (description.length>255 || title.length>255 ){
            setErrorMessage('Длина текста должна быть не больше 255 символов и не пуста.');
            return;
        }
        if (title.length<=0){
            setErrorMessage('Пустое название.');
            return;
        }
        const newEvent = { ...event, title, description, date, location };
        //console.log('LEN:',title.length);
        onAdd(newEvent);
        onClose();
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={formRef} className={styles.modal}>
            <h2>Добавить событие</h2>
            <form>
            {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
                <label>
                    Заголовок:
                </label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <label>
                    Описание:
                </label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                <label>
                    Дата:
                </label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                
                <label>
                    Локация:
                </label>
                
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />

                <button type="button" onClick={handleAdd}>Добавить</button>
                <button type="button" onClick={onClose}>Закрыть</button>
            </form>
        </div>
    );
};

export default EventAddForm;