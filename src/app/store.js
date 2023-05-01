import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../features/authentication/authenticationSlice'
import trackSearchReducer from '../features/trackSearch/trackSearchSlice'
import userReducer from '../features/user/userSlice'
import playlistReducer from '../features/playlist/playlistSlice'

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    tracks: trackSearchReducer,
    user: userReducer,
    playlist: playlistReducer,
  },
});
