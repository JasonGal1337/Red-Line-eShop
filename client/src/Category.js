import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';
import Slider from './components/Slider';
import ProductGrid from './components/ProductGrid';
import './styles/productgrid.css';

function Category() {
  const { id } = useParams();
  const [productsData, setProductsData] = useState([]);

  const fetchProducts = () => {
    axios
      .get('http://localhost:4000/product')
      .then((response) => {
        setProductsData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = productsData.filter((product) =>
    product.categories.includes(id)
  );

  const groupedProducts = [];
  for (let i = 0; i < filteredProducts.length; i += 2) {
    const pair = filteredProducts.slice(i, i + 2);
    groupedProducts.push(pair);
  }

  return (
    <div>
      <Slider />
      <div className="product-grid">
        {groupedProducts.map((pair, index) => (
          <div key={index} className="product-row">
            {pair.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id}>
                <ProductGrid
                  title={product.title}
                  imageUrl={product.images[0].url}
                  imageWidth="500px"
                  imageHeight="500px"
                />
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;