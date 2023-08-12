import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import "../styles/starrating.css"

const StarRating = ({ userRating, handleRatingChange, checkUserID }) => {
    const emptyStar = <FontAwesomeIcon icon={regularStar} />;
    const fullStar = <FontAwesomeIcon icon={solidStar} />;
    const [isReadOnly, setIsReadOnly] = useState(false);
  
    const [rating, setRating] = useState(0);
  
    const handleToggleReadOnly = () => {
      setIsReadOnly((prevIsReadOnly) => !prevIsReadOnly);
    };
  
    const handleStarClick = (selectedRating) => {
        if (!isReadOnly) {
          handleRatingChange(selectedRating); // Call the prop function to update userRating
        }
      };
    
      const handleSaveRating = () => {
        setIsReadOnly(true);
        handleSaveRating(); // Call the prop function to save the rating
      };
  
    return (
      <div className="star-rating">
        <div className="star-icons">
          {Array.from({ length: 5 }).map((_, index) => (
            <span
              key={index}
              className={`star-icon ${
                rating >= index + 1 ? "full" : "empty"
              } ${isReadOnly ? "read-only" : ""}`}
              onClick={() => handleStarClick(index + 1)}
            >
              {rating >= index + 1 ? fullStar : emptyStar}
            </span>
          ))}
        </div>
        {!isReadOnly && (
          <button className="save-rating-button" onClick={handleSaveRating}>
            Save Rating
          </button>
        )}
      </div>
    );
  };
  
  export default StarRating;