import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Admin} from './pages/adminPage/adminPage.tsx'
import {Main} from './pages/mainPage/mainPage.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='admin' element={<Admin/>}/>
      <Route path='main' element={<Main/>}/>
    </Routes>
  </BrowserRouter>
)
