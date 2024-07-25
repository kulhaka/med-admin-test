import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import NavMenu from "./NavMenu";
import UserIcon from "../assets/UserIcon.jsx";

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <div className="bg-neutral-100 flex flex-col items-center justify-between min-h-screen min-w-56 pt-4">
      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-col items-center gap-2">
          <UserIcon />
          {/* Hard-coded name due to no provided user API */}
          <div className="flex flex-col items-center">
            <p className="text-sm">นพ.กมลชนก ระบบแพทย์</p>
            <p className="text-xs">กระทรวงสาธารณสุข กรมควบคุมโรค</p>
          </div>
        </div>
        <div className="flex flex-col pl-6">
          <NavMenu to="/" isActive={pathname === "/"}>
            หน้าหลัก
          </NavMenu>
          <NavMenu to="/registered" isActive={pathname === "/registered"}>
            ขึ้นทะเบียนสำเร็จ
          </NavMenu>
          <NavMenu
            to="/user-management"
            isActive={pathname === "/user-management"}
          >
            User Management
          </NavMenu>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Link to="/other-services" className="text-sm">
            บริการอื่นๆ
          </Link>
          <Link to="/faq" className="text-sm">
            คำถามที่พบบ่อย
          </Link>
        </div>
        <button
          className="text-sm font-semibold w-fit"
          onClick={() => console.log("Logout function here")}
        >
          ออกจากระบบ
        </button>
      </div>
    </div>
  );
}
