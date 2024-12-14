import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as anecdoteRequests from '../requests/anecdotes'
import { useNotificationPush } from '../contexts/notifications'

const Anecdote = ({ anecdote }) => {
    const queryClient = useQueryClient()
    const pushNotification = useNotificationPush()
    const voteMutation = useMutation({
        mutationFn: (anecdote) => anecdoteRequests.setVotes(anecdote.id, anecdote.votes+1),
        onSuccess: (data, vars, ctx,) => {
            console.log({data, vars, ctx});
            pushNotification(`Voted for "${vars.content}"`)
            queryClient.invalidateQueries(['anecdotes'])
        }
    })

    const handleVote = (anecdote) => {
        console.log('vote')
        voteMutation.mutate(anecdote)
    }

    return (
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
        </div>
    )

}


const Anecdotes = () => {

    const resultAnecdotes = useQuery({
        queryKey: ['anecdotes'],
        queryFn: async () => {
            console.log('Fetching anecdotes list');
            return anecdoteRequests.list()
        },
        refetchOnWindowFocus: false,
        select: (anecdotes) => [...anecdotes].sort((a, b) => b.votes - a.votes)
    })
    console.log({ resultAnecdotes, state: resultAnecdotes.status, count: resultAnecdotes.data?.length });

    if (resultAnecdotes.status === 'error') {
        return (<div>Anecdote service unavailable, no server response.</div>)
    }

    return (
        <>
            {resultAnecdotes.status === 'pending' && <div>Loading from server...</div>}
            {resultAnecdotes.status === 'success' && resultAnecdotes.data.map(
                anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} />
            )}
        </>
    )
}

export default Anecdotes
