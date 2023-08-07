import React from 'react';
import '../styles/productgrid.css';

const ProductGrid = ({ title, imageUrl, imageWidth, imageHeight }) => {
  const imageStyle = {
    backgroundImage: `url(${imageUrl})`,
    width: imageWidth,
    height: imageHeight,
  };

  return (
    <div className="product-item">
      <div className="product-image" style={imageStyle}>
        <h3 className="product-caption">{title}</h3>
      </div>
    </div>
  );
};

export default ProductGrid;