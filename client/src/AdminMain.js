import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './index.css';
import CategoryModal from './components/CategoryModal';
import "bootstrap/dist/css/bootstrap.min.css";

function AdminMain() {
// verify that visitor is an admin
const [admin, setAdmin] = useState({
  _id: "",
  username: "",
});

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

  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const handleOpenNewCategoryModal = () => {
    setShowCategoryModal(true);
  };

  const handleCloseCategoryModal = () => {
    setShowCategoryModal(false);
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/category/post", {
        title,
        description
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className='admin-main-container'>
      <button className='view-button'>View Categories</button>
      <button className='view-button'>View Products</button>
      <div className='action-buttons'>
        <button className='action-button' onClick={handleOpenNewCategoryModal}>
          New Category
        </button>
        <button className='action-button'>New Product</button>
      </div>
      {/* Render the CategoryModal component with appropriate props */}
      <CategoryModal
        show={showCategoryModal}
        handleClose={handleCloseCategoryModal}
        handleSubmit={handleCategorySubmit}
      />
    </div>
  );
}

export default AdminMain;