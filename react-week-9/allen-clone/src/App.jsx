import Courses from "./components/Courses"
import Landing from "./components/Landing"
import Navbar from "./components/Navbar"
import { BrowserRouter as Router , Routes , Route } from "react-router-dom"
import TestSeries from "./components/TestSeries"
import Scholarships from "./components/Scholarships"
import Resuls from "./components/Resuls"
import StudyMaterials from "./components/StudyMaterials"
import AboutUs from "./components/AboutUs"
import TalkToUs from "./components/TalkToUs"
import Login from "./components/Login"

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/test-series" element={<TestSeries />} />
      <Route path="/scholarships" element={<Scholarships />} />
      <Route path="/results" element={<Resuls />} />
      <Route path="/study-materials" element={<StudyMaterials />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/talk-to-us" element={<TalkToUs />} />
      <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
