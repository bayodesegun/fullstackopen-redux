import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return notification.length < 1 ? null : (
    <div style={style} id='anecdote-notification'>
      {notification}
    </div>
  )
}

export default Notification
