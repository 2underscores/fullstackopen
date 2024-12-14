import { useMutation, useQueryClient } from "@tanstack/react-query"
import * as anecdoteRequests from '../requests/anecdotes'
import { useNotificationPush } from "../contexts/notifications"

const AnecdoteForm = () => {
  const pushNotification = useNotificationPush()
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: (anecdote) => anecdoteRequests.create(anecdote),
    onSuccess: (anecdote, vars, ctx) => {
      console.log({anecdote, vars, ctx});
      // queryClient.invalidateQueries({queryKey: ['anecdotes']}) // Causes re-fetch
      queryClient.getQueryData(['anecdotes']) // Skip re-fetch, direct update UI. Still re-renders components using the query
      queryClient.setQueryData(['anecdotes'], (oldAnecdotes)=>[...oldAnecdotes, anecdote])
      pushNotification(`Added anecdote "${anecdote.content}"`, 2000)
    },
    onError: (err, anecdote, vars, ctx) => {
      pushNotification(`Error adding '${anecdote.content}': ${err.response.data.error}`, 2000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    const result = newAnecdoteMutation.mutate({content, votes: 0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
