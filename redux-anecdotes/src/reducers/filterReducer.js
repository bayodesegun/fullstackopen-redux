import { createSlice } from '@reduxjs/toolkit'

const filterAtStart = ''


const filterSlice = createSlice({
  name: 'searchFilter',
  initialState: filterAtStart,
  reducers: {
    changeFilter(state, action) {
      return action.payload
    }
  }
})

export const { changeFilter } = filterSlice.actions
export default filterSlice.reducer
