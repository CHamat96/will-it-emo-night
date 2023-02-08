import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../features/authentication/authenticationSlice'
import trackSearchReducer from '../features/trackSearch/trackSearchSlice'
import userReducer from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    tracks: trackSearchReducer,
    user: userReducer
  },
});
