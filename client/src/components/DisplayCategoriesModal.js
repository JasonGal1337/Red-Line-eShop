import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import CategoriesCard from "./CategoriesCard";
import EditCategoriesModal from "./EditCategoriesModal"; // Import the EditCategoriesModal

const DisplayCategoriesModal = ({ show, handleClose, categories, handleCategoryDelete, handleCategoryEdit, setCategories }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  const handleEditClick = (category) => {
    setCategoryToEdit(category);
    setShowEditModal(true);
  };

  const handleEditCategory = (updatedCategory) => {
    // Update the state with the edited category
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category._id === updatedCategory._id ? updatedCategory : category
      )
    );
    console.log("Category edited successfully!");
    setShowEditModal(false); // Close the EditCategoriesModal after editing
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Categories</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {categories.map((category) => (
          <CategoriesCard
            key={category._id}
            title={category.title}
            description={category.description}
            image={category.image.url}
            onDelete={() => handleCategoryDelete(category._id)}
            onEdit={() => handleEditClick(category)}
          />
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>

      {/* Render the EditCategoriesModal */}
      {categoryToEdit && (
        <EditCategoriesModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          categoryToEdit={categoryToEdit}
          handleEditCategory={handleEditCategory}
        />
      )}
    </Modal>
  );
};

export default DisplayCategoriesModal;