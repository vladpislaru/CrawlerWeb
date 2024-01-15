import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { AuthProvider } from './Utils/AuthSession'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    <AuthProvider>
            <App></App>
        </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
