import React, { useState } from 'react';
import './SearchBar.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SearchBar = ({ onSearch }) => {
  const [foodName, setFoodName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!foodName.trim()) {
        toast.warn('Enter a food name to search');
      return;
    }
    setIsLoading(true);
    const results = await onSearch(foodName);
    setIsLoading(false);
    if (!results || results.length === 0) {
        toast.error('No food found');
    }
  };

  const startListening = () => {
    console.log("startListening called"); // Debugging log
    if (isLoading) return;
    const recognition = new window.webkitSpeechRecognition();
    recognition.onresult = async (event) => {
      const foodName = event.results[0][0].transcript;
      console.log("Recognized speech:", foodName); // Debugging log
      if (!foodName.trim()) {
        toast.warn('Enter a food name to search');
        return;
      }
      setIsLoading(true);
      try {
        console.log("Calling onSearch"); // Debugging log
        const results = await onSearch(foodName);
        console.log("Received results:", results); // Debugging log
        if (!results || results.length === 0) {
          toast.error('No food found');
        }
      } catch (error) {
        console.error("An error occurred:", error);
        toast.error('An error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    recognition.start();
  };
  
  

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          placeholder="Search for meals..."
          className="search-input"
          disabled={isLoading}
        />
        <button type="submit" className="search-button" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Search'}
        </button>
      </form>
      <button onClick={startListening} className="mic-button" disabled={isLoading}>
        🎤
      </button>
      {isLoading && <div className="loader"></div>}
    </div>
  );
};

export default SearchBar;
