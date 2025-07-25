import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const fetchList = createAsyncThunk(
  "lists/fetchLists",
  async (boardId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(`/lists/${boardId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createList = createAsyncThunk(
  "lists/createList",
  async ({ name, boardId, position }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.post(
        `/lists`,
        { name, boardId, position },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateListName = createAsyncThunk(
  "lists/updateListName",
  async ({ listId, name }, { getState }) => {
    const token = getState().auth.token;
    const response = await axios.patch(
      `/lists/${listId}`,
      { name },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }
);

export const moveList = createAsyncThunk(
  "lists/moveList",
  async (
    { boardId, sourceIndex, destinationIndex },
    { getState, rejectWithValue }
  ) => {
    try {
      const token = getState().auth.token;
      const response = await axios.put(
        `/lists/move`,
        { boardId, sourceIndex, destinationIndex },
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

export const deleteList = createAsyncThunk(
  "lists/deleteList",
  async (listId, { getState }) => {
    const token = getState().auth.token;
    await axios.delete(`/lists/${listId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return listId;
  }
);

const listsSlice = createSlice({
  name: "lists",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchList.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchList.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(createList.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createList.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateListName.fulfilled, (state, action) => {
        const updated = action.payload;
        state.items = state.items.map((list) =>
          list._id === updated._id ? updated : list
        );
      })
      .addCase(moveList.fulfilled, (state, action) => {
        const { sourceIndex, destinationIndex } = action.payload;
        const movedList = state.items.splice(sourceIndex, 1)[0];
        state.items.splice(destinationIndex, 0, movedList);
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        const listId = action.payload;
        state.items = state.items.filter((list) => list._id !== listId);
      });
  },
});

export default listsSlice.reducer;
