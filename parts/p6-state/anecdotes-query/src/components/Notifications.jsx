import { useNotificationList } from "../contexts/notifications"

const Notification = ({content}) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
    return (
    <div className="notification" style={style}>
      {content}
    </div>
  )
}

const Notifications = () => {
  const notifications = useNotificationList()
  return (
    <div className="notifications">
      {notifications.map(n=><Notification key={n.id} content={n.content}/>)}
    </div>
  )
}

export default Notifications
