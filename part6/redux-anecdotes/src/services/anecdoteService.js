import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}
const createAnecdote = async (content) => {
    const newObj = {
        content,
        votes: 0
    }
    const response = await axios.post(baseUrl, newObj)
    return response.data
}
const update = async (newObj) => {
    const response = await axios.put(`${baseUrl}/${newObj.id}`, newObj)
    return response.data
}

export const anecdoteService = {
    getAll,
    createAnecdote,
    update
}

export default anecdoteService