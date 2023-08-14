import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./styles/cart.css";
import axios from "axios";
import BuyAgainCard from './components/BuyAgainCard';
import CartProductCard from './components/CartProductCard';
import SimilarProductsCard from './components/SimilarProductsCard';
import Checkout from "./components/Checkout";

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
// get logged user info
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
// get products info
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
    const matchingProducts = products
      .filter((product) => cartProductIds.includes(product._id))
      .map((product) => ({ ...product, quantity: 1 })); // Add quantity property
    setCartProducts(matchingProducts);
  
    // Calculate total price
    const sum = matchingProducts.reduce((sum, product) => sum + product.price, 0);
    setTotalPrice(sum);
  }, [userInfo.addedToCart, products]);

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCart = cartProducts.map((product) => {
      if (product._id === productId) {
        const updatedQuantity = product.quantity + newQuantity;
        const clampedQuantity = Math.max(1, Math.min(updatedQuantity, product.stockQuantity));
        return { ...product, quantity: clampedQuantity };
      }
      return product;
    });
  
    setCartProducts(updatedCart);
  
    // Recalculate total price on quantity change
    const newTotalPrice = updatedCart.reduce((sum, product) => sum + product.price * product.quantity, 0);
    setTotalPrice(newTotalPrice);
  };

  const formatPrice = (price) => {
    const formattedPrice = (price).toFixed(2);
    return `${formattedPrice} €`;
  };

  const cartProductCategories = cartProducts.reduce((categories, product) => {
    product.categories.forEach(category => {
      if (!categories.includes(category)) {
        categories.push(category);
      }
    });
    return categories;
  }, []);

  const similarProducts = products.filter(product =>
    product.categories.some(category => cartProductCategories.includes(category))
  );

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
              <CartProductCard
                key={product._id}
                title={product.title}
                price={product.price}
                images={product.images}
              />
              <h2>Quantity</h2>
              <div>
                <button onClick={() => handleQuantityChange(product._id, -1)}> - </button>
                <input
                  type="number"
                  value={product.quantity}
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
        <div className="similar-products-container">
          <h2>Similar Products</h2>
          <div className="similar-products">
    {similarProducts.map(product => (
      <SimilarProductsCard
        key={product._id}
        title={product.title}
        price={product.price}
        images={product.images}
        productId={product._id} 
      />
    ))}
  </div>
          <div className="buy-again-container">
            <h2>Buy Again</h2>
            <div className="buy-again-products">
              {userInfo.boughtBefore && userInfo.boughtBefore.map((productId) => {
                const product = products.find((p) => p._id === productId);
                if (product) {
                  return (
                    <BuyAgainCard
                      key={product._id}
                      title={product.title}
                      price={product.price}
                      images={product.images}
                      productId={product._id} 
                    />
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="right-column">
        <div className="final-price">
          <h2>Total Price: {formatPrice(totalPrice)}</h2>
          <Checkout />
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