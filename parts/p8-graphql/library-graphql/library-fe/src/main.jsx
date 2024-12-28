import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./auth/AuthContext.jsx";
import { BrowserRouter } from "react-router";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { createTheme, ThemeProvider } from '@mui/material';
import { orange } from '@mui/material/colors';


const theme = createTheme({
  palette: {
    primary: {
      light: orange[300],
      main: orange[500],
      dark: orange[700],
      contrastText: '#fff',
    },
  },
});

// Slow loading of the page
const client = new ApolloClient({ uri: "http://localhost:4000", cache: new InMemoryCache() });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
