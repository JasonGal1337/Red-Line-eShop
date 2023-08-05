import React from "react";
import { Card, Button } from "react-bootstrap";
import '../styles/card.css'; 

const ProductsCard = ({ title, description, price, technicalInformation, stockQuantity, images, onDelete, onEdit }) => {
  return (
    <Card className="card-container">
      <Card.Img variant="top" src={images[0]} alt={title} />
      <Card.Body>
        <Card.Title className="card-title">{title}</Card.Title>
        <Card.Text className="card-description">{description}</Card.Text>
        <Card.Text className="card-price">Price: ${price}</Card.Text>
        <Card.Text className="card-technical-info">{technicalInformation}</Card.Text>
        <Card.Text className="card-stock-quantity">Stock Quantity: {stockQuantity}</Card.Text>
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