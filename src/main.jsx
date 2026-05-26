
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/global.css'
import App from './App.jsx'

// 1. Importamos el proveedor del contexto de favoritos
import { FavoritesProvider } from './context/FavoriteContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <FavoritesProvider>
      <App />
      </FavoritesProvider>
    </BrowserRouter>

  </StrictMode>
)
