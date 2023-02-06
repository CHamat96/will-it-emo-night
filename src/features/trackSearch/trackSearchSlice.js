import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    query:'',
    results:[],
    optionSelected: false,
    searchSubmitted: false,
    selection: {},
    submission: {}
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
            state.selection = action.payload
        },
        setIsSelected: (state, action) => {
            state.optionSelected = true
        },
        setSubmission: (state, action) => {
            state.submission = action.payload
        }
    },
})
export const { setQuery, setResults, setSelection, setSubmission, setIsSelected } = trackSearchSlice.actions

export const selectQuery = (state) => state.tracks.query
export const selectResults = (state) => state.tracks.results
export const hasSelection = (state) => state.tracks.optionSelected
export const selectSelection = (state) => state.tracks.selection
export const selectIsSelected = (state) => state.tracks.optionSelected
export const selectSubmission = (state) => state.tracks.submission

export default trackSearchSlice.reducer;