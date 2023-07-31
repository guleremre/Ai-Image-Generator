import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Login2 from "./components/Login2";
import Signup2 from "./components/Signup2";
import Home from "./components/Home";
import Test from "./components/Test";
import ResponsiveAppBar from "./components/Navbar";
import NotFound from "./components/NotFound";
import { BrowserRouter } from "react-router-dom";
import Profile from "./components/Profile";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UploadWidget from "./components/UploadWidget";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <ResponsiveAppBar />
          <Routes>
            <Route path="/Login2" element={<Login2 />}></Route>
            <Route path="/signup2" element={<Signup2 />}></Route>
            <Route path="/" element={<Login />}></Route>
            <Route path="/Signup" element={<Signup />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/test" element={<Test />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="*" element={<NotFound />}></Route>
            <Route path="/widget" element={<UploadWidget />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
export default App;
