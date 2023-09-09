import React from 'react';
import Slider from 'react-slick';

const RecipeStepsCarousel = ({ steps }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {steps.map((step, index) => (
        <div key={index}>
          <h3>{step.description}</h3>
          {step.image && <img src={step.image} alt={`Step ${index + 1}`} />}
        </div>
      ))}
    </Slider>
  );
};

export default RecipeStepsCarousel;
