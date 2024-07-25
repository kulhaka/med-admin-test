import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainContainer() {
  return (
    <div className="flex font-kanit">
      <Sidebar />
      <Outlet />
    </div>
  );
}
