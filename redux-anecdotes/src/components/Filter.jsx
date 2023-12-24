import { useDispatch } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'


const Filter = () => {
    const dispatch = useDispatch()

    /**
     * The handleChange function prevents the default behavior of an event, retrieves the value from
     * the event target, and dispatches a changeFilter action with the retrieved value.
     */
    const handleChange = (event) => {
      event.preventDefault()
      const filter = event.target.value
      dispatch(changeFilter(filter))
    }

    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={handleChange} name="anecdote_filter" />
      </div>
    )
  }

  export default Filter
