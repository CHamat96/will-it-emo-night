import React, { useEffect, useState } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { loggedIn } from './features/authentication/authenticationSlice';
import Header from './components/Header';
import { Authentication } from './features/authentication/Authentication';
import { TrackSearch } from './features/trackSearch/TrackSearch';
import { isSelectionMade, setArtistID, setSelectionMade, setSubmission, setTrackID } from './features/trackSearch/trackSearchSlice';
import SongAnalysis from './components/TrackAnalysis';
import Footer from './components/Footer';
import useFetch from './hooks/useFetch';
import RandomButton from './components/RandomButton';

function App() {
  const isLoggedIn = useSelector(loggedIn);
  const trackSubmitted = useSelector(isSelectionMade)

  return (
    <div className="App">
        <Header />
        <main>
          <div className="wrapper">
          {!isLoggedIn? (
            <Authentication />
          ): ( 
            <>          
              <TrackSearch />
              {trackSubmitted ?
                <SongAnalysis />
                :
                <>
                <p>Search for your favourite song to display its "Sadness" & "Moshability" ratings</p>
                <p>or</p>
                <RandomButton
                message="Get a Random Song" />
                </>
              }
            </>
          )}
          </div>
        </main>
        <Footer />
    </div>
  );
}

export default App;
