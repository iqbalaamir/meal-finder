import React, { useState, useEffect, useCallback} from 'react';
import SearchBar from './components/SearchBar';
import MealCard from './components/MealCard';
import Pagination from './components/Pagination';
import RecipeDetail from './components/RecipeDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { ToastContainer } from 'react-toastify';


function App() {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [mealsPerPage] = useState(6);

  const fetchMeals = useCallback(async (foodName) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`);
    const data = await response.json();
    const meals = data.meals || [];
    setMeals(meals);
    return meals;  
  }, []);
  
  useEffect(() => {
    fetchMeals('chicken');
  }, [fetchMeals]);  
  

  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = meals.slice(indexOfFirstMeal, indexOfLastMeal);

  return (
    <div className="app-container">
      <ToastContainer />
      <h1 className="app-title">Deliciously Yours</h1>
      <div className="container">
      <SearchBar onSearch={fetchMeals} />
      {selectedMeal ? (
        <RecipeDetail meal={selectedMeal} onBack={() => setSelectedMeal(null)} />
      ) : (
        <>
          <div className="row">
            {currentMeals.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} onSelect={setSelectedMeal} />
            ))}
          </div>
          <Pagination
            mealsPerPage={mealsPerPage}
            totalMeals={meals.length}
            paginate={setCurrentPage}
          />
        </>
      )}
    </div>
    </div>
  );
}

export default App;
