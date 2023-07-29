import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Card = ({
  title,
  price,
  description,
  technicalInformation,
  stockQuantity,
  categories,
  onDelete,
  onUpdate,
}) => {
  const handleUpdate = () => {
    // Handle the navigation to the UpdateHome page
    onUpdate();
  };

  return (
    <Card
      style={{ maxWidth: "20rem", marginBottom: "1rem", padding: "0.75rem" }}
    >
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title className="card-title">{title}</Card.Title>
        <Card.Text className="card-text">Type: {text}</Card.Text>
        <Card.Text className="card-text">Price: {price}</Card.Text>
        <Card.Text className="card-text">Location: {location}</Card.Text>
        <Card.Text className="card-text">Description: {description}</Card.Text>
        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>

        <Link
          to={onUpdate}
          className="btn btn-primary edit-btn"
          onClick={handleUpdate}
        >
          Edit
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Card;