import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navItems } from "../utils/navitems";
import logoIQ from "../assets/logoIQ.png";

import {
  House,
  Mic,
  LayoutDashboard,
  History,
  User,
  LogOut,
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  const iconMap = {
    Home: House,
    "New Interview": Mic,
    Dashboard: LayoutDashboard,
    History: History,
    Profile: User,
  };

  return (
    <aside className="h-full w-full bg-white border-r border-slate-200 flex flex-col justify-between px-4 py-6 shadow-lg">
      <div>
        <div className="relative flex items-center justify-center gap-3 pb-6 mb-6 border-b border-slate-100">
          <div className="absolute left-1/2 top-1/2 -z-10 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/60 blur-2xl" />
          <img
            src={logoIQ}
            alt="AI Interview IQ"
            className="h-11 w-11 object-contain"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-medium text-slate-500">
              AI Interview
            </span>
            <span className="text-2xl font-extrabold tracking-tight text-[#2976DD]">
              IQ
            </span>
          </div>
        </div>

        <p className="px-4 mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Menu
        </p>

        <div className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = iconMap[item.name];
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  active
                    ? "bg-[#2976DD] text-white shadow-md shadow-blue-500/30"
                    : "text-slate-600 hover:bg-blue-50 hover:text-[#2976DD] hover:translate-x-0.5"
                }`}
              >
                {Icon && (
                  <Icon
                    size={20}
                    strokeWidth={active ? 2.4 : 2}
                    className="shrink-0"
                  />
                )}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="border-t border-slate-100 pt-4">
        <button
          onClick={logout}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 font-medium text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;