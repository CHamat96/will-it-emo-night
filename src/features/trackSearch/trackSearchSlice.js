import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    query:'',
    results:[],
    optionSelected: false,
    selection: {
        artistName:'',
        artistId: '',
        trackName:'',
        trackURI: '',
        preview:'',
        image: '',
    }
}

const trackSearchSlice = createSlice({
    name:'tracks',
    initialState,
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload
        },
        setResults: (state, action) => {
            state.results = action.payload
        },
        setSelection: (state, action) => {
            state.optionSelected = true
            state.selection = {
                artistName: action.payload.artists[0].name,
                artistId: action.payload.artists[0].id,
                trackName: action.payload.name,
                trackURI: action.payload.uri,
                preview: action.payload.preview_url,
                image: action.payload.album.images[0].url,
                trackId: action.payload.id,
            }
        }
        
    },
})
export const { setQuery, setResults, setSelection } = trackSearchSlice.actions

export const selectQuery = (state) => state.tracks.query
export const selectResults = (state) => state.tracks.results
export const hasSelection = (state) => state.tracks.optionSelected
export const selectSelection = (state) => state.tracks.selection

export default trackSearchSlice.reducer;