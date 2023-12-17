import React from 'react';
import '../CSS/login.css'
import image1 from '../Images/logo.png';

const Login = ({ handleGithubLogin }) => {
  return (
    <div className="login-container">
      {/* <div className="logo-container">
        <img src={image1} alt="Logo" className="logo-img" />
      </div> */}
      <div className="menu-image">
        <a href="https://atraconjaen.com/wp-content/uploads/2020/05/CARTA-ATRACON-JAEN.pdf" target="_blank">
          <img src={require('../Images/menu.jpg')} alt="Menú"/>
        </a>
      </div>
      <div className='cuadro'>
      <h2>Inicia sesión para reservar mesa</h2>
      <button className="login-button" onClick={handleGithubLogin}>
        Sign In With Github
      </button>
      </div>
      <div className='menu-image2'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.3523682916593!2d-3.793725123669141!3d37.78178111175565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6dd705afbb8f67%3A0xef4e142fe5f1cbb0!2sRestaurante%20Atrac%C3%B3n%20Ja%C3%A9n!5e0!3m2!1ses!2ses!4v1702750064322!5m2!1ses!2ses" width="600" height="400" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>      </div>
    </div>
  );
};

export default Login;
