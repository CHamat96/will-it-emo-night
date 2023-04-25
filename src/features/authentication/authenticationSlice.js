import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token:'',
    isLoggedIn: false,
}

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        },
        setAccessToken: (state, action) => {
            state.token = action.payload
        },
    }
})

export const { setIsLoggedIn, setAccessToken } = authenticationSlice.actions;

export const accessToken = (state) => state.authentication.token
export const loggedIn = (state) => state.authentication.isLoggedIn

export default authenticationSlice.reducer;