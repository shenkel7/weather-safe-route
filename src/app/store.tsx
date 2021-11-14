import { configureStore } from '@reduxjs/toolkit'
import matchReducer from './locationSlice'
import authReducer from './authSlice'

export default configureStore({
  reducer: {
      match: matchReducer,
      auth: authReducer
  },
})