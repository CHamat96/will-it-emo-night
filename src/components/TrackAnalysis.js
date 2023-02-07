import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import styled from "styled-components";

import { selectSubmission, selectArtistID, selectTrackID, isSelectionMade } from "../features/trackSearch/trackSearchSlice";

import useFetch from "../hooks/useFetch";

const genre_array = ['pop punk', 'emo', 'alternative', 'metalcore', 'hardcore', 'punk', 'nu metal', 'screamo', 'metal', 'post', 'riot grrrl']

const ResultStyles = styled.section`
  display:flex;
  flex-wrap:wrap;
  align-items:center;
  justify-content:space-between;

  .queryContainer {
    max-width:450px;
    flex:1 2 auto;
  }

  .imageContainer {
    width:100%;
    img {
      margin:0 auto;
    }
  }

  .songAnalysis {
    flex: 1 1 250px;
  }

  .trackRatings {
    text-align:left;
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

  // Regex variable that is used during the render to format based on whether the Artist's name ends with an "s"
  let regex = /s$/
  
  return (
    <>
    {(artistLoading || trackLoading) &&
    <h2>Locating the nearest Hot Topic...</h2>
    }
    {selectionMade && artistData && trackData && 
      <ResultStyles>
        <div className="queryContainer">
          <h2>You Selected "{selection.name}" by {artistData.name}</h2>
          <div className="imageContainer">
            <img src={selection.album.images[1].url} alt={selection.name} />
          </div>
        </div>
        <div className="songAnalysis">
          <h3>{regex.test(artistData.name) ? "Are" : 'Is' } <span className="italic">{artistData.name}</span> Emo Enough?</h3>
        {isArtistEmo ? 

        (
                    <>
                    <p>{artistData.name}{artistData.genres.length >= 2 ? <span>{regex.test(artistData.name) ? `'` : "'s"} genres include</span> : <span> {regex.test(artistData.name) ? "are" : 'is' } considered</span>} {artistData.genres.map((genre) => `"${genre.toUpperCase()}"`).join(', ').replace(/, ([^,]*)$/, ' and $1')}, so they are definitely "Emo enough" for Emo Night</p>
                    </>
                    )
                    
                     : (
                        <>
                            <p>{artistData.name}{artistData.genres.length >= 2 ? <span> {regex.test(artistData.name) ? `'` : "'s"} genres include</span> : <span> {regex.test(artistData.name) ? "are" : 'is' } considered</span>}{artistData.genres.map((genre) => `"${genre}"`).join(', ').replace(/, ([^,]*)$/, ' and $1')}, so they are not "Emo enough" for Emo Night</p>
                        </>
                    )}
                    <div className="trackRatings">
                      <ul>
                        <li>
                          <p>Sadness: {isSad}% Sad {isSad === 69 && <span>(nice)</span>}</p>
                        </li>
                        <li>
                          <p>Energy: {isEnergetic}% Moshable {isEnergetic === 69 && <span>(nice)</span>}</p>
                        </li>
                      </ul>
                    </div>
        </div>
      </ResultStyles>
    }
    </>
  )
}