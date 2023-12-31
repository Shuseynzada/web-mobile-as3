import { Route, Routes } from 'react-router-dom'
import './App.css'
import { ContactPage, Container, Home, Layout } from './components'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='cards' element={<Container />} />
          <Route path='contact' element={<ContactPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
