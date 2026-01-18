import { Routes,Route } from "react-router-dom"
import { useState } from "react"
import Landingpage from "./components/Landingpage"
import SignIn from "./components/SignIn" // here i change
import SignUp from "./components/SignUp" // here i change
import Dashboard from "./components/Dashboard"
import PlatformAnalysis from "./components/PlatformAnalysis"
function App() {
  const [analysisData, setAnalysisData] = useState(null);
  const [platform, setPlatform] = useState("");
  return (
   <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard setAnalysisData={setAnalysisData} setPlatform={setPlatform}/>} />
      <Route path="/analysis" element={<PlatformAnalysis platform={platform} analysis={analysisData}/>}/>
    </Routes>
  )
}

export default App
