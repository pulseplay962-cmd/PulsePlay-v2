import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#05070d] text-white flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}