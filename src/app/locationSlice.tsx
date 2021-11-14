import { createSlice } from '@reduxjs/toolkit'

export const locationSlice = createSlice({
  name: 'location',
  initialState: {
    startLocation: undefined, //ut austin zip code
    endLocation: undefined,
    startLat: 0,
    startLng: 0,
    endLat: 0,
    endLng: 0,
  },
  reducers: {
    setStartLocation: (state, action) => {
        state.startLocation = action.payload
    },
    setEndLocation: (state, action) => {
      state.endLocation = action.payload
    },
    setStartLat: (state, action) => {
        state.startLat = action.payload
      },
      setEndLat: (state, action) => {
        state.endLat = action.payload
      },
      setStartLng: (state, action) => {
        state.startLng = action.payload
      },
      setEndLng: (state, action) => {
        state.endLng = action.payload
      },
      
  },
})

// Action creators are generated for each case reducer function
export const { setStartLocation, setEndLocation, setEndLat, setEndLng, setStartLat, setStartLng } = locationSlice.actions

export default locationSlice.reducer