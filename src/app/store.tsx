import { configureStore } from '@reduxjs/toolkit'
import locationSlice from './locationSlice'
import authReducer from './authSlice'

const rootReducer = configureStore({
  reducer: {
      location: locationSlice,
      auth: authReducer
  },
})

export default rootReducer;