import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Navigation from './components/Navigation';
import { Routes, Route } from "react-router";
import { Box, Container, CssBaseline } from "@mui/material";

const App = () => {
  return (<>
    <CssBaseline />
    <Navigation />
    <Container>
      <Box sx={{ py: 4 }}> {/* Add consistent padding */}
        <Routes>
          <Route path="/" element={<>
            <h1>Welcome to the Library</h1>
            <Books />
          </>} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/books" element={<Books />} />
          <Route path="/add" element={<NewBook />} />
        </Routes>
      </Box>
    </Container>
  </>
  );
};

export default App;