import "./Notification.css"

const Notification = ({msg, lvl}) => {
    if (msg === null ) {
        return null
    }

    return (
        <div className={`notification ${lvl}`}>
            {msg}
        </div>
    )
}

export default Notification