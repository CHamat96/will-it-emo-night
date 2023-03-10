import React, { useState, useEffect } from "react";

import { useInView } from 'react-intersection-observer'

import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ReactAudioPlayer from 'react-audio-player';
import { FaSpotify, FaPlay, FaPause } from 'react-icons/fa'
import ProgressBar from 'react-customizable-progressbar';
import { selectSubmission, selectArtistID, selectTrackID, isSelectionMade, revertAll } from "../features/trackSearch/trackSearchSlice";
import useFetch from "../hooks/useFetch";
import RandomButton from "./RandomButton";
import { Link } from "react-router-dom";
import AddToPlaylist from "../features/playlist/AddtoPlaylist";
import { clearPlaylist, selectToggleMenu } from "../features/playlist/playlistSlice";


const genre_array = ['pop punk', 'emo', 'metalcore', 'hardcore', 'hardcore punk', 'post-hardcore', 'punk', 'nu metal', 'screamo', 'riot grrrl', 'metal', 'ska']

// Bands that (from experience) have been played at Emo Nights
const emo_ish_bands = ['Panic! at the Disco', 'Avril Lavigne', 'Olivia Rodrigo', "The Killers", "Weezer", "Lustra", "Wheatus", "Thirty Seconds To Mars"]

const ResultStyles = styled.section`
    padding: 50px 15px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap:2.5rem;
    align-items: flex-start;
    @media screen and (max-width:400px){
      justify-content:center;
    }

    h2 {
      font-size:clamp(2.5rem,2.5vw,3.4rem);
    }
  .loading {
    margin:0 auto;
  }

  .queryContainer {
    flex: 2 1 33%;
    margin-right: 50px;
    display:flex;
    flex-direction:column;
    align-items:center;
    @media screen and (max-width:600px) {
      margin-right:0px;
    }
  }
  .songAnalysis {
    margin:25px 0;
    flex: 1 2 500px;
    border:var(--dashedBorder);
    border-radius:15px;
    box-shadow:3px 3px 8px var(--darkRed);
    padding:15px 25px;
    p {
      font-weight:600;
    }
    .genreReport {
      padding:5px;
      p {
        font-weight:800;
      }
    }
    .strong {
      font-weight:900;
      text-transform:uppercase;
    }
  }

  .imageContainer {
    border:solid 15px var(--green);
    box-shadow:3px 5px 8px var(--charcoal);
    border-radius:5px;
    img {
      border:var(--dashedBorder);
      margin:0 auto;
    }
  }

  .trackRatings {
    h3 {
      text-align:center;
      color:var(--black);
      font-style:normal;
      .title {
        font-weight:900;
      }
    }
  .chartFlex {
    display:flex;
    justify-content:space-around;
    flex-wrap:wrap;
    margin:0 auto;

    }
    .RCP {
      flex:1 2 150px;
      max-width:200px;
      height:auto;
      svg {
        width:100%;
      }
      .RCP__Pointer {
        transform:rotate(0deg)
      }
      
    }

    .indicator {
    display: flex;
    justify-content: center;
    text-align: center;
    position: absolute;
    top: 45%;
    width: 100%;
    margin: 0 auto;
    user-select: none;
    opacity:0;
    transform:scale(0) rotate(0deg);
    transition:1s ease-in-out all;
    &.animated {
      opacity:1;
      transform:scale(1) rotate(360deg)
    }
      p {
      font-family:'Sora', sans-serif;;
      font-size:clamp(1rem, 2.5vw, 1.8rem);
      font-weight:800;
      font-style:italic;
      margin:0;
      padding:5px;
      &.sadness {
        color:var(--blue);
      }
      }
    }
  }

  .ctaFlex {
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
    gap:1rem;
    margin:15px 0;
  }

  .spotifyCTA {
    display:inline-flex;
    align-items:center;
    margin:0;
    svg {
      display:block;
      margin-right:5px;
    }
  }

  .previewControl {
    margin:15px 0;
    background:none;
    border:solid 5px var(--green);
    border-radius:85%;
    padding:20px 25px;
    svg {
      display:block;
      font-weight:700;
      font-size:2.5rem;
    }
  }
  `

export default function SongAnalysis(){
  const dispatch = useDispatch()
  const [isSad, setIsSad] = useState(null)
  const [isEnergetic, setIsEnergetic] = useState(null)
  const [isArtistEmo, setIsArtistEmo] = useState(null)
  const [isEmoIsh, setIsEmoIsh] = useState(null)
  const [previewPlaying, setPreviewPlaying] = useState(true)
  const { ref, inView } = useInView({
    threshold: 0.5
  })
  const selection = useSelector(selectSubmission);
  const selectionMade = useSelector(isSelectionMade);
  const trackID = useSelector(selectTrackID);
  const artistID = useSelector(selectArtistID);
  const open = useSelector(selectToggleMenu)

  const { data: trackData, loading: trackLoading, error: trackError } = useFetch(`audio-features/${trackID}`)
  const { data: artistData, loading: artistLoading, error: artistError } = useFetch(`artists/${artistID}`)
  useEffect(() => {
    if(!artistLoading && !trackLoading){
      if(trackData && artistData) {
        setIsArtistEmo(artistData.genres.filter((commonGenre) => genre_array.find((genre) => commonGenre.toLowerCase().includes(genre.toLowerCase()))).length > 0)
        setIsEmoIsh(emo_ish_bands.filter((band) => band.toLowerCase().includes(artistData.name.toLowerCase())).length > 0)
        setIsSad(Math.floor((1 - trackData.valence) * 100))
        setIsEnergetic(Math.floor(trackData.energy * 100))
        setPreviewPlaying(true)
      }
    }
  }, [artistData, artistLoading, trackData, trackLoading])

  const handleClear = () => {
    dispatch(revertAll())
    dispatch(clearPlaylist())
  }

  if(trackError || artistError){
    return (
      <>
        <p>Something went wrong!</p>
        <button 
        onClick={() => handleClear()}
        className="cta">Let's take it from the top...</button>
      </>
    )
  }

  const handlePreviewPlay = () => {
    const player = document.querySelector('.react-audio-player')
    setPreviewPlaying(true)
    player.play()
  }

  const handlePreviewPause = () => {
    const player = document.querySelector('.react-audio-player')
    setPreviewPlaying(false)
    player.pause()
  }

  const GenresList = () => {
    return (
      <span className="genresList">
        {artistData.genres.map((genre) => `"${genre.toUpperCase()}"`)
        .join(', ').replace(/, ([^,]*)$/, ' and $1')}
      </span>
    )
  } 
  // Regex variable that is used during the render to format based on whether the artist's name ends with an "s"
  let regex = /s$/

  const handleSpotifyOpen = (e) => {
    const spotifyLink = e.target.value
    const player = document.querySelector('.react-audio-player')
    player.pause()
    setPreviewPlaying(false)
    window.open(spotifyLink, '_none')
  }

  

  return (
    <div className={!open ? "mainContent" : 'mainContent blurred'}>
    {(artistLoading || trackLoading) &&
    <ResultStyles>
      <div className="loading">
        <h2>Locating the nearest Hot Topic...</h2>
      </div>
    </ResultStyles>
    }
    {selectionMade && artistData && trackData && 
      <ResultStyles>
        <div className="queryContainer">
          <h2>You Selected "{selection.name}" by {artistData.name}</h2>
          <div className="ctaFlex">
          <button
          className="cta spotifyCTA"
          value={selection.uri}
          onClick={handleSpotifyOpen}><FaSpotify />Listen on Spotify</button>
          <button
          className="cta spotifyCTA"
          value={artistData.uri}
          onClick={handleSpotifyOpen}>View Artist on Spotify</button>
          </div>
          <div className="imageContainer">
            <img src={selection.album.images[1].url} alt={selection.name} />
          </div>
          <div className="ctaFlex">
          { previewPlaying ? (
            <button
            className="previewControl pauseButton"
            onClick={handlePreviewPause}
            title="Pause Preview"
            aria-label="pause track preview"
            ><FaPause /></button>
            ) : (
              <button
              className="previewControl playButton"
              title="Play Preview"
              aria-label="play track preview"
              onClick={handlePreviewPlay}>
              <FaPlay />
              </button>
            )}
            {isArtistEmo || isEmoIsh ?  <AddToPlaylist /> : ''}
          </div>
          <ReactAudioPlayer 
          src={selection.preview_url}
          volume={0.4}
          onEnded={() => setPreviewPlaying(false)}
          autoPlay/>
        </div>
        <div className="songAnalysis">
        {artistData.genres[0] && 
        <div className="genreReview">
          <h3>{regex.test(artistData.name) ? "Are" : 'Is' } <span className="strong">{artistData.name}</span> Emo Enough?</h3>
          {isArtistEmo ? 
          (
            <div className="genreReport">
            <p>{artistData.name.trim()}{artistData.genres.length >= 2 ? <span>{regex.test(artistData.name) ? `'` : "'s"} genres include <GenresList /></span> : <span> {regex.test(artistData.name.trim()) ? "are" : 'is' } considered <GenresList /></span>}, so they are definitely Emo enough for Emo Night!</p>
            </div>
            )
              : isEmoIsh? (
                <div className="genreReport">
                <p>{artistData.name.trim()}{artistData.genres.length >= 2 ? <span>{regex.test(artistData.name) ? `'` : "'s"} genres include <GenresList /></span> : <span> {regex.test(artistData.name.trim()) ? "are" : 'is' } considered <GenresList /></span>}, but they are still considered Emo enough for Emo Night!</p>
                </div>
              )
              : (
                <div className="genreReport">
                    <p>{artistData.name.trim()}{artistData.genres.length >= 2 ? <span>{regex.test(artistData.name) ? `'` : "'s"} genres include</span> : <span> {regex.test(artistData.name.trim()) ? "are" : 'is' } considered</span>} <GenresList />, so they are not Emo enough for Emo Night.</p>
                </div>
            )}
        </div>
          }
          <div 
          className='trackRatings'>
            <h3><span className="title">{selection.name}</span>{regex.test(selection.name) ? `'` : "'s"} Sadness / Moshability Ratings:</h3>
            <div 
            ref={ref}
            className="chartFlex">
              <ProgressBar
              radius={100}
              progress={inView? isSad : 0}
              strokeWidth={12}
              strokeColor='var(--blue)'
              pointerRadius={8}
              pointerStrokeWidth={5}
              initialAnimation
              transition="0.8s ease-in-out"
              pointerStrokeColor='var(--charcoal)'
              >
                <div className={inView ? "indicator animated" : "indicator"}>
                  <p>{isSad}% Sad</p>
                </div>
              </ProgressBar>
              <ProgressBar
              radius={100}
              progress={inView ? isEnergetic : 0}
              strokeWidth={12}
              strokeColor='var(--red)'
              pointerRadius={8}
              initialAnimation
              pointerStrokeWidth={5}
              transition="0.8s ease-in-out"              trackTransition="none"
              pointerStrokeColor='var(--charcoal)'
              >
                <div className={inView ? "indicator animated" : "indicator"}>
                  <p>{isEnergetic}% Moshable</p>
                </div>
              </ProgressBar>
            </div>
          </div>
          <div className="ctaFlex">
            <Link to="/">
              <button
              className="cta"
              type="button"
              onClick={() => handleClear()}>Start Again</button>
            </Link>
          <RandomButton
          message="Get Another Random Song" />
          </div>
        </div>
      </ResultStyles>
    }
    </div>
  )
}