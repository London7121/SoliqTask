import { createSlice } from '@reduxjs/toolkit';
import bcrypt from 'bcryptjs';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loginAttempts: 0,
    isLocked: false,
    lockUntil: null
  },
  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload;
      // Bu yerda haqiqiy admin ma'lumotlarini tekshirish kerak
      const adminUsername = 'admin';
      const adminPasswordHash = bcrypt.hashSync('power123', 10);
      
      if (username === adminUsername && bcrypt.compareSync(password, adminPasswordHash)) {
        state.user = { username };
        state.isAuthenticated = true;
        state.loginAttempts = 0;
        state.isLocked = false;
        state.lockUntil = null;
      } else {
        state.loginAttempts++;
        
        if (state.loginAttempts >= 3) {
          state.isLocked = true;
          state.lockUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 daqiqa
        }
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loginAttempts = 0;
    },
    resetLoginAttempts: (state) => {
      state.loginAttempts = 0;
      state.isLocked = false;
      state.lockUntil = null;
    }
  }
});

export const { 
  login, 
  logout, 
  resetLoginAttempts 
} = authSlice.actions;

export default authSlice.reducer;
