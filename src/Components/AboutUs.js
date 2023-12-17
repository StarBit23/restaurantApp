import React from 'react';
import '../CSS/aboutUs.css';
import image1 from '../Images/img1.jpg';
import image2 from '../Images/img2.jpg';
import image3 from '../Images/img3.png';

const AboutUs = () => {
  const handleMouseEnter = (imageId) => {
    const image = document.getElementById(`image${imageId}`);
    const text = document.getElementById(`text${imageId}`);
    text.style.animation = 'slideIn 0.5s forwards';
    image.style.transform = 'translateY(50px)';
  };

  const handleMouseLeave = (imageId) => {
    const image = document.getElementById(`image${imageId}`);
    const text = document.getElementById(`text${imageId}`);
    text.style.animation = 'slideOut 0.5s forwards';
    image.style.transform = 'translateY(0)';
  };

  return (
    <div className="about-us-container">
      <div className="image-container">
        <img
          id="image1"
          src={image1}
          alt="Image 1"
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={() => handleMouseLeave(1)}
        />
        <div id="text1" className="image-text">
          Presentamos comida única y variada para todos los gustos
        </div>
      </div>

      <div className="image-container">
        <img
          id="image2"
          src={image2}
          alt="Image 2"
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={() => handleMouseLeave(2)}
        />
        <div id="text2" className="image-text">
          Contamos con personal experimentado en el mundo culinario
        </div>
      </div>

      <div className="image-container">
        <img
          id="image3"
          src={image3}
          alt="Image 3"
          onMouseEnter={() => handleMouseEnter(3)}
          onMouseLeave={() => handleMouseLeave(3)}
        />
        <div id="text3" className="image-text">
          Desde septiembre creando experiencias
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
