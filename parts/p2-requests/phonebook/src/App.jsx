import { useState, useEffect } from 'react'
import Contacts from './components/Contacts';
import AddContact from './components/AddContact';
import contactService from './services/contacts';
import Notification from './components/Notification';

const App = () => {

  useEffect(() => {
    console.log('Fetching contacts');
    contactService.list().
    then((contacts)=>{
      console.log(`Fetched contacts:`, contacts)
      setContacts(contacts)
    })
  }, [])
  const [contacts, setContacts] = useState([{id: 'h923mda9', name: 'JSON SERVER IS NOT STARTED, run `npm run jserver`', number: '000'}])
  const [newContact, setNewContact] = useState({ name: '', number: '' })
  const [errorMsg, setErrorMsg] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)

  return (
    <>
      <h1>Phonebook</h1>
      <AddContact newContact={newContact} setNewContact={setNewContact} contacts={contacts} setContacts={setContacts} setErrorMsg={setErrorMsg} setSuccessMsg={setSuccessMsg}/>
      <h1>Numbers</h1>
      <Contacts contacts={contacts} setContacts={setContacts} setErrorMsg={setErrorMsg} setSuccessMsg={setSuccessMsg} />
      <Notification msg={errorMsg} lvl='error'/>
      <Notification msg={successMsg} lvl='success'/>
    </>
  )
}

export default App
