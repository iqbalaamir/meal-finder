import React from 'react';
import './MealCard.css';

const MealCard = ({ meal, onSelect }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card meal-card">
        <img src={meal.strMealThumb} alt={meal.strMeal} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{meal.strMeal}</h5>
          <button onClick={() => onSelect(meal)} className="btn btn-sm btn-outline-info">
            View Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
