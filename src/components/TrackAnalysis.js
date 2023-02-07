import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import styled from "styled-components";

import { selectSubmission, selectArtistID, selectTrackID, isSelectionMade } from "../features/trackSearch/trackSearchSlice";

import useFetch from "../hooks/useFetch";

const genre_array = ['pop punk', 'emo', 'alternative', 'metalcore', 'hardcore', 'punk', 'nu metal', 'screamo', 'metal', 'post']

const ResultStyles = styled.section`
  display:flex;
  flex-wrap:wrap;
  align-items:center;

  img {
    max-width:500px;
  }

  .songAnalysis {
    flex: 2 1 250px;
  }
`

export default function SongAnalysis(){
  const [isSad, setIsSad] = useState(null)
  const [isEnergetic, setIsEnergetic] = useState(null)
  const [isArtistEmo, setIsArtistEmo] = useState(null)

  const selection = useSelector(selectSubmission);
  const selectionMade = useSelector(isSelectionMade);
  const trackID = useSelector(selectTrackID);
  const artistID = useSelector(selectArtistID);

  const { data: trackData, loading: trackLoading, error: trackError } = useFetch(`audio-features/${trackID}`)
  
  const { data: artistData, loading: artistLoading, error: artistError } = useFetch(`artists/${artistID}`)

  useEffect(() => {
    if(!artistLoading && !trackLoading){
      if(trackData && artistData) {
        setIsArtistEmo(artistData.genres.filter((commonGenre) => genre_array.find((genre) => commonGenre.toLowerCase().includes(genre.toLowerCase()))).length > 0)
        setIsSad(Math.floor((1 - trackData.valence) * 100))
        setIsEnergetic(Math.floor(trackData.energy * 100))
      }
    }
  }, [artistData, artistLoading, trackData, trackLoading])

  if(trackError || artistError){
    return (
      <>
        <p>Something went wrong...</p>
        <p>Try Again?</p>
      </>
    )
  }
  return (
    <>
    {(artistLoading || trackLoading) &&
    <h2>Loading...</h2>
    }
    {selectionMade && artistData && trackData && 
      <ResultStyles>
        <div className="queryContainer">
          <h3>You Selected {selection.name} by {artistData.name}</h3>
          <img src={selection.album.images[0].url} alt={selection.name} />
        </div>
        <div className="songAnalysis">
        {isArtistEmo ? (
                    <>
                    <p>{artistData.name}'s genres include {artistData.genres.map((genre) => `"${genre}"`).join(', ').replace(/, ([^,]*)$/, ' and $1')}, so they are definitely "Emo enough" for Emo Night</p>
                    </>
                    )
                    
                     : (
                        <>
                            <p>{selection.artistName}'s genres include {artistData.genres.map((genre) => `"${genre}"`).join(', ').replace(/, ([^,]*)$/, ' and $1')}, so they are not "Emo enough" for Emo Night</p>
                        </>
                    )}
                    <div>
                      <ul>
                        <li>
                          <p>Sadness: {isSad}% Sad</p>
                        </li>
                        <li>
                          <p>Energy: {isEnergetic}% Moshable</p>
                        </li>
                      </ul>
                    </div>
        </div>
      </ResultStyles>
    }
    </>
  )
}