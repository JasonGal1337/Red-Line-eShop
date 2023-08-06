import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";
import Homepage from "./homepage";
import Admin from "./admin";
import AdminMain from "./AdminMain";
import NavBar from "./components/NavBar"

function App() {
  return (
    <div className="App">
      <Router>
        <div>
        <NavBar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/main" element={<AdminMain />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;