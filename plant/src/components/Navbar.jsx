import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <ul>
                <li>Palanter</li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/purchase">Purchase</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;