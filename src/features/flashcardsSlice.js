// features/flashcardsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFlashcards, createFlashcard, updateFlashcard, deleteFlashcard } from '../services/flashcardApi';

// Async thunks for API calls
export const fetchFlashcardsAsync = createAsyncThunk(
  'flashcards/fetchFlashcards',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchFlashcards();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createFlashcardAsync = createAsyncThunk(
  'flashcards/createFlashcard',
  async (newFlashcard, { rejectWithValue }) => {
    try {
      return await createFlashcard(newFlashcard);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateFlashcardAsync = createAsyncThunk(
  'flashcards/updateFlashcard',
  async ({_id, correct }, { rejectWithValue }) => {
    try {
      const updatedFlashcard = await updateFlashcard({ _id, correct });
      return updatedFlashcard;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteFlashcardAsync = createAsyncThunk(
  'flashcards/deleteFlashcard',
  async (id, { rejectWithValue }) => {
    try {
      await deleteFlashcard(id);
      return id; // Return ID to remove it from state
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const flashcardsSlice = createSlice({
  name: 'flashcards',
  initialState: {
    flashcards: [],
    progress: 0,
    loading: false,
    error: null,
  },
  reducers: {
    setProgress: (state) => {
      state.progress = state.flashcards.filter(flashcard => flashcard.level === 1).length;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlashcardsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFlashcardsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.flashcards = action.payload;
        state.progress = action.payload.filter(flashcard => flashcard.level === 1).length;
      })
      .addCase(fetchFlashcardsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createFlashcardAsync.fulfilled, (state, action) => {
        state.flashcards.push(action.payload);
      })
      .addCase(updateFlashcardAsync.fulfilled, (state, action) => {
        const { id, correct } = action.payload;
        const flashcard = state.flashcards.find(f => f.id === id);
        if (flashcard) {
          flashcard.level = correct ? flashcard.level + 1 : flashcard.level - 1;
        }
      })
      .addCase(deleteFlashcardAsync.fulfilled, (state, action) => {
        state.flashcards = state.flashcards.filter(flashcard => flashcard.id !== action.payload);
      });
  },
});

export const { setProgress } = flashcardsSlice.actions;
export default flashcardsSlice.reducer;
