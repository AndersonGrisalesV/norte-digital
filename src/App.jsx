import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<p>Not found!</p>} />
    </Routes>
  );
}

export default App;
