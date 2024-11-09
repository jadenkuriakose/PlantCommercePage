// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Purchase.module.css';

const Purchase = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const items = [
    { id: 1, name: 'Product 1', price: '$10.00' },
    { id: 2, name: 'Product 2', price: '$20.00' },
    { id: 3, name: 'Product 3', price: '$30.00' },
    { id: 4, name: 'Product 4', price: '$40.00' },
    { id: 5, name: 'Product 5', price: '$50.00' },
    { id: 6, name: 'Product 6', price: '$60.00' }
  ];

  const addToCart = (item) => {
    setCart([...cart, { ...item, quantity: 1 }]);
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
    return cart.reduce((total, item) => total + parseFloat(item.price.replace('$', '')) * item.quantity, 0);
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
      {items.map((item) => (
        <div key={item.id} className={styles.itemCard}>
          <img src="/api/placeholder/150/150" alt={item.name} className={styles.itemImage} />
          <h2>{item.name}</h2>
          <p className={styles.price}>{item.price}</p>
          <button className={styles.buyButton} onClick={() => addToCart(item)}>Add to Cart</button>
        </div>
      ))}
      <div className={styles.cart}>
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
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
              <button onClick={handleCheckout}>Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Purchase;
