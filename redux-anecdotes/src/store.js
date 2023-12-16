import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'


const mainStore = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer
  }
})

export const anecdoteStore = configureStore({ reducer: anecdoteReducer })
export const filterStore = configureStore({ reducer: filterReducer })

export default mainStore
