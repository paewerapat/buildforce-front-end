import { createSlice } from "@reduxjs/toolkit"

const initialState = { loading: false, success: false, error: false, info: false }

export const alertSlice = createSlice({
  name: 'alert-slice',
  initialState,
  reducers: {
    setLoadingState: (state, action) => {
      state.loading = action.payload
    },
    setSuccessAlert: (state, action) => {
      state.success = action.payload
    },
    setErrorAlert: (state, action) => {
      state.error = action.payload
    },
    setInfoAlert: (state, action) => {
      state.info = action.payload
    },
    setDefaultAlert: (state, action) => {
      return initialState
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  setLoadingState, 
  setSuccessAlert, 
  setErrorAlert, 
  setInfoAlert, 
  setDefaultAlert 
} = alertSlice.actions
export default alertSlice.reducer;