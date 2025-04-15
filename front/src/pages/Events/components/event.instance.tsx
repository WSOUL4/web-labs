// event.instance.tsx
import React from 'react';
import styles from './event.instance.module.scss';

interface InstanceProps {
  id: number;
  title: string;
  description: string;
  date: string;
  createdBy: number;
  location: string;
}

const Instance: React.FC<InstanceProps> = ({ id, title, description, date, createdBy,location }) => {
  
  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <div className={styles.instance}>
      <h3>{title}</h3>
      <p>ID: {id}</p>
      <p>Описание: {description}</p>
      <p>Дата проведения: {formattedDate}</p>
      <p>ID Автора: {createdBy}</p>
      <p>Локация: {location}</p>
    </div>
  );
};

export default Instance;