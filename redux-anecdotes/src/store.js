import { createStore } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'


const mainStore = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer
  }
})

export const anecdoteStore = createStore(anecdoteReducer)
export const filterStore = createStore(filterReducer)

export default mainStore
