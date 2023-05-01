import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    query: '',
    results: [],
    submission: {},
    artistID: '',
    trackID: '',
    selectionMade: false,
}

export const revertAll = createAction('REVERT_ALL')


const trackSearchSlice = createSlice({
    name:'tracks',
    initialState,
    reducers:{
        setQuery: (state, action) => {
            state.query = action.payload
        },
        setResults: (state, action) => {
            state.results = action.payload
        },
        setSubmission: (state, action) => {
            state.submission = action.payload
        },
        setArtistID: (state, action) => {
            state.artistID = action.payload
        },
        setTrackID: (state, action) => {
            state.trackID = action.payload
        },
        setSelectionMade: (state, action) => {
            state.selectionMade = action.payload
        },
    },
    extraReducers: (builder) => 
    builder
    .addCase(revertAll, () => initialState)
})

export const { setQuery, setResults, setSubmission, setArtistID, setTrackID, setSelectionMade } = trackSearchSlice.actions

export const selectQuery = (state) => state.tracks.query;
export const selectResults = (state) => state.tracks.results;
export const selectSubmission = (state) => state.tracks.submission;
export const selectTrackID = (state) => state.tracks.trackID;
export const selectArtistID = (state) => state.tracks.artistID;
export const isSelectionMade = (state) => state.tracks.selectionMade

export default trackSearchSlice.reducer;