import { Link } from 'react-router';
import { AppBar, Container, Toolbar, Typography, Button } from '@mui/material';

const Navigation = () => {
  const navItems = [
    { label: 'Authors', path: '/authors' },
    { label: 'Books', path: '/books' },
    { label: 'Add Book', path: '/add' }
  ];

  return (
    <AppBar position="static" elevation={0}>
      <Container>
        <Toolbar sx={{ display: 'flex' }}>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            LIBRARY
          </Typography>
          <div>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                sx={{
                  color: 'white',
                  marginLeft: '1rem',
                  '&:hover': {
                    color: 'white',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;