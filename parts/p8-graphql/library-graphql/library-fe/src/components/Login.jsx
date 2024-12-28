import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../utils/queries'
import {
  Box,
  Button,
  TextField,
  Stack,
} from '@mui/material'
import { useAuthContext } from '../auth/AuthContext'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, loginResult] = useMutation(LOGIN_USER)
  const [auth, setAuth, clearAuth] = useAuthContext()
  console.log({auth})
  const submit = async (event) => {
    event.preventDefault()
    console.log({ message: 'logging in', event, username, password})
    try {
      const loginResult = await login({ 
        variables: { username, password }
      })
      console.log({loginResult});
      setAuth(loginResult.data.login.value)

    //   setUsername('')
    //   setPassword('')
      
      // You might want to handle the successful login here
      // For example, storing the token and redirecting:
      // localStorage.setItem('token', result.data.login.token)
      // navigate('/dashboard')
      
    } catch (error) {
      console.error('Login failed:', error)
      // Handle login error here
    }
  }
  return (
    <Box component="form" onSubmit={submit} sx={{ maxWidth: 400 }}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          required
          label="Username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          autoComplete="username"
        />

        <TextField
          fullWidth
          required
          label="Password"
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          autoComplete="current-password"
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loginResult.loading}
        >
          {loginResult.loading ? 'Logging in...' : 'Login'}
        </Button>
      </Stack>
    </Box>
  )
}

export default Login