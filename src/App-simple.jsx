import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import './index.css'

function Home() {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Portfolio DEVBYTE
        </h1>
        <p className="text-xl text-gray-600">
          This is a simple test page
        </p>
      </div>
    </div>
  )
}

function About() {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About Page
        </h1>
        <p className="text-xl text-gray-600">
          This is the about page
        </p>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <nav className="bg-white shadow-sm border-b p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">DEVBYTE</h1>
            <div className="space-x-4">
              <a href="/" className="text-blue-600 hover:underline">Home</a>
              <a href="/about" className="text-blue-600 hover:underline">About</a>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

