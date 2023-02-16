import React, { useEffect, useRef, useState } from 'react'
import { selectPlaylist, clearPlaylist, deleteTrack, selectToggleMenu, togglePlaylistMenu, selectHasTracks, selectPlaylistName, setPlaylistName, moveItemUp, moveItemDown } from "./playlistSlice";
import { useSelector, useDispatch } from "react-redux";
import { ExportPlaylist } from "./createPlaylist";
import { TbHandRock } from 'react-icons/tb'
import { FiXCircle } from 'react-icons/fi'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
import  PlaylistStyles  from "../../styles/PlaylistStyles";
import { selectUserName } from '../user/userSlice';

export default function PlaylistDisplay() {
  const [isOpen, setIsOpen] = useState(false)
  const open = useSelector(selectToggleMenu);
  const userName = useSelector(selectUserName)
  const playlist = useSelector(selectPlaylist)
  const dispatch = useDispatch();
  const toggleRef = useRef(null)
  const hasTracks = useSelector(selectHasTracks);
  const playlistName = useSelector(selectPlaylistName)

  const handleDeleteTrack = (event, song) => {
    event.stopPropagation();
    dispatch(deleteTrack(song))
  }

  const handleTextInput = (event) => {
    const value = event.target.value
    dispatch(setPlaylistName(value))
  }

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  useEffect(() => {
    const toggleMenuOutsideClick = (event) => {
      if(toggleRef.current && !toggleRef.current.contains(event.target) && isOpen) {
        dispatch(togglePlaylistMenu(false))
      }
    }
    document.addEventListener('click', toggleMenuOutsideClick);
    return () => {
      document.removeEventListener('click', toggleMenuOutsideClick)
    };
  }, [dispatch, isOpen, toggleRef])

  const handleShiftUp = (event, index) => {
    event.stopPropagation();
    dispatch(moveItemUp({ index }))
  }

  const handleShiftDown = (event, index) => {
    event.stopPropagation();
    dispatch(moveItemDown({ index }))
  }

  return (
    <PlaylistStyles
    ref={toggleRef}>
      <div className={hasTracks ? "container" : 'container hidden'}>
      <div className={isOpen ? "sectionToggle menuOpen" : "sectionToggle"}>
        <button
        onClick={() => dispatch(togglePlaylistMenu(!open))}>
          <TbHandRock />
          <p>
          {!isOpen ? "View Playlist" : "Close Playlist"}
          </p>
          {playlist.length > 0 && <div className="playlistCount">{playlist.length}</div>}
        </button>
      </div>
      <div 
      className={isOpen ? "playlist open" : 'playlist'}>
        <div className="playlistHeading">
          <fieldset className="playlistName" value={playlistName}>
            <label htmlFor="playlistName">Name your Playlist:</label>
            <input type="text" name="playlistName" id="playlistName" placeholder={`${userName}'s Emo night Playlist`}
            value={playlistName}
            onChange={handleTextInput} />
          </fieldset>
        </div>
        <div className="playlistButtonFlex">
          <ExportPlaylist
          playlistNameInput={playlistName} />
          <button
          className="cta spotifyCTA"
          onClick={() => dispatch(clearPlaylist())}>Clear Playlist</button>
        </div>
          {playlist.map((song, index) => (
            <div key={`${song.id} - ${index}`}>
              <div className="songDetails">
                <div className="playlistOrder">
                {index > 0 &&  <button
                  ref={toggleRef}
                  className="dirArrow arrowUp"
                  onClick={(e) => handleShiftUp(e, index)}
                  ><FaCaretUp /></button>}
                <p>{index + 1}</p>
                  {index < playlist.length - 1 && <button
                  ref={toggleRef}
                  className="dirArrow arrowDown"
                  onClick={(e) => handleShiftDown(e, index)}
                  ><FaCaretDown /></button>}
                </div>
                {song.album.images[2] && <img src={song.album.images[1].url} alt={song.name} /> }
                  <p>{song.name} - <span className="artist">{song.artists.map(artist => artist.name)}</span></p>
                <button
                type="button"
                className="deleteSong"
                aria-label={`Remove "${song.name}" from your playlist`}
                title={`Remove "${song.name}" from your playlist`}
                onClick={(e) => handleDeleteTrack(e, song)}
                ><FiXCircle/></button>
              </div>
            </div>
          ))}
      </div>
    </div>
    </PlaylistStyles>
  )
}