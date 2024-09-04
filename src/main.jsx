import ReactDOM from 'react-dom/client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { MessageContextProvider } from './MessageContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <MessageContextProvider>
    <QueryClientProvider client={queryClient}>
    <App />

  </QueryClientProvider>
  </MessageContextProvider>
)