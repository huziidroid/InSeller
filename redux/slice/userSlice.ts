import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./types";

type AuthState = {
  user: User | null;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  } as AuthState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
export const selectUser = (state: any) => state.user.user;
