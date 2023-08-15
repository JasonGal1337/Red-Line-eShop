import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";
import Homepage from "./homepage";
import Admin from "./admin";
import AdminMain from "./AdminMain";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Category from "./Category";
import Product from "./Product";
import Profile from "./profile";
import Cart from "./Cart";
import Search from "./Search";

function App() {

  return (
    <div className="App">
      <Router>
        <div>
        <NavBar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/main" element={<AdminMain />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart/:id" element={<Cart />} />
            <Route path="/search/:query" element={<Search />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;