import { createSlice } from '@reduxjs/toolkit'

const notificationAtStart = ''


const notificationSlice = createSlice({
  name: 'notification',
  initialState: notificationAtStart,
  reducers: {
    changeNotification(state, action) {
      return action.payload
    }
  }
})

export const {changeNotification } = notificationSlice.actions
export default notificationSlice.reducer
