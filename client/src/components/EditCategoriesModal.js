import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditCategoriesModal = ({ show, handleClose, categoryToEdit, handleSaveChanges }) => {
  const [title, setTitle] = useState(categoryToEdit.title);
  const [description, setDescription] = useState(categoryToEdit.description);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(categoryToEdit.image.url);

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

  const handleSaveChangesClick = () => {
    // Check if categoryToEdit and its image property exist before accessing the url
    if (categoryToEdit && categoryToEdit.image) {
      if (selectedImage) {
        handleSaveChanges(categoryToEdit._id, {
          title,
          description,
          selectedImage
        });
      } else {
        handleSaveChanges(categoryToEdit._id, {
          title,
          description
        });
      }

      handleClose();
    }
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
        <Button variant="primary" onClick={handleSaveChangesClick}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditCategoriesModal;