import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './styles/cart.css';
import axios from 'axios';

const Cart = () => {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState({}); // we will access userData.boughtBefore and userData.addedToCart

  // Calculate estimated arrival date (current date + 5 days)
  const estimatedArrival = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000); 
  const formattedArrival = estimatedArrival.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

  useEffect(() => {
    axios
    .post("http://localhost:4000/user/getUserInfo", {
      token: localStorage.getItem("token"),
    })
      .then((response) => {
        console.log(response.data.userData);
        setUserInfo(response.data.userData);
      })
      .catch((error) => {
        console.error('Error retrieving user data:', error);
      });
  }, []);

  return (
    <div className="cart-container">
      <div className="left-column">
        <div className="arrival-time">
          <h2>This is your cart, {userInfo.name + " " + userInfo.surname}</h2>
          <h2>Estimated arrival time: {formattedArrival}</h2>
        </div>
        <div className="info-section">
          <h1>Placeholder Info 1</h1>
          <h1>Placeholder Info 2</h1>
          <h1>Placeholder Info 3</h1>
          <h1>Placeholder Info 4</h1>
        </div>
        <div className="similar-products">
          {/* Import and use Similar Products component here */}
          <h2>Similar Products</h2>
        </div>
        <div className="buy-again">
          {/* Import and use Buy Again component here */}
          <h2>Buy Again</h2>
        </div>
      </div>
      <div className="right-column">
        <div className="final-price">
          <h2>Final Price: Placeholder</h2>
          <button className="complete-purchase-button">Complete Purchase</button>
        </div>
        <div className="additional-options">
          <button className="subscribe-button">Subscribe to Newsletter</button>
          <button className="terms-button">Agree to Terms</button>
          <button className="wrap-button">Ask for Gift Wrapping</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;