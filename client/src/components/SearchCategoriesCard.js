import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../styles/card.css'; 

const SearchCategoriesCard = ({ title, description, image, categoryId }) => {
  return (
    <Card className="card-container">
      <Link to={`/category/${categoryId}`}>
      <Card.Img variant="top" src={image.url} alt={title} />
      <Card.Body>
        <Card.Title className="card-title">{title}</Card.Title>
        <Card.Text className="card-description">{description}</Card.Text>
      </Card.Body>
      </Link>
    </Card>
  );
};

export default SearchCategoriesCard;