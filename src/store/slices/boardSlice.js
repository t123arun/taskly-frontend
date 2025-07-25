import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const fetchBoards = createAsyncThunk(
  "boards/fetchBoards",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get("/boards", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Unknown Error"
      );
    }
  }
);

export const deleteBoard = createAsyncThunk(
  "boards/deleteBoard",
  async (boardId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      await axios.delete(`/boards/${boardId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return boardId;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || "Unknown error"
      );
    }
  }
);

export const shareBoard = createAsyncThunk(
  "boards/shareBoard",
  async ({ boardId, userEmail }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.put(
        `/boards/share`,
        { boardId, userEmail },
        { header: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message) || err.message;
    }
  }
);

export const updateBoard = createAsyncThunk(
  "boards/updateBoard",
  async (
    { boardId, name, description, favourite, member },
    { getState, rejectWithValue }
  ) => {
    try {
      const token = getState().auth.token;
      const response = await axios.put(
        `/boards/${boardId}`,
        { name, description, favourite, member },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateBoardTheme = createAsyncThunk(
  "boards/updateBoardTheme",
  async ({ boardTheme }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.put(
        `/user`,
        { boardTheme },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchBoardTheme = createAsyncThunk(
  "boards/fetchBoardTheme",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(`/user/theme`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.boardTheme;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const boardSlice = createSlice({
  name: "boards",
  initialState: {
    items: [],
    theme: "defaultTheme",
    loading: false,
    error: null,
  },
  reducers: {
    resetBoardState: (state) => {
      state.items = [];
      state.theme = "defaultTheme";
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(shareBoard.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(updateBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.map((board) =>
          board._id === action.payload._id ? action.payload : board
        );
      })
      .addCase(fetchBoardTheme.fulfilled, (state, action) => {
        state.theme = action.payload;
      })
      .addCase(deleteBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (board) => board._id !== action.payload
        );
      })
      .addCase(deleteBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetBoardState } = boardSlice.actions;
export default boardSlice.reducer;
