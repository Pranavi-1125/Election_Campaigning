import { Bell, Search, User } from "lucide-react";
import { useState } from "react";

function Topbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [search, setSearch] = useState("");

  const notifications = [
    "Campaign completed successfully",
    "240 AI calls completed",
    "CSV uploaded successfully",
  ];

  return (
    <div className="flex justify-between items-center mb-8 relative">
      
      {/* LEFT */}
      <div>
        <h1 className="text-5xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-2">
          AI Calling Campaign Overview
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 relative">

        {/* SEARCH */}
        <div className="flex items-center bg-[#1e2746] px-4 py-3 rounded-2xl">
          <Search className="text-gray-400 mr-2" size={18} />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-white placeholder-gray-400"
          />
        </div>

        {/* NOTIFICATIONS */}
        <button
          onClick={() =>
            setShowNotifications(!showNotifications)
          }
          className="bg-[#1e2746] p-4 rounded-2xl hover:bg-[#2b3763] transition"
        >
          <Bell className="text-yellow-400" />
        </button>

        {/* NOTIFICATION DROPDOWN */}
        {showNotifications && (
          <div className="absolute top-20 right-24 w-80 bg-[#1e2746] rounded-2xl shadow-2xl p-4 z-50">
            <h2 className="text-white text-xl font-bold mb-4">
              Notifications
            </h2>

            <div className="space-y-3">
              {notifications.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#2b3763] p-3 rounded-xl text-white"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADMIN BUTTON */}
        <button
          onClick={() =>
            setShowAdminMenu(!showAdminMenu)
          }
          className="flex items-center gap-2 px-5 py-3 rounded-2xl 
          bg-gradient-to-r from-cyan-400 to-purple-500 
          text-white font-semibold shadow-lg"
        >
          <User size={18} />
          Admin
        </button>

        {/* ADMIN MENU */}
        {showAdminMenu && (
          <div className="absolute top-20 right-0 w-56 bg-[#1e2746] rounded-2xl shadow-2xl p-3 z-50">
            
            <button className="w-full text-left px-4 py-3 rounded-xl text-white hover:bg-[#2b3763]">
              Profile
            </button>

            <button className="w-full text-left px-4 py-3 rounded-xl text-white hover:bg-[#2b3763]">
              Settings
            </button>

            <button className="w-full text-left px-4 py-3 rounded-xl text-red-400 hover:bg-[#2b3763]">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Topbar;