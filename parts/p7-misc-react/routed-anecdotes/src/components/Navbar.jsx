import { Link as RouterLink } from 'react-router';
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
} from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box className="flex gap-2">
            <Button
              component={RouterLink}
              to="/"
              color="inherit"
            >
              Anecdotes
            </Button>
            
            <Button
              component={RouterLink}
              to="/add-anecdote"
              color="inherit"
            >
              Create
            </Button>
            
            <Button
              component={RouterLink}
              to="/about"
              color="inherit"
            >
              About
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;