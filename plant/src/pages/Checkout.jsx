// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Checkout.module.css';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = location.state ? location.state.cart : JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, [location]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const getTotal = () => {
    return cart.reduce((total, item) => total + parseFloat(item.price.replace('$', '')) * item.quantity, 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  

  const increaseQuantity = (id) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
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
                <img src= "https://via.placeholder.com/150" alt={item.name} className={styles.itemThumbnail} />
                <div className={styles.itemDetails}>
                  <span className={styles.itemName}>{item.name} </span>
                  <span className={styles.itemPrice}>{item.price}</span>
                  <div className={styles.itemQuantity}>
                    <button onClick={() => decreaseQuantity(item.id)} disabled={item.quantity <= 1}>-</button>
                    <span>Quantity: {item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                  <button className={styles.deleteButton} onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.cartTotal}>
              <p>Total: ${getTotal()}</p>
              <p>Total Items: {getTotalItems()}</p>
          </div>
        </>
      )}
      
      <div className={styles.comingSoonContainer}>
        <button className={styles.comingSoonButton} disabled>
          Purchase Coming Soon
        </button>
      </div>
      
      <button className={`${styles.returnButton} ${styles.button}`} onClick={() => navigate('/purchase')}>Return to Purchasing</button>
    </div>
  );
};

export default Checkout;



