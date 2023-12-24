import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'


const mainStore = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    searchFilter: filterReducer,
    notification: notificationReducer
  }
})

export const anecdoteStore = configureStore({ reducer: anecdoteReducer })
export const filterStore = configureStore({ reducer: filterReducer })
export const notificationStore = configureStore({ reducer: notificationReducer })

export default mainStore
