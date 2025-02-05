import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Route, Routes, useNavigate } from 'react-router';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Map from './pages/Map';

function App() {
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="map" element={<Map />} />
      </Routes>
    </div>
  );
}

const Navigation = () => {
  return (
    <nav
      style={{
        borderBottom: "solid 1px",
        paddingBottom: "1rem",
      }}
    >
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/map">Map</Link>
    </nav>
  );
};

export default App;
