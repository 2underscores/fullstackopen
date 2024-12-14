// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router'
import { Container } from '@mui/material'


ReactDOM.createRoot(document.getElementById('root')).render(
    <Container>
        <Router>
            <App />
        </Router>
    </Container>
)