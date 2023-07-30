import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditCategoriesModal = ({ show, handleClose, categoryToEdit, handleEditCategory }) => {
  const [title, setTitle] = useState(categoryToEdit.title);
  const [description, setDescription] = useState(categoryToEdit.description);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmitClick = () => {
    // Form the updated category object
    const updatedCategory = {
      _id: categoryToEdit._id,
      title,
      description,
      image: categoryToEdit.image // Maintain the existing image data without updating it
    };

    // Call the callback function to update the category
    handleEditCategory(updatedCategory);

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category title"
              value={title}
              onChange={handleTitleChange}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter category description"
              value={description}
              onChange={handleDescriptionChange}
            />
          </Form.Group>
          <Form.Group controlId="categoryImage">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" name="selectedImage" onChange={handleImageChange} />
          </Form.Group>
          {previewImage && (
            <div>
              <h6>Selected Image:</h6>
              <img src={previewImage} alt="Selected" style={{ width: '100%' }} />
            </div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmitClick}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditCategoriesModal;