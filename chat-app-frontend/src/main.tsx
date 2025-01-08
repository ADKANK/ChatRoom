import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router'
import AppRoutes from './config/Routes.tsx'
import { Toaster } from 'react-hot-toast'
import { ChatProvider } from './context/ChatContext.tsx'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <Toaster />
      <ChatProvider>
      <AppRoutes />
      </ChatProvider>
    </BrowserRouter>
)
