import React, { useEffect } from 'react';

import NavBox from '../../components/navigation/nav.box';
import Container from './components/container';
import Instance from './components/event.instance';
const EventPage: React.FC = () => {
    useEffect(() => {
        // Устанавливаем стили для body
        //document.body.style.display = 'flex';
        document.body.style.placeItems = 'flex-start';
        
        // При размонтировании очистите стили
        return () => {
            //document.body.style.display = '';
            document.body.style.placeItems = '';
        };
    }, []);  // Пустой массив зависимостей означает, что эффект выполнится один раз при монтировании
    return (
        <div>
            <NavBox />
            <h1>Ивенты</h1>
            <Container>
                <p>Это содержимое внутри Container!</p> {<Instance />}
            </Container>
        </div>
    );
};

export default EventPage;