// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Checkout.module.css';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const savedCart = location.state ? location.state.cart : JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, [location]);

  const getTotal = () => {
    return cart.reduce((total, item) => total + parseFloat(item.price.replace('$', '')) * item.quantity, 0).toFixed(2);
  };

  return (
    <div className={styles.checkoutContainer}>
      <h1 className={styles.title}>Checkout</h1>
      {cart.length === 0 ? (
        <p className={styles.emptyCart}>Your cart is empty</p>
      ) : (
        <>
          <h2 className={styles.orderSummary}>Order Summary</h2>
          <div className={styles.cartItems}>
            {cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <span className={styles.itemName}>{item.name} - {item.price}</span>
                <span className={styles.itemQuantity}>Quantity: {item.quantity}</span>
              </div>
            ))}
          </div>
          <div className={styles.cartTotal}>
            <p>Total: ${getTotal()}</p>
            <button className={styles.checkoutButton}>Proceed to Payment</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
