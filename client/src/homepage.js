import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import Slider from "../src/components/Slider";
import CategoryGrid from "./components/CategoryGrid"; 
import "./styles/homepage.css"

function Homepage() {
    const [categoryData, setCategoryData] = useState([]);

    function getCategoriesData() {
      axios
        .get("http://localhost:4000/category")
        .then((response) => {
          const categories = response.data;
          setCategoryData(categories);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  
    useEffect(() => {
      getCategoriesData();
    }, []);
  
    return (
      <div>
        <Slider />
        <div className="centered-div">
          <h1>Welcome to the world of Red Line</h1>
        </div>
        <div className="category-grid">
          {categoryData.map((category) => (
            <Link key={category._id} to={`/category/${category._id}`} className="category-grid-item">
            <CategoryGrid title={category.title} imageUrl={category.image.url} />
          </Link>
          ))}
        </div>
  
        {/* Centered div with h1 and h3 */}
        <div className="centered-div">
          <h1>REIMAGINE BEACH LIFE</h1>
          <h3>Our commitment is to share the secret of happiness, to make the beach world more exciting than ever.</h3>
        </div>
      </div>
    );
  }
  
  export default Homepage;