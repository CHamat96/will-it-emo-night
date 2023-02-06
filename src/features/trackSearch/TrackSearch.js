import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaSpotify } from 'react-icons/fa'

import {
    selectQuery,
    selectResults,
    setQuery,
    setResults,
    setSelection,
    selectSelection,
    selectSubmission,
    setSubmission,
    setIsSelected,
    selectIsSelected
} from './trackSearchSlice'

import useFetch from '../../hooks/useFetch'
import styled from 'styled-components'

const SearchFormStyles = styled.form`
  .searchContainer {
    position:relative;
    width:100%;
  }
input[type="radio"]{
  opacity:0;
  position:absolute;
  &:first-of-type:focus ~ .resultDetails,
  &:checked ~ .resultDetails {
    background:var(--green);
    color:var(--white);
    font-weight:600;
  }
  &.selected ~ .resultDetails {
    background:#000;
    color:var(--white);
    font-style:italic;
  }
}

.resultsContainer {
  position:absolute;
  border:solid 1px #000;
  text-align:left;
  top:25px;
  left:0;
  display:block;
  width:100%;
  max-height:250px;
  overflow-y:scroll;
  padding:0px;
}
  .resultDetails {
    width:100%;
    display:inline-flex;
    align-items:center;
    justify-content:flex-start;
    img {
      height:80px;
      margin-right:10px;
    }
  }
`

export function TrackSearch(){
    const dispatch = useDispatch()
    const query = useSelector(selectQuery)
    const results = useSelector(selectResults)
    const selectionMade = useSelector(selectIsSelected)
    const selection = useSelector(selectSelection)
    const submission = useSelector(selectSubmission)
    const { data, loading, error } = useFetch('search', query)

    const handleSearch = (e) => {
      e.preventDefault();
      let value = e.target.value;
      if(value.length > 0){
        dispatch(setQuery(value))
        if(!loading && !error){
          dispatch(setResults(data.tracks.items))
        }
      } else if (value.length === 0){
        handleClear()
      }
    }


    const handleClear = () => {
      dispatch(setQuery(''));
      dispatch(setResults([]));
      dispatch(setSelection(null));
      dispatch((setIsSelected(false)));
    }

    const handleRadioInput = (e) => {
      const value = e.target.value
      dispatch(setSelection(results.filter((items) => {
        return items.id === value
      })[0]))}

    const handleSubmit = (e) => {
      e.preventDefault()
      if(selectionMade){
        dispatch(setSubmission(selection))
      } else {
        dispatch(setSubmission(results[0]))
      }
      console.log(selection)
      handleClear();
    }

    const handleKeyDown = (e) => {
      const keycode = e.code
      if(keycode === "Enter") {
        dispatch((setIsSelected(true)))
        handleSubmit(e)
      }
    }


    return (
        <SearchFormStyles
        onSubmit={handleSubmit}
        className="trackSearchForm">
            <fieldset>
                <legend>Step 1: Search for A Song</legend>
                <label htmlFor="trackSearch">Enter the name of a song</label>
                <div className="searchContainer">
                  <div className="searchInput">
                      <input
                      required 
                      type="text" 
                      name="trackSearch" 
                      id="trackSearch" 
                      value={query}
                      onChange={handleSearch}
                      autoComplete="off"
                      />
                      <button
                      type="button"
                      className="clearSearch"
                      onClick={handleClear}>
                        Clear Search
                      </button>
                  </div>
                  {results.length > 0 &&
                  <div className="resultsContainer">
                        <ul className="resultsList">
                          {results.map((song, index) => {
                            const image = song.album.images[0]
                            return (
                              <li key={`${song.id} - ${index}`}>
                                <label htmlfor="searchResult">
                                  <input 
                                  type="radio" 
                                  name="searchResult" 
                                  id={song.id} 
                                  value={song.id}
                                  onChange={handleRadioInput}
                                  onKeyDown={handleKeyDown}
                                  />
                                  <div className="resultDetails">
                                    {image ? <img src={image.url} alt={song.name}/> : <FaSpotify />}
                                    <p>{song.name}</p>
                                  </div>
                                </label>
                              </li>
                            )
                          })}
                        </ul>
                    </div>
                    }
                    </div>
            </fieldset>
        </SearchFormStyles>
    )
}