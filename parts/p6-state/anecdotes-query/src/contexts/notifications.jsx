import { useReducer, createContext, useContext } from "react"

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return [...state, action.payload]
        case 'REMOVE':
            return state.filter(n=>n.id !== action.payload.id)
        default:
            return state
    }
}

const notifContext = createContext()

const NotificationProvider = (props) => {
    const [notifications, notifDispatcher] = useReducer(notificationReducer, [])

    const pushNotification = (message, time=5000) => {
        const id = crypto.randomUUID()
        const fullNotif = {content: message, id}
        console.log({fullNotif});
        notifDispatcher({type: 'ADD', payload: fullNotif})
        setTimeout(()=>{
            console.log(`Removing notif: ${id}`);
            notifDispatcher({type: 'REMOVE', payload: {id}})
        }, time)
    }

    return (
        <notifContext.Provider value={[notifications, pushNotification]}>
            {props.children}
        </notifContext.Provider>
    )
}

export default NotificationProvider

export const useNotificationPush = () => {
    return useContext(notifContext)[1]
}

export const useNotificationList = () => {
    return useContext(notifContext)[0]
}
