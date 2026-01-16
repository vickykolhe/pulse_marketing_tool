import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  LayoutDashboard,
  Users,
  UserPlus,
  Mail,
  Send,
} from "lucide-react";

const AppLayout = ({ children }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-white">
      {/* SIDEBAR */}
      <aside
        className={`bg-white-50 border-r border-gray-200 transition-all duration-300
        ${open ? "w-64" : "w-16"} flex flex-col`}
      >
        {/* HEADER */}
        <div className="relative flex h-20 items-center px-4 mb-8">
          {open && (
            <span className="text-3xl font-semibold text-gray-800 tracking-tight">
              Pulse
            </span>
          )}

          <button
            onClick={() => setOpen(!open)}
            className="absolute right-3 rounded-lg p-2 text-gray-600 hover:bg-gray-100 transition"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 space-y-1 px-2 py-4">
          <SidebarLink
            to="/"
            label="Dashboard"
            icon={LayoutDashboard}
            open={open}
            end
          />
          <SidebarLink
            to="/subscribers/add"
            label="Add Subscriber"
            icon={UserPlus}
            open={open}
            end
          />
          <SidebarLink
            to="/subscribers"
            label="Subscribers"
            icon={Users}
            open={open}
            end
          />
          <SidebarLink
            to="/campaigns/new"
            label="Campaign Editor"
            icon={Mail}
            open={open}
            
          />
          <SidebarLink
            to="/campaigns"
            label="Campaigns"
            icon={Send}
            open={open}
            end
          />
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-auto p-6">
        {children}
      </main>
    </div>
  );
};

const SidebarLink = ({ to, icon: Icon, label, open, end = false }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `
        group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium
        transition-all
        ${
          isActive
            ? "bg-gray-300 text-gray-900"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }
        ${!open && "justify-center"}
        `
      }
    >
      <Icon size={20} className="shrink-0" />
      {open && <span>{label}</span>}
    </NavLink>
  );
};

export default AppLayout;
