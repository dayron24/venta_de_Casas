import './App.css'
import SubirCasa from './pages/SubirCasa/SubirCasa'
import IndexPage from './pages/Index/IndexPage'
import CoasterDetails from './pages/CoasterDetails/CoasterDetails'
import LoginPage from './pages/LoginPage/Login'
import { Routes, Route } from 'react-router-dom'


function App() {
  return (
    <div className="container">

      <Routes>
        <Route path="/" element={<IndexPage/>} />
        <Route path="/subirCasa" element={<SubirCasa />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/detalles/:_id" element={<CoasterDetails />} />
        
    
      </Routes>

    </div>
  )
}

export default App;
