import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import DisputeDetails from "./components/DisputeDetails";
import Settings from "./components/Settings";
import Billings from "./components/Billings";

function App() {
  return (
    <div className="min-h-screen bg-[#F3F4F4] p-4">
      <div className="w-full mx-auto">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dispute-details" element={<DisputeDetails />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/billings" element={<Billings />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
