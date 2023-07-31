import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './index.css';
import NewCategoryModal from './components/NewCategoryModal';
import DisplayCategoriesModal from './components/DisplayCategoriesModal';
import EditCategoriesModal from './components/EditCategoriesModal';
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

  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
  const [showViewCategoriesModal, setShowViewCategoriesModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [categories, setCategories] = useState([]); 
  const [categoryToEdit, setCategoryToEdit] = useState(null); 

  useEffect(() => {
    fetchCategories(); 
  }, []);

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

  return (
    <div className='admin-main-container'>
      <button className='view-button' onClick={handleOpenViewCategoriesModal}>
        View Categories
      </button>
      <button className='view-button'>View Products</button>
      <div className='action-buttons'>
        <button className='action-button' onClick={handleOpenNewCategoryModal}>
          New Category
        </button>
        <button className='action-button'>New Product</button>
      </div>
      <DisplayCategoriesModal
        show={showViewCategoriesModal}
        handleClose={handleCloseViewCategoriesModal}
        categories={categories}
        handleCategoryDelete={handleCategoryDelete}
        handleEditClick={handleEditClick}
      />
      <NewCategoryModal
        show={showNewCategoryModal}
        handleClose={handleCloseNewCategoryModal}
        handleAddNewCategory={handleAddNewCategory}
      />
      {categoryToEdit && (
        <EditCategoriesModal
          show={showEditModal}
          handleClose={handleCloseEditModal}
          categoryToEdit={categoryToEdit}
          handleSaveChanges={handleSaveChanges}
        />
      )}
    </div>
  );
}

export default AdminMain;