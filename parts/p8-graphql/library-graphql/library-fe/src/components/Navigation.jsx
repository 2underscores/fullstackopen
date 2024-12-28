import { Link } from 'react-router';
import { AppBar, Container, Toolbar, Typography, Button } from '@mui/material';
import { useAuthContext } from '../auth/AuthContext';

const Navigation = () => {
  const navItems = [
    { label: 'Authors', path: '/authors', authReq: false },
    { label: 'Books', path: '/books', authReq: false },
    { label: 'Add Book', path: '/add', authReq: true },
    { label: 'Users', path: '/users', authReq: false },
  ];

  const [auth, setAuth, clearAuth] = useAuthContext()

  return (
    <AppBar position="static" elevation={0}>
      <Container>
        <Toolbar sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
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
          <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            {navItems
              .map((item) => (
                <Button
                  key={item.path}
                  component={Link} // component = change the semantic meaning while keeping the same look (Link look like button here). Avoid wrap button in Link.
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
              )).filter((element, idx)=>
                // Hide any that are auth protected if no auth
                (navItems[idx].authReq === false || auth)
              )
            }
          </div>
          <Button
            sx={{
              color: 'white',
              '&:hover': {
                color: 'white',
              },
            }}
            component={auth ? 'button' : Link}
            onClick={auth ? clearAuth : undefined}
            to={auth ? undefined : '/login'}
          >
            {auth ? `Logout ${auth.username}` : 'Login'}
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;