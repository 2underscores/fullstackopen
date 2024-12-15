import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK } from '../utils/queries'
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack
} from '@mui/material';

const NewBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [createBook, createBookResult] = useMutation(ADD_BOOK)

  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...')
    createBook({ variables: { title, author, published: parseInt(published), genres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <Box component="form" onSubmit={submit} sx={{ maxWidth: 400 }}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />

        <TextField
          fullWidth
          label="Author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />

        <TextField
          fullWidth
          label="Published"
          type="number"
          value={published}
          onChange={({ target }) => setPublished(target.value)}
        />

        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            label="Genre"
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <Button
            variant="contained"
            onClick={addGenre}
          >
            Add Genre
          </Button>
        </Stack>

        <Typography>
          Genres: {genres.join(' ')}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={createBookResult.loading}
        >
          {createBookResult.loading ? 'Creating...' : 'Create'}
        </Button>
      </Stack>
    </Box>
  )
}

export default NewBook