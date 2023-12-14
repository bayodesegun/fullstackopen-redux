import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'


const mainReducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer
})

export const anecdoteStore = createStore(anecdoteReducer)
export const filterStore = createStore(filterReducer)

const mainStore = createStore(mainReducer)
export default mainStore
