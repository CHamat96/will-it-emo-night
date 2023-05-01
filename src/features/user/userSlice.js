import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_id: '',
  display_name: '',
  loading: false,
  error: null,
}

export const fetchUser = createAsyncThunk(`user/fetchUser`, async(token) => {
  const response = await fetch(`https://api.spotify.com/v1/me`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => 
  builder
  .addCase(fetchUser.pending, (state) => {
    state.loading = true
  })
  .addCase(fetchUser.fulfilled, (state, action) => {
    state.loading = false
    state.user_id = action.payload.id
    state.display_name = action.payload.display_name
  })
  .addCase(fetchUser.rejected, (state, action) => {
    state.error = action.error
  })
})

export const selectUserID = (state) => state.user.user_id;
export const selectUserName = (state) => state.user.display_name;
export default userSlice.reducer