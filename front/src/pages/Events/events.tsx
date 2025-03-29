import React, {useEffect} from 'react';
import NavBox from '../../components/navigation/nav.box';
import Container from './components/container';
import Instance from './components/event.instance';
import Filters from './components/filters';
import { useEvents } from './components/eventsContext';
import styles from '../../styles/general.module.scss';

const EventPage: React.FC = () => {
  const { events } = useEvents(); 
  useEffect(() => {
    //document.body.style.display = 'flex';
    document.body.style.placeItems = 'flex-start';

    return () => {
      //document.body.style.display = '';
      document.body.style.placeItems = '';
    };
  }, []);
  return (
    <div>
      <NavBox />
      <h1 className={styles.h1}>Ивенты</h1>
      <Filters />
      <Container>
        {events.map(event => (
          <Instance key={event.id} {...event} />
        ))}
      </Container>
    </div>
  );
};

export default EventPage;