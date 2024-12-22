import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  loading: false,
  data: [],
  sound: true,
  page: 1,
  result: 0,
  filter: "",
}

export const notifySlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    getNotify: (state, { payload }) => {
      return {
        ...state,
        data: payload.notify,
        result: payload.result,
        page: initialState.page,
      }
    },
    getMoreNotify: (state, { payload }) => {
      if(payload.notify.length < 1) return {
        ...state,
        page: state.page + 1
      }
      return {
        ...state,
        data: [...state.data, ...payload.notify],
        result: state.result + payload.result,
        page: state.page + 1,
      }
    },
    createNotify: (state, action) => {
      return {
        ...state,
        data: [action.payload, ...state.data]
      }
    },
    isReadNotify: (state, { payload }) => {
      const newArray = state.data.map((item) => {
        if(item.id === payload.id) return {
          ...item.isRead = true
        }
        return item
      })
      state.data = newArray;
    },
    setFilterNotify: (state, { payload }) => {
      state.filter = payload;
    },
    deleteAllNotify: (state, action) => {
      return initialState
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
  getNotify, 
  createNotify, 
  isReadNotify,
  getMoreNotify,
  deleteAllNotify,
  setFilterNotify,
} = notifySlice.actions
export default notifySlice.reducer;