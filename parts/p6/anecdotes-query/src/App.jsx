import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/Anecdotes'
import Notifications from './components/Notifications'

const App = () => {
  return (
    <div>
      <h3>Anecdote app</h3>
      <AnecdoteForm />
      <Anecdotes/>
      <Notifications/>
    </div>
  )
}

export default App
