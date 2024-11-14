import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import DisputeDetails from "./components/DisputeDetails";
import Settings from "./components/Settings";
import Billings from "./components/Billings";
import LoginSignup from "./pages/LoginSignupPage";
import DashboardLayout from "./components/DashboardLayout";
import MessagesPage from "./components/Messages";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="dispute-details" element={<DisputeDetails />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="billings" element={<Billings />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
