// STEP 1: Create New Playlist
import { useDispatch, useSelector } from "react-redux";
import { accessToken } from "../authentication/authenticationSlice";
import { selectUserID, selectUserName } from "../user/userSlice";
import { selectTrackURIs, setPlaylistReady } from "./playlistSlice";


export const ExportPlaylist = ({ playlistNameInput }) => {
  const token = useSelector(accessToken);
  const userID = useSelector(selectUserID);
  const userName = useSelector(selectUserName)
  const tracks = useSelector(selectTrackURIs)
  const dispatch = useDispatch();
  const playlistName = playlistNameInput || `${userName}'s Emo Night Playlist`

  const handleExport = () => {
    console.log(playlistName)
    handleCreatePlaylist();
    dispatch(setPlaylistReady(true))
  }

  const handleCreatePlaylist = async() => {
    const method = "POST"

    const response = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists
    `, {
      method,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: playlistName, description: `Made with the "Will it Emo Night" Web Application` })
    });
    const playlist = await response.json()
    const playlistID = playlist.id;

    await fetch(
      `https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
        method,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uris: tracks })
      }
    )

    window.open(playlist.uri, "_blank")
  }

  return (
    <button
    type="button"
    className="cta spotifyCTA exportCTA"
    onClick={handleExport}>Export Playlist</button>
  )
}