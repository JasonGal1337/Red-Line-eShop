import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './index.css';
import NewCategoryModal from './components/NewCategoryModal';
import DisplayCategoriesModal from './components/DisplayCategoriesModal';
import EditCategoriesModal from './components/EditCategoriesModal';
import NewProductModal from './components/NewProductModal'; 
import DisplayProductsModal from './components/DisplayProductsModal'; 
import EditProductsModal from './components/EditProductsModal'; 
import "bootstrap/dist/css/bootstrap.min.css";

function AdminMain() {
  const [admin, setAdmin] = useState({
    _id: "",
    username: "",
  });

  const navigate = useNavigate();

  // verify admin is logged in else redirect to /admin
  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .post("http://localhost:4000/admin/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          if (data.adminData._id) {
            console.log(data.adminData);
            setAdmin(data.adminData);
          }
        });
    } else {
      navigate("/admin");
    }
  }, []);

  // category code start 
  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
  const [showViewCategoriesModal, setShowViewCategoriesModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [categories, setCategories] = useState([]); 
  const [categoryToEdit, setCategoryToEdit] = useState(null); 

  const fetchCategories = () => {
    axios
      .get("http://localhost:4000/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryDelete = (categoryId) => {
    axios
      .delete(`http://localhost:4000/category/${categoryId}`)
      .then(() => {
        // Update categories after deletion
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category._id !== categoryId)
        );
        console.log("Category deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  const handleSaveChanges = (categoryId, updatedCategoryData) => {
    axios
      .put(`http://localhost:4000/category/${categoryId}`, updatedCategoryData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response)
        // after edit fetch categories again
        fetchCategories(); 
      })
      .catch((error) => console.log(error));
  };

  const handleOpenViewCategoriesModal = () => {
    setShowViewCategoriesModal(true);
    setShowNewCategoryModal(false); 
  };

  const handleCloseViewCategoriesModal = () => {
    setShowViewCategoriesModal(false);
  };

  const handleOpenNewCategoryModal = () => {
    setShowNewCategoryModal(true);
    setShowViewCategoriesModal(false); 
  };

  const handleCloseNewCategoryModal = () => {
    setShowNewCategoryModal(false);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleEditClick = (category) => {
    setCategoryToEdit(category);
    setShowEditModal(true);
  };

  const handleAddNewCategory = (newCategory) => {
    // Update the categories state with the new category
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };
  // category code end 

  // product code start 
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const [showViewProductsModal, setShowViewProductsModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [products, setProducts] = useState([]); 
  const [productToEdit, setProductToEdit] = useState(null); 

  useEffect(() => {
    fetchProducts(); 
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://localhost:4000/product")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const handleProductDelete = (productId) => {
    axios
      .delete(`http://localhost:4000/product/${productId}`)
      .then(() => {
        // Update products after deletion
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
        console.log("Product deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  const handleSaveProductChanges = (productId, updatedProductData) => {
    axios
      .put(`http://localhost:4000/product/${productId}`, updatedProductData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response)
        // after edit fetch products again
        fetchProducts(); 
      })
      .catch((error) => console.log(error));
  };

  const handleOpenViewProductsModal = () => {
    setShowViewProductsModal(true);
    setShowNewProductModal(false); 
  };

  const handleCloseViewProductsModal = () => {
    setShowViewProductsModal(false);
  };

  const handleOpenNewProductModal = () => {
    setShowNewProductModal(true);
    setShowViewProductsModal(false); 
  };

  const handleCloseNewProductModal = () => {
    setShowNewProductModal(false);
  };

  const handleCloseEditProductModal = () => {
    setShowEditProductModal(false);
  };

  const handleProductEditClick = (product) => {
    setProductToEdit(product);
    console.log(product)
    setShowEditProductModal(true);
  };

  const handleAddNewProduct = (newProduct) => {
    // Update the products state with the new product
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };
  // product code end

  return (
    <div className='admin-main-container'>
      <button className='view-button' onClick={handleOpenViewCategoriesModal}>
        View Categories
      </button>
      <button className='view-button' onClick={handleOpenViewProductsModal}>
        View Products
      </button>
      <div className='action-buttons'>
        <button className='action-button' onClick={handleOpenNewCategoryModal}>
          New Category
        </button>
        <button className='action-button' onClick={handleOpenNewProductModal}>
          New Product
        </button>
      </div>
      <DisplayCategoriesModal
        show={showViewCategoriesModal}
        handleClose={handleCloseViewCategoriesModal}
        categories={categories}
        handleCategoryDelete={handleCategoryDelete}
        handleEditClick={handleEditClick} 
      />
      <DisplayProductsModal
        show={showViewProductsModal}
        handleClose={handleCloseViewProductsModal}
        products={products}
        handleProductDelete={handleProductDelete}
        handleProductEditClick={handleProductEditClick}
      />
      <NewCategoryModal
        show={showNewCategoryModal}
        handleClose={handleCloseNewCategoryModal}
        handleAddNewCategory={handleAddNewCategory}
      />
      <NewProductModal
        show={showNewProductModal}
        handleClose={handleCloseNewProductModal}
        handleAddNewProduct={handleAddNewProduct}
        categories={categories}
      />
      {categoryToEdit && (
        <EditCategoriesModal
          show={showEditModal}
          handleClose={handleCloseEditModal}
          categoryToEdit={categoryToEdit}
          handleSaveChanges={handleSaveChanges}
        />
      )}
      {productToEdit && (
        <EditProductsModal
        show={showEditProductModal}
        handleClose={handleCloseEditProductModal}
        productToEdit={productToEdit}
        handleSaveProductChanges={handleSaveProductChanges}
        categories={categories}
      />
      )}
    </div>
  );
}

export default AdminMain;