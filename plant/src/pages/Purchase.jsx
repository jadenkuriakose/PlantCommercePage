// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Purchase.module.css';

const Purchase = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.setItem('cart', JSON.stringify([]));
    }
  }, [cart]);

  const items = [
    { id: 1, name: 'Aquas Loteria', price: '$10.00' },
    { id: 2, name: 'Spring Lotus', price: '$20.00' },
    { id: 3, name: 'Yellow Daffodily', price: '$30.00' },
    { id: 4, name: 'Daffodil', price: '$40.00' },
    { id: 5, name: 'Red Roses', price: '$50.00' },
    { id: 6, name: 'Roses Generias', price: '$60.00' },
  ];

  const addToCart = (item) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, { ...item, quantity: 1 }];
      return updatedCart;
    });
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, action) => {
    setCart(cart.map(item =>
      item.id === itemId
        ? { ...item, quantity: action === 'increment' ? item.quantity + 1 : item.quantity - 1 }
        : item
    ));
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + parseFloat(item.price.replace('$', '')) * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    navigate('/checkout', { state: { cart } });
  };

  return (
    <div className={styles.purchaseContainer}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Shop Products</h1>
      </div>
      <div className={styles.productGrid}>
        <div className={styles.productSection}>
          <h2>Section 1</h2>
          {items.slice(0, 2).map((item) => (
            <div key={item.id} className={styles.itemCard}>
              <img src="images/lotus.jpg" alt={item.name} className={styles.itemImage} />
              <h2>{item.name}</h2>
              <p className={styles.price}>{item.price}</p>
              <button
                className={styles.buyButton}
                onClick={() => addToCart(item)}
                disabled={cart.some(cartItem => cartItem.id === item.id)}
              >
                {cart.some(cartItem => cartItem.id === item.id) ? 'Added' : 'Add to Cart'}
              </button>
            </div>
          ))}
        </div>
        <div className={styles.productSection}>
          <h2>Section 2</h2>
          {items.slice(2, 4).map((item) => (
            <div key={item.id} className={styles.itemCard}>
              <img src="images/daff.webp" alt={item.name} className={styles.itemImage} />
              <h2>{item.name}</h2>
              <p className={styles.price}>{item.price}</p>
              <button
                className={styles.buyButton}
                onClick={() => addToCart(item)}
                disabled={cart.some(cartItem => cartItem.id === item.id)}
              >
                {cart.some(cartItem => cartItem.id === item.id) ? 'Added' : 'Add to Cart'}
              </button>
            </div>
          ))}
        </div>
        <div className={styles.productSection}>
          <h2>Section 3</h2>
          {items.slice(4, 6).map((item) => (
            <div key={item.id} className={styles.itemCard}>
              <img src="images/rose.jpg" alt={item.name} className={styles.itemImage} />
              <h2>{item.name}</h2>
              <p className={styles.price}>{item.price}</p>
              <button
                className={styles.buyButton}
                onClick={() => addToCart(item)}
                disabled={cart.some(cartItem => cartItem.id === item.id)}
              >
                {cart.some(cartItem => cartItem.id === item.id) ? 'Added' : 'Add to Cart'}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.cartSection}>
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p className={styles.emptyMessage}>Your cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <span>{item.name} - {item.price}</span>
                <div className={styles.cartItemQuantity}>
                  <button onClick={() => updateQuantity(item.id, 'decrement')} disabled={item.quantity <= 1}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 'increment')}>+</button>
                </div>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))}
            <div className={styles.cartTotal}>
              <p>Total: ${getTotal()}</p>
              <button className ={styles.button} onClick={handleCheckout}>Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Purchase;
