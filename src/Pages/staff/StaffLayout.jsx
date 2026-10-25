import StaffSidebar from "./StaffSidebar";
import StaffTopbar from "./StaffTopbar";
import { Outlet } from "react-router-dom";

const StaffLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      <StaffSidebar />

      <div className="flex-1">
        <StaffTopbar />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StaffLayout;
