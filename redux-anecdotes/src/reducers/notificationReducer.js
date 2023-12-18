import { createSlice } from '@reduxjs/toolkit'


const notificationAtStart = ''
const notificationSlice = createSlice({
  name: 'notification',
  initialState: notificationAtStart,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const setTimedNotification = (dispatch, notification, seconds) => {
  dispatch(setNotification(notification))
  setTimeout(() => {
    dispatch(clearNotification())
  }, seconds * 1000)
}

export default notificationSlice.reducer
