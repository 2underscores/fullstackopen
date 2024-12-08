import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

export const list = async () => {
    const resp = await axios.get(baseUrl)
    return resp.data
}

export const create = async (anecdote) => {
    const resp = await axios.post(baseUrl, anecdote)
    return resp.data
}

const _update = async (anecdote) => {
    const resp = await axios.patch(`${baseUrl}/${anecdote.id}`, anecdote)
    return resp.data
}

export const setVotes = async (id, totalVotes) => {
    const resp = await _update({id, votes: totalVotes})
    return resp.data
}