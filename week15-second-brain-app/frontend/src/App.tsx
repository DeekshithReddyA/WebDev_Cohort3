import { Dashboard } from "./components/pages/Dashboard";
import { SharedBrain } from "./components/pages/SharedBrain";
import { Signin } from "./components/pages/Signin";
import { Signup } from "./components/pages/Signup";
import { BrowserRouter as Router , Routes , Route  } from "react-router-dom";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/brain/:id" element={<SharedBrain />} />
      </Routes>
    </Router>
  )
}

export default App
