import React from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import { loggedIn } from './features/authentication/authenticationSlice';
import Header from './components/Header';
import { Authentication } from './features/authentication/Authentication';

function App() {
  const isLoggedIn = useSelector(loggedIn)
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        {!isLoggedIn? (
          <Authentication />
        ): ( 
          <h2>Logged In!</h2>
        )}
      </div>
    </div>
  );
}

export default App;
