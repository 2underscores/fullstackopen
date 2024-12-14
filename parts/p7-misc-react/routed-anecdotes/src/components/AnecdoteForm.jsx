import { useNavigate } from 'react-router'
import useField from '../hooks/useField'
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    Stack
} from '@mui/material';


const AnecdoteForm = ({ addNew }) => {
    const contentField = useField('text', '')
    const authorField = useField('text', '')
    const infoField = useField('text', '')
    const nav = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({ e });
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
        <Card className="w-full max-w-lg mx-auto mt-8">
            <CardContent>
                <Typography variant="h5" className="mb-4">
                    Create New Anecdote
                </Typography>

                <Box component="form" onSubmit={handleSubmit} className="space-y-4">
                    <Stack spacing={2}>
                        <TextField
                            fullWidth
                            required
                            label="Content"
                            multiline
                            rows={4}
                            placeholder="Write your blog post content here..."
                            className="mb-4"
                            {...contentField.getInputProps()}
                        />

                        <TextField
                            fullWidth
                            required
                            label="Author"
                            placeholder="Enter author name"
                            className="mb-4"
                            {...authorField.getInputProps()}
                        />

                        <TextField
                            fullWidth
                            required
                            label="URL"
                            placeholder="Enter blog post URL"
                            className="mb-6"
                            {...infoField.getInputProps()}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Submit Post
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    )
}

export default AnecdoteForm