import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AstroCare from './components/Home'
import Kundali from './components/Kundali'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import KundaliPage from './components/KundaliWithPlanets'

function App() {

  return (
    <BrowserRouter>

      {/* NAVBAR */}
      <Navbar />
      <Routes>
        <Route path="/" element={<AstroCare />} />
        <Route path="/kundali" element={<KundaliPage />} />
        
        {/* <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>

      {/* FOOTER */}
      <Footer />
    </BrowserRouter>
  )
}

export default App
