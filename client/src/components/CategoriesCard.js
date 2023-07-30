import React from "react";
import { Card, Button } from "react-bootstrap";
import '../styles/card.css'; 

const CategoriesCard = ({ title, description, image, onDelete, onEdit }) => {
  return (
    <Card className="card-container">
      <Card.Img variant="top" src={image} alt={title} />
      <Card.Body>
        <Card.Title className="card-title">{title}</Card.Title>
        <Card.Text className="card-description">{description}</Card.Text>
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

export default CategoriesCard;