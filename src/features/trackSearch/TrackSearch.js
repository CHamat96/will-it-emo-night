import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiXCircle } from 'react-icons/fi'
import { selectQuery, 
  selectResults, 
  setQuery, 
  setResults, 
  setSubmission,
  setArtistID,
  setTrackID, 
  setSelectionMade
} from './trackSearchSlice'

import useFetch from '../../hooks/useFetch';

import styled from "styled-components";

const FormStyles = styled.form`

.inputSection {
  position:relative;
  height:max-content;
}
.formInput {
  display:flex;
  align-items:flex-end;
  padding:25px 0;
}
.formRow {
  width:80%;
  flex:2 1 auto;
  text-align:left;
}
label {
  display:block;
  margin:5px 0;
  width:100%;
  font-size:clamp(1.4rem, 2.3vw, 2rem)
}
input{
  margin-left:0;
  width:100%;
  border:solid 2px black;
  border-radius:5px;
  padding:2px;
}

.clearInput {
  background:none;
  border:none;
  position:relative;
  bottom:4px;
  margin-left:-30px;
  svg {
    display:block;
  }
}
  .searchResults {
    position:absolute;
    border:solid 0.5px black;
    left:0;
    width:100%;
    transform:translateY(-28px);
    background:var(--white);
    height:300px;
    overflow-y:auto;
    overflow-x:visible;  
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

export function TrackSearch(){
  const dispatch = useDispatch();
  const query = useSelector(selectQuery)
  const results = useSelector(selectResults)
  
  const { data, loading, error } = useFetch('search', query)


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


  return (
    <FormStyles
    value={results[0] ? results[0].id : ''}
    onSubmit={(e) => handleSubmission(e, results[0])}>
        <div className="inputSection">
          <div className="formInput">
            <div className="formRow">
            <label htmlFor="trackSearch">Enter the name of a song  in the field below: </label>
              <input 
              type="text" 
              name="trackSearch" 
              id="trackSearch" 
              value={query}
              required
              autoComplete="off"
              minLength="2"
              onChange={handleInput}/>
            </div>
            <button
            type="button"
            aria-label="Clear Search"
            className="clearInput"
            onClick={handleClear}>
              <FiXCircle />
            </button>
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
    </FormStyles>
  )
}