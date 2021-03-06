import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector((store) => store.notification)
  if (message === null) {
    return null
  }

  return <div className="notification">{message}</div>
}

export default Notification
