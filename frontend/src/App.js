import { About } from "./Pages/About";
import { Gallery } from "./Pages/Gallery";
import { Home } from "./Pages/Home";
import logo from "./logo.svg";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/tentang-kami" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
