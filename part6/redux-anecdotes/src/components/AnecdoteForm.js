import { connect } from "react-redux";
import { create } from "../reducers/anecdoteReducer";
import anecdoteService from "../services/anecdoteService";

const AnecdoteForm = (props) => {

    const handleSubmit = async (event) => {
        event.preventDefault()

        const content = event.target.anecdote.value

        const newAnecdote = await anecdoteService.createAnecdote(content)
        props.create(newAnecdote)

        event.target.anecdote.value = ''
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>create new</h2>
            <div>
                <input name='anecdote' />
            </div>
            <button type='submit'>create</button>
        </form>
    );
}

export default connect(null, { create })(AnecdoteForm)