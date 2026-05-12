import {
  LayoutDashboard,
  Megaphone,
  Phone,
  BarChart3,
  Bot,
  Settings,
} from "lucide-react";

function Sidebar({
  activePage,
  setActivePage,
}) {

  const menus = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={22} />,
    },
    {
      title: "Campaigns",
      icon: <Megaphone size={22} />,
    },
    {
      title: "Calls",
      icon: <Phone size={22} />,
    },
    {
      title: "Analytics",
      icon: <BarChart3 size={22} />,
    },
    {
      title: "AI Agent",
      icon: <Bot size={22} />,
    },
    {
      title: "Settings",
      icon: <Settings size={22} />,
    },
  ];

  return (
    <div className="w-[320px] bg-white/10 backdrop-blur-lg border-r border-white/10 p-6">

      <h1 className="text-5xl font-bold mb-10 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        AI Dashboard
      </h1>

      <div className="flex flex-col gap-5">

        {menus.map((menu, index) => (

          <div
            key={index}
            onClick={() =>
              setActivePage(menu.title)
            }
            className={`flex items-center gap-4 p-5 rounded-3xl cursor-pointer transition-all duration-300 shadow-lg ${
              activePage === menu.title
                ? "bg-gradient-to-r from-purple-600 to-cyan-500 scale-105"
                : "bg-white/5 hover:bg-white/10"
            }`}
          >

            {menu.icon}

            <span className="text-xl font-semibold">
              {menu.title}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Sidebar;