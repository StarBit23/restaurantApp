import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth, provider } from './FirebaseConfig';
import { signInWithPopup, signOut } from 'firebase/auth';
import Sidebar from './Components/Sidebar';
import Home from './Components/Home';
import Login from './Components/Login';
import AboutUs from './Components/AboutUs';
import Reservation from './Components/Reservation';
import Reservas from './Components/Reservas';
import './CSS/styles.css';

function App() {
  const [user, setUser] = useState(null);

  const handleGithubLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        console.log(result.user.uid);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    
    <div className="wrapper">
      <div className="box">
        {user ? (
          <>
            <Router>
              <div>                  
                </div>
                <Sidebar handleLogout={handleLogout} user={user} />
                <div className="main-content">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/aboutUs" element={<AboutUs />} />
                    <Route path="/login" element={<Navigate to="/home" />} />
                    <Route path="/reservation" element={<Reservation />} />
                    <Route path="/reservas" element={<Reservas />}/>
                  </Routes>
              </div>
            </Router>
          </>
        ) : (
          <Router>
            <div>
             <div className='background'/>
              <Routes>
                <Route
                  path="/"
                  element={<Login handleGithubLogin={handleGithubLogin} />}
                />
              </Routes>
            </div>
          </Router>
        )}
      </div>
    </div>
  );
}

export default App;
