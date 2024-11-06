import { useCart } from '../context/CartContext';
import styles from './Checkout.module.css';

const Checkout = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <div className={styles.checkoutContainer}>
      <h1>Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className={styles.cartItems}>
          {cart.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img src={item.image} alt={item.name} className={styles.cartImage} />
              <div>
                <h2>{item.name}</h2>
                <p>{item.price}</p>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Checkout;
