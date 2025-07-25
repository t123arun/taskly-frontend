import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./slices/toastSlice";
import authReducer from "./slices/authSlice";
import drawerReducer from "./slices/drawerSlice";
import boardReducer from "./slices/boardSlice";
import listsReducer from "./slices/listSlice";
import cardsReducer from "./slices/cardSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    toast: toastReducer,
    drawer: drawerReducer,
    boards: boardReducer,
    lists: listsReducer,
    cards: cardsReducer,
    user: userReducer,
  },
});
