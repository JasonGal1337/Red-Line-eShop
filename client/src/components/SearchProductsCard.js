import React from 'react';
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../styles/card.css'; 

const SearchProductsCard = ({ title, price, images , productId }) => {

  return (
    <Card className="card-container">
      <Link to={`/product/${productId}`}>
      <Card.Img variant="top" src={images[0].url} alt={title} />
      <Card.Body>
        <Card.Title className="card-title">{title}</Card.Title>
        <Card.Text className="card-price">Price: ${price}</Card.Text>
      </Card.Body>
      </Link>
    </Card>
  );
};

export default SearchProductsCard;