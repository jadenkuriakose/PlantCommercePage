// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const cart = JSON.parse(savedCart);
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        setCartItemCount(totalItems);
      }
    };

    updateCartCount();

    const intervalId = setInterval(() => {
      updateCartCount();
    }, 200); 

    return () => {
      clearInterval(intervalId); 
    };
  }, []);

  return (
    <nav className={styles.nav}>
      <ul>
        <li className={styles.logo}>Palanter</li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/purchase">Purchase</Link></li>
        <li>
          <Link to="/checkout" className={styles.cartLink}>
            <FaShoppingCart />
            <span className={styles.cartCount}>{cartItemCount}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
