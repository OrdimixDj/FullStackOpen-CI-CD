import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationReducer = createSlice({
  name: 'Notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return initialState
    }
  },
})

export const { addNotification, clearNotification } = notificationReducer.actions

export const setNotification = (content, duration) => {
  return async dispatch => {
    dispatch(addNotification(content))
    
    const timeoutDuration = duration * 1000

    setTimeout(() => {
      dispatch(clearNotification())
    }, timeoutDuration)
  }
}

export default notificationReducer.reducer