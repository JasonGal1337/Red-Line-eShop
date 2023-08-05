import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditProductsModal = ({ show, handleClose, productToEdit, handleSaveProductChanges, categories }) => {
  const [title, setTitle] = useState(productToEdit.title);
  const [description, setDescription] = useState(productToEdit.description);
  const [price, setPrice] = useState(productToEdit.price);
  const [technicalInformation, setTechnicalInformation] = useState(productToEdit.technicalInformation);
  const [stockQuantity, setStockQuantity] = useState(productToEdit.stockQuantity);
  const [selectedProductImages, setSelectedProductImages] = useState([]);
  const [previewProductImages, setPreviewProductImages] = useState(productToEdit.images.map((image) => image.url));
  const [selectedCategories, setSelectedCategories] = useState(productToEdit.categories);

  const handleProductTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleProductDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleProductPriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleProductTechnicalInfoChange = (e) => {
    setTechnicalInformation(e.target.value);
  };

  const handleProductStockQuantityChange = (e) => {
    setStockQuantity(e.target.value);
  };

  const toggleCategorySelection = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      // If the category is already selected, remove it from the selectedCategories array
      setSelectedCategories((prevCategories) => prevCategories.filter((id) => id !== categoryId));
    } else {
      // If the category is not selected, add it to the selectedCategories array
      setSelectedCategories((prevCategories) => [...prevCategories, categoryId]);
    }
  };

  const handleRemoveImage = (index) => {
    // Remove the image at the specified index from the state
    setSelectedProductImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      return newImages;
    });

    // Remove the preview of the removed image
    setPreviewProductImages((prevPreview) => {
      const newPreview = [...prevPreview];
      newPreview.splice(index, 1);
      return newPreview;
    });
  };

  const handleProductImageChange = (e) => {
    const files = e.target.files;
    const newImages = Array.from(files);

    // Clear the previous images and set the newly selected images
    setSelectedProductImages(newImages);

    // Create previews for the newly selected images
    const imagesPreview = newImages.map((file) => URL.createObjectURL(file));
    setPreviewProductImages(imagesPreview);
  };

  const handleSaveProductChangesSubmit = () => {
    if (productToEdit && productToEdit.images) {
      const formData = new FormData();
  
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("technicalInformation", technicalInformation);
      formData.append("stockQuantity", stockQuantity);
      formData.append("categories", JSON.stringify(selectedCategories));
  
      // Append the new selected images to the formData
      for (let i = 0; i < selectedProductImages.length; i++) {
        formData.append("productImages", selectedProductImages[i]);
      }
  
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
            <Form.Control type="text" placeholder="Enter product title" value={title} onChange={handleProductTitleChange} />
          </Form.Group>
          <Form.Group controlId="productDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter product description"
              value={description}
              onChange={handleProductDescriptionChange}
            />
          </Form.Group>
          <Form.Group controlId="productPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" placeholder="Enter product price" value={price} onChange={handleProductPriceChange} />
          </Form.Group>
          <Form.Group controlId="productTechnicalInformation">
            <Form.Label>Technical Information</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter technical information"
              value={technicalInformation}
              onChange={handleProductTechnicalInfoChange}
            />
          </Form.Group>
          <Form.Group controlId="productStockQuantity">
            <Form.Label>Stock Quantity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter stock quantity"
              value={stockQuantity}
              onChange={handleProductStockQuantityChange}
            />
          </Form.Group>
          <Form.Group controlId="productCategories">
            <Form.Label>Categories</Form.Label>
            <div>
              {categories.map((category) => (
                <Button
                  key={category.description}
                  variant={selectedCategories.includes(category._id) ? 'primary' : 'outline-primary'}
                  onClick={() => toggleCategorySelection(category._id)}
                  style={{ margin: '0.5rem' }}
                >
                  {category.title}
                </Button>
              ))}
            </div>
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
                {/* Add a remove button for each image */}
                <Button variant="danger" onClick={() => handleRemoveImage(index)}>
                  Remove
                </Button>
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