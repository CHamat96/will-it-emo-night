import React, { useEffect, useRef, useState } from 'react'
import { selectPlaylist, clearPlaylist, deleteTrack, selectToggleMenu, togglePlaylistMenu, selectHasTracks } from "./playlistSlice";
import { useSelector, useDispatch } from "react-redux";
import { ExportPlaylist } from "./createPlaylist";
import { TbHandRock } from 'react-icons/tb'
import { FiXCircle } from 'react-icons/fi'
import  PlaylistStyles  from "../../styles/PlaylistStyles";

export default function PlaylistDisplay() {
  const [isOpen, setIsOpen] = useState(false)
  const open = useSelector(selectToggleMenu);
  const playlist = useSelector(selectPlaylist)
  const dispatch = useDispatch();
  const toggleRef = useRef(null)
  const hasTracks = useSelector(selectHasTracks);

  const handleDeleteTrack = (song) => {
    dispatch(togglePlaylistMenu(false))
    dispatch(deleteTrack(song))
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
          <h4>Your Emo Night Playlist:</h4>
        </div>
        <div className="playlistButtonFlex">
          <ExportPlaylist />
          <button
          className="cta spotifyCTA"
          onClick={() => dispatch(clearPlaylist())}>Clear Playlist</button>     
        </div>
          {playlist.map((song, index) => (
            <div key={`${song.id} - ${index}`}>
              <div className="songDetails">
                <p>{index + 1}</p>
                {song.album.images[2] && <img src={song.album.images[1].url} alt={song.name} /> }
                  <p>{song.name} - <span className="artist">{song.artists.map(artist => artist.name)}</span></p>
                <button
                type="button"
                className="deleteSong"
                aria-label={`Remove "${song.name}" from your playlist`}
                title={`Remove "${song.name}" from your playlist`}
                onClick={() => handleDeleteTrack(song)}
                ><FiXCircle/></button>
              </div>
            </div>
          ))}
      </div>
    </div>
    </PlaylistStyles>
  )
}