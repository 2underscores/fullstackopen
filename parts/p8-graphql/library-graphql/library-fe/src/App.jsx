import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Navigation from './components/Navigation';
import { Routes, Route } from "react-router";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import Users from "./components/Users";
import Login from "./components/Login";

import { useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from "./utils/queries";

const App = () => {

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      console.log({ message: 'Websocket received Book Added', data })
      const newBook = data.data.bookAdded
      client.cache.updateQuery(
        { query: ALL_BOOKS },
        ({ allBooks }) => ({ allBooks: allBooks.concat(newBook) })
      )
    }
  })

  return (<>
    <CssBaseline />
    <Navigation />
    <Container>
      <Box sx={{ py: 4 }}> {/* Add consistent padding */}
        <Routes>
          <Route path="/" element={<>
            <Typography variant="h2" sx={{ mb: 3 }}>Welcome to the Library</Typography>
            <Typography variant="h4" sx={{ mb: 3 }}>Add Book</Typography>
            <NewBook />
            <Books />
            <Authors />
          </>} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/books" element={<Books />} />
          <Route path="/add" element={<NewBook />} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Box>
    </Container>
  </>
  );
};

export default App;