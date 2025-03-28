import NavMenu from './nav.menu';
import AuthMenu from './auth.menu';
import styles from './nav.box.module.scss'; // Импортируйте CSS-модуль
const NavBox: React.FC = () => {
  return (
<div className={styles.containerStyle}><NavMenu /> <AuthMenu /></div>
  );
};

export default NavBox;