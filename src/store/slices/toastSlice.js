import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: {
    open: false,
    message: "",
    severity: "success",
  },
  reducers: {
    showToast: (state, action) => {
      const { message, severity = "success" } = action.payload;
      state.open = true;
      state.message = message;
      state.severity = severity;
    },
    hideToast: (state) => {
      state.open = false;
      state.message = "";
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
