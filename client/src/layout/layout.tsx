import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#05070d] text-white">
      <Navbar />

      <main>
        <Outlet />
      </main>
    </div>
  );
}