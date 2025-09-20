import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import participantReducer from '../../slice/participant/participantSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    participant: participantReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;