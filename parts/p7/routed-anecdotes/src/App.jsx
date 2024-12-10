import { useState } from 'react'
import { Routes, Route, useMatch } from 'react-router'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import AnecdoteForm from './components/AnecdoteForm'
import About from './components/About'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { Typography } from '@mui/material'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    },
    {
      content: 'The first 90 percent of the code accounts for the first 90 percent of the development time. The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      author: 'Tom Cargill',
      info: 'http://wiki.c2.com/?NinetyNinetyRule',
      votes: 0,
      id: 3
    },
    {
      content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      author: 'Martin Fowler',
      info: 'https://martinfowler.com/books/refactoring.html',
      votes: 0,
      id: 4
    },
    {
      content: 'Program testing can be used to show the presence of bugs, but never to show their absence!',
      author: 'Edsger W. Dijkstra',
      info: 'https://en.wikiquote.org/wiki/Edsger_W._Dijkstra',
      votes: 0,
      id: 5
    },
    {
      content: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      author: 'Brian W. Kernighan',
      info: 'https://en.wikiquote.org/wiki/Brian_Kernighan',
      votes: 0,
      id: 6
    },
    {
      content: 'Simplicity is prerequisite for reliability.',
      author: 'Edsger W. Dijkstra',
      info: 'https://www.cs.utexas.edu/users/EWD/transcriptions/EWD03xx/EWD340.html',
      votes: 0,
      id: 7
    },
    {
      content: 'There are only two hard things in Computer Science: cache invalidation and naming things.',
      author: 'Phil Karlton',
      info: 'https://martinfowler.com/bliki/TwoHardThings.html',
      votes: 0,
      id: 8
    },
    {
      content: 'Good code is its own best documentation.',
      author: 'Steve McConnell',
      info: 'https://www.goodreads.com/book/show/4845.Code_Complete',
      votes: 0,
      id: 9
    },
    {
      content: 'The best way to get a project done faster is to start sooner.',
      author: 'Jim Highsmith',
      info: 'https://www.agilealliance.org/agile101/',
      votes: 0,
      id: 10
    }
  ])

  const matchAnecdote = useMatch('/anecdotes/:id')
  const matchedUrlParamAnecdote = matchAnecdote ? anecdotes.find(a => Number(a.id) === Number(matchAnecdote.params.id)) : null
  console.log({ matchedUrlParamAnecdote });

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  // eslint-disable-next-line no-unused-vars
  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={matchedUrlParamAnecdote} />} />
        <Route path='/add-anecdote' element={<AnecdoteForm addNew={addNew} />} />
        <Route path='/about' element={<About />} />
      </Routes>
      <br />
      <Footer />
    </div>
  )
}

export default App
