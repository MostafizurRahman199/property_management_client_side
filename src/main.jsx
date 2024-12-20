import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Routes.jsx'
import AuthProvider from './Auth/AuthProvider.jsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { PropertyProvider } from './Auth/StateContext.jsx'
import { ThemeProvider } from './Auth/ThemeContext.jsx'
import { DarkModeProvider } from './Auth/DarkModeContext.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <PropertyProvider>
      <DarkModeProvider>


      <RouterProvider router={router} />
      </DarkModeProvider>
      </PropertyProvider>
    </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)


    
    



