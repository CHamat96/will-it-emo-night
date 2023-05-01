import { createAction, createSlice } from "@reduxjs/toolkit";


const initialState = ({
  tracks:[],
  hasTracks:false,
  playlistReady:false,
  trackURIs: [],
  menuOpen: false,
  playlist_name:null,
})

export const clearPlaylist = createAction('REVERT_PLAYLIST')


const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers:{
    addTrack: {
      reducer: (state, action) => {
        state.tracks.push(action.payload)
        state.hasTracks = true;
      }
    },
    toggleHasTracks: (state, action) => {
      state.hasTracks = action.payload
    },
    createTrackURIs: (state, action) => {
      state.trackURIs.push(action.payload)
    },
    setPlaylistReady: (state, action) => {
      state.playlistReady = action.payload
    },
    setPlaylistName: (state, action) => {
      state.playlist_name = action.payload
    },
    deleteTrack: (state, action) => {
      state.tracks = state.tracks.filter(track => track.id !== action.payload.id)
      state.trackURIs = state.trackURIs.filter(uri => uri !== action.payload.uri)
      state.hasTracks = state.tracks.length > 0 
    },
    togglePlaylistMenu: (state, action) => {
      state.menuOpen = action.payload
    },
    moveItemUp: (state, action) => {
      const { index } = action.payload;
      if( index > 0 && index < state.tracks.length){
        const newTracks = [...state.tracks];
        const currentTrack = newTracks[index];
        newTracks[index] = newTracks[index - 1];
        newTracks[index - 1] = currentTrack;
        state.tracks = newTracks
      }
    },
    moveItemDown: (state, action) => {
      const { index } = action.payload;
      if( index >= 0 && index < state.tracks.length - 1){
        const newTracks = [...state.tracks];
        const currentTrack = newTracks[index];
        newTracks[index] = newTracks[index + 1];
        newTracks[index + 1] = currentTrack;
        state.tracks = newTracks
      }
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(clearPlaylist, () => initialState)
  }
})

export const { addTrack, toggleHasTracks, createTrackURIs, deleteTrack, setPlaylistReady, togglePlaylistMenu, setPlaylistName, moveItemDown, moveItemUp } = playlistSlice.actions

export const selectPlaylist = (state) => state.playlist.tracks
export const selectTrackURIs = (state) => state.playlist.trackURIs
export const selectPlaylistReady = (state) => state.playlist.playlistReady
export const selectToggleMenu = (state) => state.playlist.menuOpen
export const selectHasTracks = (state) => state.playlist.hasTracks
export const selectPlaylistName = (state) => state.playlist.playlist_name
export default playlistSlice.reducer