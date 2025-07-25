import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const fetchCardsByBoard = createAsyncThunk(
  "/cards/fetchCardsByBoard",
  async (boardId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(`/cards/board/${boardId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const createCard = createAsyncThunk(
  "cards/createCard",
  async (
    { listId, name, description, boardId, imageUrl },
    { getState, rejectWithValue }
  ) => {
    try {
      const token = getState().auth.token;
      const response = await axios.post(
        `/cards`,
        { listId, name, description, boardId, imageUrl },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const moveCard = createAsyncThunk(
  "cards/moveCard",
  async (
    { cardId, sourceListId, destinationListId, sourceIndex, destinationIndex },
    { getState, rejectWithValue }
  ) => {
    try {
      const token = getState().auth.token;

      const response = await axios.put(
        `/cards/move`,
        {
          cardId,
          sourceListId,
          destinationListId,
          sourceIndex,
          destinationIndex,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const deleteCard = createAsyncThunk(
  "cards/deleteCard",
  async (cardId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      await axios.delete(`/cards/${cardId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return cardId;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || "Unknown error"
      );
    }
  }
);
export const updateCard = createAsyncThunk(
  "cards/updateCard",
  async (
    { cardId, name, description, imageUrl },
    { getState, rejectWithValue }
  ) => {
    try {
      const token = getState().auth.token;
      const response = await axios.put(
        `/cards/${cardId}`,
        { name, description, imageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const cardSlice = createSlice({
  name: "cards",
  initialState: {
    items: [],
    cards: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCardsByBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCardsByBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = action.payload;
      })
      .addCase(fetchCardsByBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCard.fulfilled, (state, action) => {
        state.cards.push(action.payload);
      })
      .addCase(moveCard.fulfilled, (state, action) => {
        const movedCard = action.payload.card;
        const destIndex = action.payload.destinationIndex;

        if (!movedCard) return;

        //Remove from old list
        state.cards = state.cards.filter((c) => c._id !== movedCard._id);
        state.cards.splice(destIndex, 0, movedCard);
      })
      //UPDATE
      .addCase(updateCard.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = state.cards.map((card) =>
          card._id === action.payload._id ? action.payload : card
        );
      })
      .addCase(updateCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //DELETE
      .addCase(deleteCard.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = state.cards.filter((card) => card._id !== action.payload);
      })
      .addCase(deleteCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cardSlice.reducer;
