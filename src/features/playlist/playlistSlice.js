import { createAction, createSlice } from "@reduxjs/toolkit";


const initialState = ({
  tracks:[],
  hasTracks:false,
  playlistReady:false,
  trackURIs: [],
  menuOpen: false,
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
    deleteTrack: (state, action) => {
      state.tracks = state.tracks.filter(track => track.id !== action.payload.id)
      state.trackURIs = state.trackURIs.filter(uri => uri !== action.payload.uri)
      state.hasTracks = state.tracks.length > 0 
    },
    togglePlaylistMenu: (state, action) => {
      state.menuOpen = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(clearPlaylist, () => initialState)
  }
})

export const { addTrack, toggleHasTracks, createTrackURIs, deleteTrack, setPlaylistReady, togglePlaylistMenu } = playlistSlice.actions

export const selectPlaylist = (state) => state.playlist.tracks
export const selectTrackURIs = (state) => state.playlist.trackURIs
export const selectPlaylistReady = (state) => state.playlist.playlistReady
export const selectToggleMenu = (state) => state.playlist.menuOpen
export const selectHasTracks = (state) => state.playlist.hasTracks
export default playlistSlice.reducer