// store/userSlice/userRegistration.js
import { createSlice } from "@reduxjs/toolkit";

const UserRegInfoSlice = createSlice({
  name: "userRegistrationInfo",
  initialState: {
    walletAddress: "",
    name: "",
    email: "",
    role: "",
    phone: "",
    category: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  },
  reducers: {
    updateUserRegInfo: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateUserRegInfo } = UserRegInfoSlice.actions; // Corrected action name
export default UserRegInfoSlice.reducer;