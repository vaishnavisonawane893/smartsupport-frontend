import { NavLink } from "react-router-dom";
import {
  Squares2X2Icon,
  UsersIcon,
  TicketIcon,
  ChartBarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const menu = [
    {
      id: 1,
      name: "Dashboard",
      icon: <Squares2X2Icon className="h-6" />,
      to: "/admin",
      exact: true,
    },
    {
      id: 2,
      name: "Staff",
      icon: <UsersIcon className="h-6" />,
      to: "/admin/staff",
    },
    {
      id: 3,
      name: "Users",
      icon: <UserGroupIcon className="h-6" />,
      to: "/admin/users",
    },
    {
      id: 4,
      name: "Tickets",
      icon: <TicketIcon className="h-6" />,
      to: "/admin/tickets",
    },
    {
      id: 5,
      name: "Reports",
      icon: <ChartBarIcon className="h-6" />,
      to: "/admin/reports",
    },
  ];

  return (
    <div className="w-64 bg-slate-800/50 backdrop-blur-xl border-r border-white/10 p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-6 text-cyan-400">SmartSupport</h1>

      <div className="space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.id}
            to={item.to}
            end={item.exact ? true : false}
            className={({ isActive }) =>
              `
              relative flex items-center gap-3 p-3 rounded-xl font-medium transition-all
              ${
                isActive
                  ? "bg-slate-700/60 text-cyan-400 shadow-lg"
                  : "text-gray-300 hover:bg-slate-700/40 hover:text-white"
              }
              `
            }
          >
            {({ isActive }) =>
              isActive && (
                <span className="absolute left-0 top-0 h-full w-[4px] bg-cyan-400 rounded-r-lg"></span>
              )
            }

            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>

      <button className="mt-auto flex items-center gap-3 p-3 text-red-400 hover:text-white hover:bg-red-500/20 transition rounded-xl">
        <NavLink to="/logout" className="flex items-center gap-3 w-full h-full">
          🚪 Logout
        </NavLink>
      </button>
    </div>
  );
};

export default Sidebar;
