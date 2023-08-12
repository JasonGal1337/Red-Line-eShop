import React, { useState, useEffect } from 'react';
import { Navbar, Nav, FormControl, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchCategoriesCard from "./SearchCategoriesCard";
import SearchProductsCard from "./SearchProductsCard";

const Search = () => {
  const [showResults, setShowResults] = useState(false);
  const [searchResult, setSearchResult] = useState({ products: [], categories: [] });
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchProductsAndCategories = () => {
    axios
      .get('http://localhost:4000/product')
      .then((response) => {
        setProducts(response.data);
        return axios.get('http://localhost:4000/categories');
      })
      .then((categoriesResponse) => {
        setCategories(categoriesResponse.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  useEffect(() => {
    fetchProductsAndCategories();
  }, []);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const searchData = event.target.elements.search.value;

    // Filter products and categories based on search data
    const matchedProducts = products.filter(product => product.title.includes(searchData));
    const matchedCategories = categories.filter(category => category.title.includes(searchData));

    // Update the search result state
    setSearchResult({
      products: matchedProducts,
      categories: matchedCategories,
    });

    // Set showResults to true to display the results
    setShowResults(true);
  };

  return (
      <div></div>  
  );
};

export default Search;