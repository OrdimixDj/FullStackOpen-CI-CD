import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterReducer = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    modifyFilter(state, action) {
      return action.payload
    }
  },
})

export const { modifyFilter } = filterReducer.actions
export default filterReducer.reducer