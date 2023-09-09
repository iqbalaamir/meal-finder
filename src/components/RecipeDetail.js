import React, { useState } from 'react';
import CookingTimer from './CookingTimer';
import './RecipeDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUtensils, faVideo, faArrowLeft, faToggleOn } from '@fortawesome/free-solid-svg-icons';

const RecipeDetail = ({ meal, onBack }) => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="recipe-detail-container">
      <button onClick={onBack} className="btn back-button">
        <FontAwesomeIcon icon={faArrowLeft} className="icon back-icon" /> Back
      </button>
      <h1 className="recipe-title">{meal.strMeal}</h1>
      <div className="recipe-header">
        <div className="recipe-icons">
          <FontAwesomeIcon icon={faClock} className="icon" />
          <FontAwesomeIcon icon={faUtensils} className="icon" />
          <FontAwesomeIcon icon={faVideo} className="icon" />
        </div>
        <CookingTimer time={30} animated={true} />
      </div>
      <button onClick={() => setShowVideo(!showVideo)} className="btn toggle-button">
        <FontAwesomeIcon icon={faToggleOn} className="icon" /> {showVideo ? 'Show Image' : 'Show Video'}
      </button>
      <div className="recipe-card">
        {!showVideo && (
          <div className="recipe-card-front">
            <img src={meal.strMealThumb} alt={meal.strMeal} className="recipe-image" />
            <ul className="recipe-instructions">
              {meal.strInstructions.split('.').map((instruction, index) => (
                instruction.trim() ? <li key={index}>{instruction.trim()}.</li> : null
              ))}
            </ul>
          </div>
        )}
        {showVideo && (
          <div className="recipe-card-back">
            <iframe 
              title="recipe-video"
              src={`https://www.youtube.com/embed/${meal.strYoutube.split('v=')[1]}`}
              className="recipe-video"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;
