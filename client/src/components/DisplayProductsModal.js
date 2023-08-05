import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import CategoriesCard from "./CategoriesCard";

const DisplayProductsModal = ({ show, handleClose, products, handleProductDelete, handleProductEditClick }) => {

    const handleProductEditClickWrapper = (product) => {
      handleProductEditClick(product);
    };
  
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {products.map((product, index) => (
            <ProductsCard
              key={index}
              title={product.title}
              description={product.description}
              price={product.price}
              technicalInformation={product.technicalInformation}
              stockQuantity={product.stockQuantity}
              images={product.images.map((image) => image.url)}
              onDelete={() => handleProductDelete(product._id)}
              onEdit={() => handleProductEditClickWrapper(product)}
            />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  
  export default DisplayProductsModal;