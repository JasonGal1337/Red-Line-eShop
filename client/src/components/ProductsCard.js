import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import '../styles/card.css'; 

const ProductsCard = ({ title, description, price, technicalInformation, stockQuantity, images, categories, onDelete, onEdit }) => {
  const [fetchedCategories, setFetchedCategories] = useState([]);

  const fetchCategories = () => {
    axios
      .get("http://localhost:4000/category")
      .then((response) => {
        setFetchedCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  
  useEffect(() => {
    fetchCategories();
  }, []);

  // Function to get the category titles based on their IDs
  const getCategoryTitles = () => {
    const matchedCategories = fetchedCategories.filter(category => categories.includes(category._id));
    return matchedCategories.map(category => category.title).join(", ");
  };

  return (
    <Card className="card-container">
      <Card.Img variant="top" src={images[0]} alt={title} />
      <Card.Body>
        <Card.Title className="card-title">{title}</Card.Title>
        <Card.Text className="card-description">{description}</Card.Text>
        <Card.Text className="card-price">Price: ${price}</Card.Text>
        <Card.Text className="card-technical-info">{technicalInformation}</Card.Text>
        <Card.Text className="card-stock-quantity">Stock Quantity: {stockQuantity}</Card.Text>
        <Card.Text className="card-product-categories">
          Product Categories: {getCategoryTitles()}
        </Card.Text>
        <Button variant="danger" className="card-delete-button" onClick={onDelete}>
          Delete
        </Button>
        <Button variant="primary" className="card-edit-button" onClick={onEdit}>
          Edit
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductsCard;