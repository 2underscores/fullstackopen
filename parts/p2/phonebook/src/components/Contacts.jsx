import { useState } from 'react'
import contactService from '../services/contacts'

const Contact = (props) => {
    const { contact: c, deleteHandler } = props
    return (
        <div>{c.name} - {c.number} <button onClick={deleteHandler}>delete</button></div>
    )
}

const Contacts = (props) => {
    const { contacts, setContacts, setSuccessMsg, setErrorMsg } = props
    const [filter, setFilter] = useState('')

    const deleteContact = (id) => {
        const contact = contacts.find((c) => c.id === id)
        if (!confirm(`Are you sure you want to delete ${contact.name}?`)) {
            return
        }
        contactService.remove(id)
            .then((data) => {
                console.log(`Deleted contact`, data);
                setContacts(contacts.filter((c) => c.id !== id))
                setSuccessMsg(`Deleted contact for ${data.name}`)
                setTimeout(()=>{setSuccessMsg(null)}, 2000)
            })
            .catch((err)=>{
                setErrorMsg(`Delete Failed, user "${contact.name}" does not exist`)
                setContacts(contacts.filter((c)=>c.id!==contact.id))
                setTimeout(()=>{setErrorMsg(null)}, 5000)
            })
    }

    return (
        <>
            <div>Filter: <input value={filter} onChange={() => { setFilter(event.target.value) }}></input></div>
            <ul>
                {contacts
                    .filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))
                    .map(c => <Contact key={c.id} contact={c} deleteHandler={() => { deleteContact(c.id) }} />)}
            </ul>
        </>
    )
}

export default Contacts