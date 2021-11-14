import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {
    setToken: (state: any, action: any) => {
      state.token = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setToken } = authSlice.actions

export default authSlice.reducer