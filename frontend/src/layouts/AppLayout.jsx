// import { useState } from "react";
// import { NavLink } from "react-router-dom";
// import {
//   Menu,
//   LayoutDashboard,
//   Users,
//   UserPlus,
//   Mail,
//   Send,
// } from "lucide-react";

// const AppLayout = ({ children }) => {
//   const [open, setOpen] = useState(true);

//   return (
//     <div className="flex min-h-screen bg-gray-100">

//       {/* SIDEBAR */}
//       <aside
//         className={`bg-white shadow-md transition-all duration-300 
//         ${open ? "w-64" : "w-16"} flex flex-col`}
//       >
//         {/* HEADER */}
//         <div className="h-16 flex items-center px-4 border-b relative">
//           {/* MENU BUTTON (always centered) */}
//           <button
//             onClick={() => setOpen(!open)}
//             className="absolute right-4 p-2 rounded hover:bg-gray-100"
//           >
//             <Menu size={20} />
//           </button>

//           {/* LOGO (only when open) */}
//           {open && (
//             <span className="text-lg font-bold text-blue-600">
//               MailDash
//             </span>
//           )}
//         </div>

//         {/* NAV */}
//         <nav className="flex-1 mt-4 space-y-1">
//           <SidebarLink to="/" label="Dashboard" icon={LayoutDashboard} open={open} end />
//           <SidebarLink to="/subscribers/add" label="Add Subscriber" icon={UserPlus} open={open} />
//           <SidebarLink to="/subscribers" label="Subscribers" icon={Users} open={open} />
//           <SidebarLink to="/campaigns/new" label="Campaign Editor" icon={Mail} open={open} />
//           <SidebarLink to="/campaigns" label="Campaigns" icon={Send} open={open} />
//         </nav>
//       </aside>

//       {/* MAIN */}
//       <main className="flex-1 p-6">
//         {children}
//       </main>
//     </div>
//   );
// };

// const SidebarLink = ({ to, icon: Icon, label, open, end = false }) => {
//   return (
//     <NavLink
//       to={to}
//       end={end}   
//       className={({ isActive }) =>
//         `flex items-center gap-3 px-4 py-3 mx-2 rounded-md
//          transition-colors duration-200
//          ${
//            isActive
//              ? "bg-blue-100 text-blue-600"
//              : "text-gray-600 hover:bg-gray-100"
//          }`
//       }
//     >
//       <Icon size={20} className="shrink-0" />
//       {open && <span className="text-sm font-medium">{label}</span>}
//     </NavLink>
//   );
// };

// export default AppLayout;


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
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside
        className={`bg-white shadow-md transition-all duration-300 flex-shrink-0
        ${open ? "w-64" : "w-16"} flex flex-col`}
      >
        {/* HEADER */}
        <div className="h-16 flex items-center px-4 border-b relative">
          {/* MENU BUTTON (always centered) */}
          <button
            onClick={() => setOpen(!open)}
            className="absolute right-4 p-2 rounded hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>

          {/* LOGO (only when open) */}
          {open && (
            <span className="text-lg font-bold text-blue-600">
              Pulse
            </span>
          )}
        </div>

        {/* NAV */}
        <nav className="flex-1 mt-4 space-y-1">
          <SidebarLink to="/" label="Dashboard" icon={LayoutDashboard} open={open} end />
          <SidebarLink to="/subscribers/add" label="Add Subscriber" icon={UserPlus} open={open} />
          <SidebarLink to="/subscribers" label="Subscribers" icon={Users} open={open} />
          <SidebarLink to="/campaigns/new" label="Campaign Editor" icon={Mail} open={open} />
          <SidebarLink to="/campaigns" label="Campaigns" icon={Send} open={open} />
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6 overflow-auto">
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
        `flex items-center gap-3 px-4 py-3 mx-2 rounded-md
         transition-colors duration-200
         ${
           isActive
             ? "bg-blue-100 text-blue-600"
             : "text-gray-600 hover:bg-gray-100"
         }`
      }
    >
      <Icon size={20} className="shrink-0" />
      {open && <span className="text-sm font-medium">{label}</span>}
    </NavLink>
  );
};

export default AppLayout;