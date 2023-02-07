import React from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import { loggedIn } from './features/authentication/authenticationSlice';
import Header from './components/Header';
import { Authentication } from './features/authentication/Authentication';
import { TrackSearch } from './features/trackSearch/TrackSearch';
import { isSelectionMade, selectSubmission, selectTrackID, selectArtistID } from './features/trackSearch/trackSearchSlice';
import SongAnalysis from './components/TrackAnalysis';

function App() {
  const isLoggedIn = useSelector(loggedIn);
  const trackSubmitted = useSelector(isSelectionMade)
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        {!isLoggedIn? (
          <Authentication />
        ): ( 
          <>          
            <TrackSearch />
            {trackSubmitted &&
              <SongAnalysis />
            }
          </>
        )}
      </div>
    </div>
  );
}

export default App;
