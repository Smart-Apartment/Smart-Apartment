import { Register } from "./screens/Register/Register";
import { HomeScreen } from "./screens/Home/HomeScreen"; 
import { LoginScreen } from "./screens/Login/LoginScreen";
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
