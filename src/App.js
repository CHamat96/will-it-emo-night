import React from 'react';
import { useSelector } from 'react-redux';
import { loggedIn } from './features/authentication/authenticationSlice';
import Header from './components/Header';
import { Authentication } from './features/authentication/Authentication';
import { TrackSearch } from './features/trackSearch/TrackSearch';
import { isSelectionMade } from './features/trackSearch/trackSearchSlice';
import SongAnalysis from './components/TrackAnalysis';
import Footer from './components/Footer';
import RandomButton from './components/RandomButton';
import { Navigate, Route, Routes } from 'react-router-dom';
import PlaylistDisplay from './features/playlist/PlaylistDisplay';


function App() {
  const isLoggedIn = useSelector(loggedIn);
  const trackSubmitted = useSelector(isSelectionMade)
  return (
    <>
      <Header />
      <main>
        <PlaylistDisplay />
        <div className="wrapper">
          {!isLoggedIn ? 
            <Authentication />
            : (
              <Routes>
                <Route
                exact
                path="/results"
                element={<SongAnalysis />}/>
                <Route
                exact
                path="/"
                element={
                  !trackSubmitted ? (
                    <section className="initialSearch">
                    <TrackSearch />
                    <p>OR</p>
                    <RandomButton
                    message="Get a Random Song Instead"/>
                  </section>
                  ) : (
                    <Navigate replace to={"/results"}/>
                  )
                }/>
              </Routes>
            )
          }
          
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
