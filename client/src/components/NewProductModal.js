import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const NewProductModal = ({ show, handleClose, handleAddNewProduct, categories }) => {
    const [productTitle, setProductTitle] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productTechnicalInformation, setProductTechnicalInformation] = useState('');
    const [productStockQuantity, setProductStockQuantity] = useState('');
    const [selectedProductImages, setSelectedProductImages] = useState([]);
    const [previewProductImages, setPreviewProductImages] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

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

  const handleCategoryClick = (categoryId) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(categoryId)) {
        return prevSelectedCategories.filter((id) => id !== categoryId);
      } else {
        return [...prevSelectedCategories, categoryId];
      }
    });
  };

  const handleProductImageChange = (e) => {
    const files = e.target.files;
    const newImages = Array.from(files);

    setSelectedProductImages((prevImages) => [...prevImages, ...newImages]);

    const imagesPreview = newImages.map((file) => URL.createObjectURL(file));
    setPreviewProductImages((prevPreview) => [...prevPreview, ...imagesPreview]);
  };

  const handleProductSubmitClick = () => {
    const formData = new FormData();
    formData.append('title', productTitle);
    formData.append('description', productDescription);
    formData.append('price', productPrice);
    formData.append('technicalInformation', productTechnicalInformation);
    formData.append('stockQuantity', productStockQuantity);

    selectedCategories.forEach((id) => formData.append('categories', id));
  
    selectedProductImages.forEach((image) => formData.append('productImages', image));
    axios
      .post('http://localhost:4000/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response);
        const newProduct = {
          _id: response.data._id,
          title: productTitle,
          description: productDescription,
          price: productPrice,
          technicalInformation: productTechnicalInformation,
          stockQuantity: productStockQuantity,
          categories: selectedCategories, // Use the selected categories directly
          images: response.data.product.images.map((image) => ({
            url: image.url,
          })),
        };
  
        handleAddNewProduct(newProduct);
        setProductTitle('');
        setProductDescription('');
        setProductPrice('');
        setProductTechnicalInformation('');
        setProductStockQuantity('');
        setSelectedProductImages([]);
        setPreviewProductImages([]);
        setSelectedCategories([]);
        handleClose();
      })
      .catch((error) => console.log(error));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
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
          <Form.Group controlId="productCategories">
            <Form.Label>Categories</Form.Label>
            <div>
              {categories.map((category) => (
                <Button
                  key={category.title}
                  variant={selectedCategories.includes(category._id) ? 'primary' : 'outline-primary'}
                  onClick={() => handleCategoryClick(category._id)}
                  className="mr-2"
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
              </div>
            ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleProductSubmitClick}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewProductModal;