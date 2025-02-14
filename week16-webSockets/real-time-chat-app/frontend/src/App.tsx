import './App.css'
import { Home } from './components/pages/Home';
import { Signin } from './components/pages/Signin';
import { Signup } from './components/pages/Signup';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<Signup />} /> 
        <Route path='/' element={<Signin />} /> 
        <Route path="/home" element={<Home />}/>
      </Routes>
    </Router>
  )
}

export default App
