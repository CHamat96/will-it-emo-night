import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authenticationReducer from '../features/authentication/authenticationSlice'
import trackSearchReducer from '../features/trackSearch/trackSearchSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    authentication: authenticationReducer,
    tracks: trackSearchReducer,
  },
});
