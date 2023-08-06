import React from "react";
import "../styles/categorygrid.css"

const CategoryGrid = ({ title, imageUrl }) => {
  return (
    <div className="category-grid-item">
      <div className="category-image" style={{ backgroundImage: `url(${imageUrl})` }}>
        <h3 className="category-caption">{title}</h3>
      </div>
    </div>
  );
};

export default CategoryGrid;