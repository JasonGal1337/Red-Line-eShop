import React from "react";
import axios from "axios";
import Stripe from "react-stripe-checkout";
import "../styles/checkout.css"

function Checkout() {

    const handleToken = (totalAmount, token) => {
        try {
          axios.post("http://localhost:4000/api/stripe/pay", {
            token: token.id,
            amount: totalAmount
          });
        } catch (error) {
          console.log(error);
        };
      };
    
      const tokenHandler = (token) => {
        handleToken(100, token);
      }

    return (
        <div className="checkout-container">
            <Stripe 
            stripeKey="pk_test_51Nf1ZWGjkVN77b3Xt8yFVlpbLbgErFAmHOvrpEoHU429pRl6aPK6CVNDkTLKeTGKOY4JJ5EFaCz3zh7QYjD3R0Rv0051cOQA2M" 
            token={tokenHandler}
             ><div button-container>
              <button className="custom-stripe-button">Checkout</button>
             </div>
             </Stripe>
             
        </div>
    );
}

export default Checkout;