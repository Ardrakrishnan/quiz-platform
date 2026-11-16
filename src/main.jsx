import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import App from './App'
import { store } from './redux/store'
import './styles.css'

const theme = createTheme({
  palette: {
    primary: { main: '#1769ff' },
    secondary: { main: '#13b89a' },
    background: { default: '#f4f6fa', paper: '#ffffff' },
    text: { primary: '#172033', secondary: '#667085' }
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    button: { textTransform: 'none', fontWeight: 650 }
  },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 9, paddingInline: 18 } } },
    MuiPaper: { styleOverrides: { rounded: { borderRadius: 14 } } }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
