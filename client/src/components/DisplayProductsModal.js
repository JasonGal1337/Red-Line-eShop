import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import ProductsCard from "./ProductsCard";

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
            <div key={index}>
              <ProductsCard
                title={product.title}
                description={product.description}
                price={product.price}
                technicalInformation={product.technicalInformation}
                stockQuantity={product.stockQuantity}
                categories={product.categories}
                images={product.images.map((image) => image.url)}
                onDelete={() => handleProductDelete(product._id)}
                onEdit={() => handleProductEditClickWrapper(product)}
              />
            </div>
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