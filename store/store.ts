import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/counterSlice";

console.log("STORE CREATED");

const store = configureStore({
  reducer: {
    // add "slices" here:
    counter: counterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
