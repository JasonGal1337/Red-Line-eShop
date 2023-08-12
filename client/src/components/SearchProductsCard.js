import { Card } from "react-bootstrap";
import axios from "axios";
import '../styles/card.css'; 

const SearchProductsCard = ({ title, description, price, technicalInformation, images }) => {

  return (
    <Card className="card-container">
      <Card.Img variant="top" src={images[0]} alt={title} />
      <Card.Body>
        <Card.Title className="card-title">{title}</Card.Title>
        <Card.Text className="card-description">{description}</Card.Text>
        <Card.Text className="card-price">Price: ${price}</Card.Text>
        <Card.Text className="card-technical-info">{technicalInformation}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SearchProductsCard;