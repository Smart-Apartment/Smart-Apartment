import { Register } from "./screens/Register";
import { HomeScreen } from "./screens/HomeScreen"; 
import { LoginScreen } from "./screens/LoginScreen";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
function App() {
  return (
    <>
      
    <Router>
      <div>
      <Routes>
          <Route path="/" element={<HomeScreen/>}/>
          <Route path="/login" element={<LoginScreen/>} />
          <Route path="/register" element={<Register/>} />
      </Routes>
      </div>
    </Router>
      
    </>
  );
}

export default App;
