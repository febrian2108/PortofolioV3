import { BrowserRouter as Router } from 'react-router-dom'
import Navigation from './components/Navigation'
import { AppRoutes } from './routes'
import './index.css'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="pt-16">
          <AppRoutes />
        </main>
      </div>
    </Router>
  )
}

export default App

