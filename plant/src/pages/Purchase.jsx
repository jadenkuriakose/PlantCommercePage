// eslint-disable-next-line no-unused-vars
import React from 'react';
import styles from './Purchase.module.css';

const items = [
  { id: 1, name: 'Item 1', price: '$10', image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Item 2', price: '$15', image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Item 3', price: '$20', image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Item 4', price: '$25', image: 'https://via.placeholder.com/150' },
  { id: 5, name: 'Item 5', price: '$30', image: 'https://via.placeholder.com/150' },
  { id: 6, name: 'Item 6', price: '$35', image: 'https://via.placeholder.com/150' },
];

const Purchase = () => {
  return (
    <div className={styles.purchaseContainer}>
      {items.map((item) => (
        <div key={item.id} className={styles.itemCard}>
          <img src={item.image} alt={item.name} className={styles.itemImage} />
          <h2>{item.name}</h2>
          <p className={styles.price}>{item.price}</p>
          <button className={styles.buyButton}>Buy Now</button>
        </div>
      ))}
    </div>
  );
};

export default Purchase;
