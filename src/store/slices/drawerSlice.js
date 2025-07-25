import { createSlice } from "@reduxjs/toolkit";

const drawerSlice = createSlice({
  name: "drawer",
  initialState: {
    open: false,
    type: null,
    props: {},
  },
  reducers: {
    openDrawer: (state, action) => {
      state.open = true;
      state.type = action.payload.type || null;
      state.props = action.payload.props || {};
    },
    closeDrawer: (state) => {
      state.open = false;
      state.type = null;
      state.props = {};
    },
  },
});

export const { openDrawer, closeDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;
