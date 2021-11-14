import { createSlice } from '@reduxjs/toolkit'

export const locationSlice = createSlice({
  name: 'location',
  initialState: {
    location: '78712', //ut austin zip code
    distance: 50,
    type: 'Dog',
    size: 'medium',
    gender: 'male, female'
  },
  reducers: {
    setType: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.type = action.payload
    },
    setLocation: (state, action) => {
        state.location = action.payload
    },
    setDistance: (state, action) => {
        state.distance = action.payload
    },
    setSize: (state, action) => {
        state.size = action.payload
    },
    setGender: (state, action) => {
        state.gender = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setType, setLocation, setDistance, setSize, setGender } = locationSlice.actions

export default locationSlice.reducer