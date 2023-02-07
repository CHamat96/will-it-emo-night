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
  const hasSelection = useSelector(isSelectionMade)
  const submission = useSelector(selectSubmission)
  const artistID = useSelector(selectArtistID)
  const trackID = useSelector(selectTrackID)
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        {!isLoggedIn? (
          <Authentication />
        ): ( 
          <>          
            <h2>Logged In!</h2>
            <TrackSearch />
            {hasSelection && 
            <SongAnalysis />
            }
          </>
        )}
      </div>
    </div>
  );
}

export default App;
