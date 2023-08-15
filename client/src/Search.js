import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SearchProductsCard from './components/SearchProductsCard';
import "./styles/search.css"

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

  useEffect(() => {
    console.log(query)
    fetchProductsAndCategories();
    filterSearch();
    console.log(searchResults)
  }, []);

  const filterSearch = () => {

    // Filter products and categories based on search data
    const matchedProducts = products.filter(product => product.title.includes(query));
    const matchedCategories = categories.filter(category => category.title.includes(query));

    // Update the search result state
    setSearchResults({
      products: matchedProducts,
      categories: matchedCategories,
    });
  };

  return (
      <div className="search-container">Hello
        {searchResults.products.map((product)=> {
            <SearchProductsCard key={product._id} title={product.title} price={product.price} images={product.images}/>
        })}
      </div>  
  );
};

export default Search;