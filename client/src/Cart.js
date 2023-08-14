import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./styles/cart.css";
import axios from "axios";

const Cart = () => {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]); // Store matching products
  const [totalPrice, setTotalPrice] = useState(0);

  const estimatedArrival = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
  const formattedArrival = estimatedArrival.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  useEffect(() => {
    axios
      .post("http://localhost:4000/user/getUserInfo", {
        token: localStorage.getItem("token"),
      })
      .then((response) => {
        setUserInfo(response.data.userData);
      })
      .catch((error) => {
        console.error("Error retrieving user data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/product")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving product data:", error);
      });
  }, []);

  // Filter the products in the cart based on IDs
  useEffect(() => {
    const cartProductIds = userInfo.addedToCart || [];
    const matchingProducts = products.filter((product) =>
      cartProductIds.includes(product._id)
    );
    setCartProducts(matchingProducts);
  
    // Calculate total price
    const totalPrice = matchingProducts.reduce(
      (sum, product) => sum + product.price,
      0
    );
    setTotalPrice(totalPrice);
  }, [userInfo.addedToCart, products]);

  const handleQuantityChange = (productId, newQuantity) => {
    // Find the product in the cartProducts array
    const updatedCart = cartProducts.map((product) => {
      if (product._id === productId) {
        // Calculate the new quantity based on button click
        const updatedQuantity = product.quantity + newQuantity;
        // Ensure the new quantity is within the valid range
        const clampedQuantity = Math.max(1, Math.min(updatedQuantity, product.stockQuantity));
        return { ...product, quantity: clampedQuantity };
      }
      return product;
    });
  
    setCartProducts(updatedCart);
  };

  return (
    <div className="cart-container">
      <div className="left-column">
        <div className="arrival-time">
          <h2>This is your cart, {userInfo.name + " " + userInfo.surname}</h2>
          <h2>Estimated arrival time: {formattedArrival}</h2>
        </div>
        <div className="info-section">
          {/* Map through the matching cart products and display relevant information */}
          {cartProducts.map((product) => (
  <div key={product._id} className="product-info">
    <img
      src={product.images[0].url}
      alt={product.title}
      width="300"
      height="300"
    />
    <h1>{product.title}</h1>
    <h1>Quantity</h1>
    <div>
      <button onClick={() => handleQuantityChange(product._id, -1)}> - </button>
      <input
  type="number"
  value={product.stockQuantity}
  min={1}
  max={product.stockQuantity}
  onChange={(e) => handleQuantityChange(product._id, parseInt(e.target.value))}
  style={{ textAlign: "center" }} 
/>
      <button onClick={() => handleQuantityChange(product._id, 1)}> + </button>
    </div>
    <h1>Price: {product.price} €</h1>
  </div>
))}
        </div>
        <div className="similar-products">
          <h2>Similar Products</h2>
        </div>
        <div className="buy-again">
          <h2>Buy Again</h2>
        </div>
      </div>
      <div className="right-column">
      <div className="final-price">
  <h2>Final Price: {totalPrice} €</h2>
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
};

export default Cart;