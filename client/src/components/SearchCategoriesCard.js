import React from "react";
import { Card } from "react-bootstrap";
import '../styles/card.css'; 

const SearchCategoriesCard = ({ title, description, image }) => {
  return (
    <Card className="card-container">
      <Card.Img variant="top" src={image} alt={title} />
      <Card.Body>
        <Card.Title className="card-title">{title}</Card.Title>
        <Card.Text className="card-description">{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SearchCategoriesCard;