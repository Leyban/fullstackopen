import { useDispatch, useSelector } from "react-redux";
import { voteThisAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from '../reducers/notificationReducer'

const AnectdotesList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        if (filter === ''){
            return anecdotes
        }
        const filterRegex = new RegExp(`${filter}`)
        return anecdotes.filter(anecdote => filterRegex.test(anecdote.content))
    })
    const dispatch = useDispatch()

    const handleVote = (anecdote) => {
        dispatch(voteThisAnecdote(anecdote))

        dispatch(setNotification(`you voted for ${anecdote.content}`, 10))

    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => handleVote(anecdote)}>vote</button>
                </div>
                </div>
            )}
        </div>
    );
}
 
export default AnectdotesList;