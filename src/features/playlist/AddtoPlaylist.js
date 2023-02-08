import { useDispatch, useSelector } from "react-redux";
import { addTrack, selectPlaylist,togglePlaylistMenu, createTrackURIs } from "./playlistSlice";
import { selectSubmission } from "../trackSearch/trackSearchSlice";
import styled from "styled-components";

const PlaylistControlStyles = styled.div`
margin:15px;
display:flex;
align-items:center;
justify-content:center;
gap:1rem;
flex-wrap:wrap;
button {
  max-width:200px;
  padding:15px;
  font-size:clamp(1rem,2.5vw,1.8rem);
  font-family:var(--headingFont);
  text-shadow:none;
  text-align:center;
}
`

export default function AddToPlaylist(){
  const selection = useSelector(selectSubmission)
  const playlist = useSelector(selectPlaylist)
  const dispatch = useDispatch();


  const handleAddTrack = () => {
    if(!playlist.some(track => track.id === selection.id)){
      dispatch(addTrack(selection))
      dispatch(togglePlaylistMenu(true))
      dispatch(createTrackURIs(selection.uri))
      }
        else {
        alert(`"${selection.name}" by ${selection.artists[0].name} is already in your playlist!`)
        }
  }


  return (
    <PlaylistControlStyles>
      <button
      type="button"
      className="cta spotifyCTA"
      onClick={handleAddTrack}>Add this song to your Emo Night Playlist</button>
    </PlaylistControlStyles>
  )
}
