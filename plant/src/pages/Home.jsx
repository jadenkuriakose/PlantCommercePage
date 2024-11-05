// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Home.module.css";

const Home = () => {
    const navigate = useNavigate(); 

    const handleClick = () => {
      navigate('/purchase'); 
    };
  

  return (
    <div className={styles.home}>
          <h1>Welcome to Palanter</h1>
          <p>Palanter is the best place to purchase plants</p>
          <p>We offer mediocre plants at great prices</p>
          <button onClick = {handleClick}>Proceed To Purchase</button>
    </div>
  );
};

export default Home;
