import { createSlice } from '@reduxjs/toolkit'

export const locationSlice = createSlice({
  name: 'location',
  initialState: {
    startLocation: undefined, //ut austin zip code
    endLocation: undefined
  },
  reducers: {
    setStartLocation: (state, action) => {
        state.startLocation = action.payload
    },
    setEndLocation: (state, action) => {
      state.endLocation = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setStartLocation, setEndLocation } = locationSlice.actions

export default locationSlice.reducer