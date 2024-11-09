// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Checkout.module.css';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const location = useLocation();
  
  useEffect(() => {
    const savedCart = location.state ? location.state.cart : [];
    setCart(savedCart);
  }, [location]);

  const getTotal = () => {
    return cart.reduce((total, item) => total + parseFloat(item.price.replace('$', '')) * item.quantity, 0);
  };

  return (
    <div className={styles.checkoutContainer}>
      <h1>Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <h2>Order Summary</h2>
          {cart.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <span>{item.name} - {item.price}</span>
              <span>Quantity: {item.quantity}</span>
            </div>
          ))}
          <div className={styles.cartTotal}>
            <p>Total: ${getTotal()}</p>
            <button>Proceed to Payment</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
