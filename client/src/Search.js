import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SearchProductsCard from './components/SearchProductsCard';
import SearchCategoriesCard from './components/SearchCategoriesCard';
import "./styles/search.css";

const Search = () => {
    const { query } = useParams();
    const [searchResults, setSearchResults] = useState({ products: [], categories: [] });
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
  
    const fetchProductsAndCategories = () => {
      axios
        .get('http://localhost:4000/product')
        .then((response) => {
          setProducts(response.data);
          return axios.get('http://localhost:4000/category');
        })
        .then((categoriesResponse) => {
          setCategories(categoriesResponse.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  
    const filterSearch = () => {
      const matchedProducts = products.filter(product => product.title.includes(query));
      const matchedCategories = categories.filter(category => category.title.includes(query));
  
      setSearchResults({
        products: matchedProducts,
        categories: matchedCategories,
      });
    };
  
    useEffect(() => {
      fetchProductsAndCategories();
    }, []);
  
    // Add a useEffect hook to re-filter when products and categories change
    useEffect(() => {
      filterSearch();
    }, [products, categories, query]);
  
    return (
        <div className="search-container">
            <h1>Matched Products:</h1>
          <div className="search-products-container">
            {searchResults.products.map((product) => (
              <SearchProductsCard
                key={product._id}
                title={product.title}
                price={product.price}
                images={product.images}
                productId={product._id}
              />
            ))}
          </div>
          <h1>Matched Categories:</h1>
          <div className="search-categories-container">
            {searchResults.categories.map((category) => (
              <SearchCategoriesCard
                key={category._id}
                title={category.title}
                price={category.price}
                image={category.image}
                categoryId={category._id}
              />
            ))}
          </div>
        </div>
      );
  };
  
  export default Search;