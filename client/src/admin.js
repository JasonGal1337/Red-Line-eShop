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

  // verify admin is logged in to display the page
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
  const [categories, setCategories] = useState([]); // State to store the categories
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  useEffect(() => {
    fetchCategories(); // Fetch categories initially when component mounts
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
        // Update the categories state to remove the deleted category
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category._id !== categoryId)
        );
        console.log("Category deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  const handleEditCategory = (updatedCategory) => {
    // Update the state with the edited category
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category._id === updatedCategory._id ? updatedCategory : category
      )
    );
    console.log("Category edited successfully!");
  };

  const handleOpenViewCategoriesModal = () => {
    setShowViewCategoriesModal(true);
    setShowNewCategoryModal(false); // Hide the other modal if it's open
  };

  const handleCloseViewCategoriesModal = () => {
    setShowViewCategoriesModal(false);
  };

  const handleOpenNewCategoryModal = () => {
    setShowNewCategoryModal(true);
    setShowViewCategoriesModal(false); // Hide the other modal if it's open
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
          handleEditCategory={handleEditCategory}
        />
      )}
    </div>
  );
}

export default AdminMain;