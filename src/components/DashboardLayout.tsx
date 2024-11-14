import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#F3F4F4] p-4">
      <div className="w-full mx-auto">
        <Navbar />

        <Outlet />
      </div>
    </div>
  );
}
