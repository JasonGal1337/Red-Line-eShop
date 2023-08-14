import React from 'react';
import { Card } from 'react-bootstrap';
import '../styles/card.css'; 

const CartProductCard = ({ title, price, images }) => {
  return (
    <Card className="card-container">
        <Card.Img variant="top" src={images[0].url} alt={title} />
        <Card.Body>
          <Card.Title className="card-title">{title}</Card.Title>
          <Card.Text className="card-price">Price: {price} €</Card.Text>
        </Card.Body>
    </Card>
  );
};

export default CartProductCard;