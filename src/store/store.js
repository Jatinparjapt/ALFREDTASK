import { configureStore } from '@reduxjs/toolkit';
import flashcardsReducer from '../features/flashcardsSlice';

const store = configureStore({
  reducer: {
    flashcards: flashcardsReducer,
  },
});

export default store;
