import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Dropdown, Button, Tab, Tabs, Carousel } from "react-bootstrap";
import StarRating from './components/StarRating';
import "./styles/product.css";

function Product() {
    const { id } = useParams(); // product id
    const [userID, setUserID] = useState(''); // get userID of logged in user in order to pass value in reviews
    const [userName, setUserName] = useState(''); // get username to display in reviews already made for product
    const [productData, setProductData] = useState({}); // handles product data which we get by get req in order to display
    const [selectedSize, setSelectedSize] = useState("");
    const [addedToCart, setAddedToCart] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [reviewText, setReviewText] = useState(""); // handles review input by user
    const [userRating, setUserRating] = useState(productData.rating || 0); 
    const [productReviews, setProductReviews] = useState([]); // handles review data which we get by get req in order to display

    useEffect(() => {
      axios
        .get(`http://localhost:4000/product/${id}`)
        .then((response) => {
          setProductData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching product:', error);
        });
      getReviews(); 
    }, [id]);

  useEffect(() => {
    console.log(productData);
  }, [productData]);

  function getUserID() {
    if (localStorage.getItem("token")) {
      return axios
        .post("http://localhost:4000/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          if (data.userData._id) {
            setUserID(data.userData._id);
            return data.userData._id;
          }
          return null;
        })
        .catch((error) => {
          console.error("Error verifying token:", error);
          return null;
        });
    } else {
      return null;
    }
  }

  const sendAddedToCart = () => {
    axios
      .post(`http://localhost:4000/user/${userID}`, addedToCart)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error('Error adding product to user cart:', error);
      });
  }

  async function addToCart() {
    try {
      const userID = await getUserID();

      if (userID) {
        setAddedToCart(productData._id);
        sendAddedToCart();
      } else {
        alert("Please login first");
      }
    } catch (error) {
      console.error("Error while adding to cart:", error);
    }
  }

  const submitReview = async () => {
    try {
      const userID = await getUserID();

      if (userID) {
        const newReview = {
          product: id,
          comment: reviewText,
          user: userID,
        };
        axios.post("http://localhost:4000/review", newReview).then((response) => {
          console.log(response);
          setShowReviewModal(false);
          setReviewText("");
          getReviews();
        });
      } else {
        alert("Please login first");
      }
    } catch (error) {
      console.error("Error while submitting review:", error);
    }
  };

  const getReviews = () => {
    axios.get(`http://localhost:4000/review`)
      .then((response) => {
        const reviewsForProduct = response.data.filter(review => review.product === id);
        setProductReviews(reviewsForProduct);
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });
  };

  const handleRatingChange = (newRating) => {
    setUserRating(newRating);
  };

  const checkUserID = () => {
    if (!userID) {
      alert("Please login first");
      return;
    }
  
    const updatedProductData = { ...productData, rating: userRating };
  
    axios.post(`http://localhost:4000/product/${id}`, updatedProductData)
      .then((response) => {
        console.log("Product rating updated:", response.data);
        setProductData(updatedProductData); 
      })
      .catch((error) => {
        console.error('Error updating product rating:', error);
      });
  };

  return (
    <div className="container">
      <div className="grid-container">
        <div className="carousel-container">
          <Carousel>
            {productData.images && productData.images.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100 carousel-img"
                  src={image.url}
                  alt={`Product Image ${index}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div className="flex-container">
          <h1>{productData.title}</h1>
          <h2 className="price">{productData.price} €</h2>
          <Dropdown className="dropdown-component">
            <Dropdown.Toggle variant="secondary" className="dropdown-button">
              Select Size
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-component">
              <Dropdown.Item className="dropdown-component" onClick={() => setSelectedSize("Small")}>Small</Dropdown.Item>
              <Dropdown.Item className="dropdown-component" onClick={() => setSelectedSize("Medium")}>Medium</Dropdown.Item>
              <Dropdown.Item className="dropdown-component" onClick={() => setSelectedSize("Large")}>Large</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button variant="primary" className="add-to-cart-button" onClick={addToCart}>
            Add To Cart
          </Button>
          <div>
            <h2>Availability</h2>
            {productData.stockQuantity !== 0 ? (
              <p>Product is available</p>
            ) : (
              <p>Product Unavailable</p>
            )}
            <span>The availability refers to physical stores and is independent of the website. </span>
            <span>The store's inventory may change at any time.</span>
          </div>
        </div>
      </div>
      <div>
        <h1 className="description">Description</h1>
        <div className="description-container">
          {productData.description}
        </div>
      </div>
      <div>
        <Tabs defaultActiveKey="technical" id="product-tabs">
          <Tab eventKey="technical" title="Technical Information">
            {productData.technicalInformation}
          </Tab>
          <Tab eventKey="reviews" title="Reviews">
  {productReviews.length > 0 ? (
    <div className="reviews-container">
      {productReviews.map((review, index) => (
        <div key={index} className="review">
          <h4>{review.user}:</h4>
          <p className="review-comment">{review.comment}</p>
        </div>
      ))}
    </div>
  ) : (
    "No reviews yet."
  )}
            <div className="star-rating-container">
              <p>Rate This Product</p>
              <StarRating
                userRating={userRating}
                handleRatingChange={handleRatingChange}
                checkUserID={checkUserID}
              />
              <button className="review-button" onClick={() => setShowReviewModal(true)}>Review This Product</button>
            </div>
            {showReviewModal && (
              <div className="modal">
                <div className="modal-content">
                  <button className="close-button" onClick={() => setShowReviewModal(false)}>
                    Close
                  </button>
                  <h2>Review This Product</h2>
                  <textarea
                    className="review-input"
                    placeholder="Write your review here..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  />
                  <button className="submit-review-button" onClick={submitReview}>
                    Submit Review
                  </button>
                </div>
              </div>
            )}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default Product;