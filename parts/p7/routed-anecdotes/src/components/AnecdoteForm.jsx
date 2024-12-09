import { useNavigate } from 'react-router'
import useField from '../hooks/useField'

const AnecdoteForm = ({ addNew }) => {
    const contentField = useField('text', '')
    const authorField = useField('text', '')
    const infoField = useField('text', '')
    const nav = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        addNew({
            content: contentField.value,
            author: authorField.value,
            info: infoField.value,
            votes: 0
        })
        nav('/')
    }

    const resetForm = (e) => {
        e.preventDefault()
        contentField.reset()
        authorField.reset()
        infoField.reset()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input name='content' {...contentField.getInputProps()} />
                </div>
                <div>
                    author
                    <input name='author' {...authorField.getInputProps()} />
                </div>
                <div>
                    url for more info
                    <input name='info' {...infoField.getInputProps()} />
                </div>
                <button>create</button>
                <button onClick={resetForm}>reset</button>
            </form>
        </div>
    )
}

export default AnecdoteForm