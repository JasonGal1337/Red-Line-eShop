import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CategoryModal = ({ show, handleClose, handleSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
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
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSelectedImage(reader.result);
      setPreviewImage(URL.createObjectURL(file));
    };
  };

  const handleSubmitClick = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', selectedImage);
  
    handleSubmit({ title, description, selectedImage }); 
  
    setTitle('');
    setDescription('');
    setSelectedImage(null);
    setPreviewImage(null);
    handleClose(); 
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Category</Modal.Title>
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
            <Form.Control type="file" onChange={handleImageChange} />
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
  Submit
</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoryModal;