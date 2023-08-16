import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import "./App.css";
import Home from "./components/Home";
import Test from "./components/Test";
import ResponsiveAppBar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile.jsx";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Favorites from "./components/favorites";
// import Parallax from "./components/Parallax";
function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <ResponsiveAppBar />
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/Signup" element={<Signup />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/test" element={<Test />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/favorites" element={<Favorites />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
export default App;
