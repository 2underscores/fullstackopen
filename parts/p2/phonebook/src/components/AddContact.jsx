import contactService from "../services/contacts";

const AddContact = (props) => {
    const { contacts, setContacts, newContact, setNewContact, setSuccessMsg, setErrorMsg } = props;

    const createContact = (event) => {
        event.preventDefault();
        const existingContact = contacts.find((c)=>c.name===newContact.name)
        if (existingContact) {
            if (!confirm(`${newContact.name} already exists, would you like to update number?`)) {
                return
            }
            contactService.update(existingContact.id, newContact)
                .then((contact)=>{
                    console.log('Updated contact:', contact)
                    const updatedContacts = contacts.map((c)=>
                        c.id !== contact.id ? c : {...c, number: contact.number
                    })
                    setContacts(updatedContacts)
                    setSuccessMsg(`Updated number for ${contact.name}`)
                })
                .catch((err)=>{
                    setErrorMsg(`Update Failed, user "${newContact.name}" does not exist`)
                    setContacts(contacts.filter((c)=>c.id!==existingContact.id))
                    setTimeout(()=>{setErrorMsg(null)}, 5000)
                })
        } else {
            contactService.create(newContact)
                .then((contact)=>{
                    console.log('Created contact:', contact)
                    setContacts(contacts.concat(contact))
                    setSuccessMsg(`Added contact for ${contact.name}`)
                })
        }
        setNewContact({ name: '', number: '' })
        setTimeout(()=>{setSuccessMsg(null)}, 2000) // Collisions in notifs and clearing
    }

    return (
        <form onSubmit={createContact}>
            <div>
                <div>
                    Name: <input value={newContact.name} onChange={() => { setNewContact({ ...newContact, name: event.target.value }) }}></input>
                </div>
                <div>
                    Number: <input value={newContact.number} onChange={() => { setNewContact({ ...newContact, number: event.target.value }) }}></input>
                </div>
            </div>
            <button type='submit'>Add</button>
        </form>
    )
}

export default AddContact