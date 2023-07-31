import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import CategoriesCard from "./CategoriesCard";

const DisplayCategoriesModal = ({ show, handleClose, categories, handleCategoryDelete, handleEditClick }) => {

  const handleEditClickWrapper = (category) => {
    handleEditClick(category);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Categories</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {categories.map((category, index) => (
          <CategoriesCard
            key={index}
            title={category.title}
            description={category.description}
            image={category.image.url}
            onDelete={() => handleCategoryDelete(category._id)}
            onEdit={() => handleEditClickWrapper(category)}
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

export default DisplayCategoriesModal;