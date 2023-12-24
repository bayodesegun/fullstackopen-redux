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

/**
 * The setTimedNotification function dispatches a notification and clears it after a specified number
 * of seconds.
 * @param notification - The "notification" parameter is the message or content of the notification
 * that you want to display. It can be a string or any other data type that represents the content of
 * the notification.
 * @param seconds - The `seconds` parameter is the number of seconds after which the notification
 * should be cleared.
 * @returns an async function that takes a dispatch parameter.
 */
export const setTimedNotification = (notification, seconds) => {
  return async (dispatch) => {
    dispatch(setNotification(notification))
    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
