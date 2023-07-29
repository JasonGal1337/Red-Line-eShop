import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Cloudinary } from '@cloudinary/url-gen';

const CategoryModal = ({ show, handleClose, handleSubmit }) => {
  const [categoryTitle, setCategoryTitle] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  // Set up the Cloudinary instance with your cloud name
  const cld = new Cloudinary({cloud: {cloudName: 'dblgykgex'}});

  const handleTitleChange = (e) => {
    setCategoryTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setCategoryDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmitClick = () => {
    // Upload the selected image to Cloudinary
    const formData = new FormData();
    formData.append('title', categoryTitle);
    formData.append('description', categoryDescription);
    formData.append('file', selectedImage);

    // Handle image upload with the Cloudinary API
    cld.uploadImage(formData.get('file'))
      .then((response) => {
        // Handle the Cloudinary response here, for example, extract the image URL
        const imageUrl = response.secure_url;
        handleSubmit({ title: categoryTitle, description: categoryDescription, imageUrl });
      })
      .catch((error) => {
        // Handle any errors that occur during the upload
        console.error(error);
      });

    setCategoryTitle('');
    setCategoryDescription('');
    setSelectedImage(null);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="categoryTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category title"
              value={categoryTitle}
              onChange={handleTitleChange}
            />
          </Form.Group>
          <Form.Group controlId="categoryDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter category description"
              value={categoryDescription}
              onChange={handleDescriptionChange}
            />
          </Form.Group>
          <Form.Group controlId="categoryImage">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" onChange={handleImageChange} />
          </Form.Group>
        </Form>
        {selectedImage && (
          <div>
            <h6>Selected Image:</h6>
            <img src={URL.createObjectURL(selectedImage)} alt="Selected" style={{ width: '100%' }} />
          </div>
        )}
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