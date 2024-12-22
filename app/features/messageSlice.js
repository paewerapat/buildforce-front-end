import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    users: [],
    resultUser: 0,
    data: [],
    firstLoad: false
}

export const messageSlice = createSlice({
  name: 'socket-io',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      return {...action.payload}
    },
    addUser: (state, action) => {
      
    }
  },
})

// Action creators are generated for each case reducer function
export const { addMessage, addUser } = messageSlice.actions
export default messageSlice.reducer;