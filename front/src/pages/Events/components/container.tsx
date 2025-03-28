import React from 'react';
import styles from './container.module.scss';
interface ContainerProps {
  children?: React.ReactNode; // Указываем, что Container может принимать детей
}
const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className={styles.containerStyle}>
      {children} {/* Отображаем дочерние элементы */}
    </div>
  );
};

export default Container;
