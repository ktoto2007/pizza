import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Admin} from './pages/adminPage/adminPage.tsx'
import App from './pages/mainPage/mainPage.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='admin' element={<Admin/>}/>
    </Routes>
  </BrowserRouter>
)
