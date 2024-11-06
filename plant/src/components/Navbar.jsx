import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';  
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <ul>
                <li>Palanter</li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/purchase">Purchase</Link></li>
                <li>
                    <Link to="/checkout" className={styles.cartLink}>
                        <FaShoppingCart /> 
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
