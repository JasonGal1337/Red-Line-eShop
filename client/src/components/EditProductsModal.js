import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditProductsModal = ({ show, handleClose, productToEdit, handleSaveChanges }) => {
  const [productTitle, setProductTitle] = useState(productToEdit.title);
  const [productDescription, setProductDescription] = useState(productToEdit.description);
  const [productPrice, setProductPrice] = useState(productToEdit.price);
  const [productTechnicalInformation, setProductTechnicalInformation] = useState(productToEdit.technicalInformation);
  const [productStockQuantity, setProductStockQuantity] = useState(productToEdit.stockQuantity);
  const [selectedProductImages, setSelectedProductImages] = useState([]);
  const [previewProductImages, setPreviewProductImages] = useState(productToEdit.images.map((image) => image.url));

  const handleProductTitleChange = (e) => {
    setProductTitle(e.target.value);
  };

  const handleProductDescriptionChange = (e) => {
    setProductDescription(e.target.value);
  };

  const handleProductPriceChange = (e) => {
    setProductPrice(e.target.value);
  };

  const handleProductTechnicalInfoChange = (e) => {
    setProductTechnicalInformation(e.target.value);
  };

  const handleProductStockQuantityChange = (e) => {
    setProductStockQuantity(e.target.value);
  };

  const handleProductImageChange = (e) => {
    const files = e.target.files;
    const newImages = Array.from(files);

    setSelectedProductImages((prevImages) => [...prevImages, ...newImages]);

    const imagesPreview = newImages.map((file) => URL.createObjectURL(file));
    setPreviewProductImages((prevPreview) => [...prevPreview, ...imagesPreview]);
  };

  const handleSaveProductChangesSubmit = () => {
    // Check if productToEdit and its images property exist before accessing the images array
    if (productToEdit && productToEdit.images) {
      const formData = new FormData();
      formData.append('title', productTitle);
      formData.append('description', productDescription);
      formData.append('price', productPrice);
      formData.append('technicalInformation', productTechnicalInformation);
      formData.append('stockQuantity', productStockQuantity);

      selectedProductImages.forEach((image) => formData.append('productImages', image));

      handleSaveProductChanges(productToEdit._id, formData);
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="productTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter product title" value={productTitle} onChange={handleProductTitleChange} />
          </Form.Group>
          <Form.Group controlId="productDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter product description"
              value={productDescription}
              onChange={handleProductDescriptionChange}
            />
          </Form.Group>
          <Form.Group controlId="productPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" placeholder="Enter product price" value={productPrice} onChange={handleProductPriceChange} />
          </Form.Group>
          <Form.Group controlId="productTechnicalInformation">
            <Form.Label>Technical Information</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter technical information"
              value={productTechnicalInformation}
              onChange={handleProductTechnicalInfoChange}
            />
          </Form.Group>
          <Form.Group controlId="productStockQuantity">
            <Form.Label>Stock Quantity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter stock quantity"
              value={productStockQuantity}
              onChange={handleProductStockQuantityChange}
            />
          </Form.Group>
          <Form.Group controlId="productImages">
            <Form.Label>Images</Form.Label>
            <Form.Control type="file" name="productImages" onChange={handleProductImageChange} multiple />
          </Form.Group>
          {previewProductImages.length > 0 &&
            previewProductImages.map((previewImage, index) => (
              <div key={index}>
                <h6>Selected Image {index + 1}:</h6>
                <img src={previewImage} alt={`Selected ${index + 1}`} style={{ width: '100%' }} />
              </div>
            ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveProductChangesSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProductsModal;