import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectQuery, 
  selectResults, 
  selectSubmission, 
  setQuery, 
  setResults, 
  setSubmission,
  setArtistID,
  setTrackID, 
  setSelectionMade} from './trackSearchSlice'

import useFetch from '../../hooks/useFetch';

import styled from "styled-components";

const FormStyles = styled.form`
.searchInput {
  gap: 1rem;
  input[type="text"],
  button:first-of-type{
    height:25px;
  }
  > * {
    margin-right:35px;
    width:250px;
  }
  button {
    min-height:25px;
  }
}
.searchContainer {
  position:relative;
}
  .searchResults {
    position:absolute;
    background:var(--white);
    height:300px;
    overflow-y:auto;
    overflow-x:visible;  
    width:50%;
  }
  .resultContainer {
    display:flex;
    text-align:left;
    img {
      max-width:65px;
      margin-right:15px;
    }
    &:hover,
    &:focus {
      background:var(--green);
      font-weight:600;
      color:var(--white);
    }
    &:active {
      background:#000;
      font-style:italic;
    }
  }
`
const randomOffset = Math.floor(Math.random() * 50)
export function TrackSearch(){
  const dispatch = useDispatch();
  const [random, setRandom] = useState(null)
  const query = useSelector(selectQuery)
  const results = useSelector(selectResults)
  const submission = useSelector(selectSubmission)
  
  const { data, loading, error } = useFetch('search', query)
  const { data: randomData, loading: randomLoading, error: randomError } = useFetch('search', 'genre:pop-punk', randomOffset)

  useEffect(() => {
    if(!randomLoading && !randomError && randomData) {
      let tracks = randomData.tracks.items
      setRandom(tracks)
    }
  }, [randomData, randomLoading, randomError])

  const handleInput = (e) => {
    let value = e.target.value
    if(value.length > 0 ){
      dispatch(setQuery(value))
      if(!loading && !error && data){
        dispatch(setResults(data.tracks.items))
      }
    } else if (value.length === 0){
      handleClear();
    }
  }

  const handleClear = () => {
    dispatch(setQuery(''))
    dispatch(setResults([]))
  }

  const handleArrowKeys = (e, song) => {
    if(e.key === "ArrowUp" && e.target.previousSibling){
      e.preventDefault();
      const prevSib = e.target.previousSibling;
      prevSib.focus();
      if(prevSib.offsetTop < e.target.offsetTop){
        e.target.scrollIntoView(true)
      }
    }
    if(e.key === "ArrowDown" && e.target.nextSibling){
      e.preventDefault();
      const nextSib = e.target.nextSibling;
      nextSib.focus();
      if(nextSib.offsetTop + nextSib.offsetHeight > e.target.offsetTop + e.target.offsetHeight){
        e.target.scrollIntoView(false)
      }
    } else if (e.key === "Enter"){
      handleClear();
      handleSubmission(e, song)
    }
  }

  const handleSubmission = (e, song) => {
    e.preventDefault();
    dispatch(setArtistID(song.artists[0].id))
    dispatch(setTrackID(song.id))
    dispatch(setSubmission(song))
    dispatch(setSelectionMade(true))
    handleClear();
  }

  const handleRandom = (e) => {
    e.preventDefault();
    const filteredSongs = random.filter((song) => {
      return song.album.album_type !== "compilation"
    })
    const index = Math.floor(Math.random() * filteredSongs.length)
    handleSubmission(e, filteredSongs[index])
  }

  return (
    <FormStyles>
      <div className="wrapper">
        <label htmlFor="trackSearch">Search for A Song</label>
        <div className="searchContainer">
          <div className="searchInput">
            <input 
            type="text" 
            name="trackSearch" 
            id="trackSearch" 
            value={query}
            onChange={handleInput}/>
            <button
            type="button"
            onClick={handleClear}>Clear Search</button>
            <button
            type="button"
            className="spotifyButton"
            onClick={handleRandom}>Pick a Random Song!</button>
          </div>
          {results.length > 0 && 
          <div className="searchResults">
              {results.map((song, index) => {
                const image = song.album.images
                return (
                  <div 
                  className="resultContainer"
                  key={`${song.id} - ${index}`}
                  tabIndex={index}
                  onKeyDown={e => handleArrowKeys(e, song)}
                  onClick={e => handleSubmission(e, song)}
                  >
                    {image[0] && <img src={image[0].url} alt={song.name} />}
                    <p>{song.name}</p>
                  </div>
                )
              })}
          </div>
          }
        </div>
      </div>
    </FormStyles>
  )
}