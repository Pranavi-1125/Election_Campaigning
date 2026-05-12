import { useState } from "react";
import Papa from "papaparse";

import {
  Mic,
  Phone,
  PhoneOff,
  Volume2,
  Bot,
  LayoutDashboard,
  Megaphone,
  PhoneCall,
  BarChart3,
  Settings,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function App() {

  const [activePage, setActivePage] =
    useState("Dashboard");

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [darkMode, setDarkMode] =
    useState(true);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [showAdminMenu, setShowAdminMenu] =
    useState(false);

  const [toast, setToast] =
    useState("");

  const [toastType, setToastType] =
    useState("success");

  // CAMPAIGNS
  const [campaignName, setCampaignName] =
    useState("");

  const [campaignDescription, setCampaignDescription] =
    useState("");

  const [csvFile, setCsvFile] =
    useState(null);

  const [csvPreview, setCsvPreview] =
    useState([]);

  // AI
  const [isListening, setIsListening] =
    useState(false);

  const [isSpeaking, setIsSpeaking] =
    useState(false);

  const [callStarted, setCallStarted] =
    useState(false);

  // CALL FILTERS
  const [filter, setFilter] =
    useState("All");

  const [searchCall, setSearchCall] =
    useState("");

  // CALL DATA
  const callsData = [
    {
      name: "Rahul",
      status: "Completed",
      sentiment: "Positive",
      duration: "5 mins",
    },
    {
      name: "Priya",
      status: "Pending",
      sentiment: "Neutral",
      duration: "2 mins",
    },
    {
      name: "Kiran",
      status: "Failed",
      sentiment: "Negative",
      duration: "1 min",
    },
    {
      name: "Sneha",
      status: "Completed",
      sentiment: "Positive",
      duration: "6 mins",
    },
  ];

  const campaignChartData = [
    { month: "Jan", calls: 400 },
    { month: "Feb", calls: 700 },
    { month: "Mar", calls: 1000 },
    { month: "Apr", calls: 1500 },
    { month: "May", calls: 2000 },
  ];

  const pieData = [
    { name: "Positive", value: 70 },
    { name: "Neutral", value: 20 },
    { name: "Negative", value: 10 },
  ];

  const COLORS = [
    "#22d3ee",
    "#c084fc",
    "#fb7185",
  ];

  const filteredCalls = callsData.filter((call) => {

    const matchesFilter =
      filter === "All"
        ? true
        : call.status === filter;

    const matchesSearch =
      call.name
        .toLowerCase()
        .includes(searchCall.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const showToastMessage = (
    message,
    type = "success"
  ) => {

    setToast(message);
    setToastType(type);

    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  const handleCampaignStart = () => {

    if (!campaignName.trim()) {
      showToastMessage(
        "Enter Campaign Name",
        "error"
      );
      return;
    }

    if (!campaignDescription.trim()) {
      showToastMessage(
        "Enter Campaign Description",
        "error"
      );
      return;
    }

    if (!csvFile) {
      showToastMessage(
        "Upload CSV File",
        "error"
      );
      return;
    }

    showToastMessage(
      "Campaign Started Successfully",
      "success"
    );
  };

  const renderPage = () => {

    switch (activePage) {

      // DASHBOARD
      case "Dashboard":
        return (

          <div>

            <h1 className="text-6xl font-bold mb-4">
              Dashboard
            </h1>

            <p className="text-2xl text-gray-400 mb-10">
              AI Calling Campaign Overview
            </p>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-10">

              {[
                {
                  title: "Total Calls",
                  value: "12,450",
                  color: "text-cyan-400",
                },
                {
                  title: "Active Campaigns",
                  value: "8",
                  color: "text-green-400",
                },
                {
                  title: "AI Accuracy",
                  value: "92%",
                  color: "text-purple-400",
                },
                {
                  title: "Success Rate",
                  value: "87%",
                  color: "text-yellow-400",
                },
              ].map((card, index) => (

                <div
                  key={index}
                  className={`${
                    darkMode
                      ? "bg-[#202b4a]"
                      : "bg-white"
                  } p-8 rounded-3xl`}
                >

                  <p className="text-2xl text-gray-400 mb-4">
                    {card.title}
                  </p>

                  <h2 className={`text-6xl font-bold ${card.color}`}>
                    {card.value}
                  </h2>

                </div>

              ))}

            </div>

            {/* CHARTS */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

              {/* BAR CHART */}
              <div className={`${
                darkMode
                  ? "bg-[#202b4a]"
                  : "bg-white"
              } p-8 rounded-3xl`}>

                <h2 className="text-4xl font-bold mb-8">
                  Monthly Calls
                </h2>

                <div className="h-[350px]">

                  <ResponsiveContainer width="100%" height="100%">

                    <BarChart data={campaignChartData}>

                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />

                      <Bar
                        dataKey="calls"
                        fill="#22d3ee"
                        radius={[10, 10, 0, 0]}
                      />

                    </BarChart>

                  </ResponsiveContainer>

                </div>

              </div>

              {/* PIE CHART */}
              <div className={`${
                darkMode
                  ? "bg-[#202b4a]"
                  : "bg-white"
              } p-8 rounded-3xl`}>

                <h2 className="text-4xl font-bold mb-8">
                  Sentiment Analysis
                </h2>

                <div className="h-[350px]">

                  <ResponsiveContainer width="100%" height="100%">

                    <PieChart>

                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        dataKey="value"
                        label
                      >

                        {pieData.map((entry, index) => (

                          <Cell
                            key={index}
                            fill={COLORS[index]}
                          />

                        ))}

                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                </div>

              </div>

            </div>

          </div>
        );

      // CAMPAIGNS
      case "Campaigns":
        return (

          <div>

            <h1 className="text-6xl font-bold mb-8">
              Campaigns
            </h1>

            <div className={`${
              darkMode
                ? "bg-[#202b4a]"
                : "bg-white"
            } p-10 rounded-3xl`}>

              <h2 className="text-4xl font-bold mb-8">
                Create Campaign
              </h2>

              <input
                type="text"
                value={campaignName}
                onChange={(e) =>
                  setCampaignName(e.target.value)
                }
                placeholder="Campaign Name"
                className={`${
                  darkMode
                    ? "bg-[#39435f]"
                    : "bg-gray-200"
                } w-full p-5 rounded-2xl mb-6 outline-none text-xl`}
              />

              <textarea
                value={campaignDescription}
                onChange={(e) =>
                  setCampaignDescription(e.target.value)
                }
                placeholder="Campaign Description"
                className={`${
                  darkMode
                    ? "bg-[#39435f]"
                    : "bg-gray-200"
                } w-full p-5 rounded-2xl mb-6 outline-none text-xl h-40`}
              />

              <div
                className={`${
                  darkMode
                    ? "bg-[#39435f]"
                    : "bg-gray-200"
                } p-5 rounded-2xl mb-6`}
              >

                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => {

                    const file = e.target.files[0];

                    if (!file) return;

                    setCsvFile(file);

                    Papa.parse(file, {

                      header: true,

                      complete: (results) => {

                        setCsvPreview(results.data);

                        showToastMessage(
                          "CSV Uploaded Successfully",
                          "success"
                        );
                      },

                    });

                  }}
                  className="text-xl"
                />

              </div>

              {csvPreview.length > 0 && (

                <div className={`${
                  darkMode
                    ? "bg-[#39435f]"
                    : "bg-gray-200"
                } p-6 rounded-3xl mb-6 overflow-x-auto`}>

                  <h2 className="text-3xl font-bold mb-6">
                    CSV Preview
                  </h2>

                  <table className="w-full">

                    <thead>

                      <tr className="text-left border-b border-gray-600">

                        {Object.keys(csvPreview[0]).map((key) => (

                          <th
                            key={key}
                            className="pb-4 text-xl"
                          >
                            {key}
                          </th>

                        ))}

                      </tr>

                    </thead>

                    <tbody>

                      {csvPreview.slice(0, 5).map((row, index) => (

                        <tr
                          key={index}
                          className="border-b border-gray-700"
                        >

                          {Object.values(row).map((value, i) => (

                            <td
                              key={i}
                              className="py-4 text-lg"
                            >
                              {value}
                            </td>

                          ))}

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              )}

              <button
                onClick={handleCampaignStart}
                className="bg-cyan-500 px-8 py-4 rounded-2xl text-xl"
              >
                Start Campaign
              </button>

            </div>

          </div>
        );

      // CALLS
      case "Calls":
        return (

          <div>

            <h1 className="text-6xl font-bold mb-8">
              Calls
            </h1>

            <div className="flex gap-5 mb-8 flex-wrap">

              <select
                value={filter}
                onChange={(e) =>
                  setFilter(e.target.value)
                }
                className={`${
                  darkMode
                    ? "bg-[#202b4a]"
                    : "bg-white"
                } p-4 rounded-2xl text-xl outline-none`}
              >

                <option>All</option>
                <option>Completed</option>
                <option>Pending</option>
                <option>Failed</option>

              </select>

              <input
                type="text"
                value={searchCall}
                onChange={(e) =>
                  setSearchCall(e.target.value)
                }
                placeholder="Search Caller..."
                className={`${
                  darkMode
                    ? "bg-[#202b4a]"
                    : "bg-white"
                } p-4 rounded-2xl outline-none text-xl flex-1`}
              />

            </div>

            <div className={`${
              darkMode
                ? "bg-[#202b4a]"
                : "bg-white"
            } p-8 rounded-3xl overflow-x-auto`}>

              <table className="w-full">

                <thead>

                  <tr className="text-left text-2xl border-b border-gray-600">

                    <th className="pb-5">Caller</th>
                    <th className="pb-5">Status</th>
                    <th className="pb-5">Sentiment</th>
                    <th className="pb-5">Duration</th>

                  </tr>

                </thead>

                <tbody>

                  {filteredCalls.map((call, index) => (

                    <tr
                      key={index}
                      className="border-b border-gray-700"
                    >

                      <td className="py-6 text-xl">
                        {call.name}
                      </td>

                      <td className="py-6">

                        <span className={`px-4 py-2 rounded-full text-lg
                        
                        ${
                          call.status === "Completed"
                            ? "bg-green-500"
                            : call.status === "Pending"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}>

                          {call.status}

                        </span>

                      </td>

                      <td className="py-6 text-xl">
                        {call.sentiment}
                      </td>

                      <td className="py-6 text-xl">
                        {call.duration}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>
        );

      // ANALYTICS
      case "Analytics":
        return (

          <div>

            <h1 className="text-6xl font-bold mb-10">
              Analytics
            </h1>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

              <div className={`${
                darkMode
                  ? "bg-[#202b4a]"
                  : "bg-white"
              } p-8 rounded-3xl`}>

                <h2 className="text-4xl font-bold mb-8">
                  Campaign Performance
                </h2>

                <div className="h-[350px]">

                  <ResponsiveContainer width="100%" height="100%">

                    <BarChart data={campaignChartData}>

                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />

                      <Bar
                        dataKey="calls"
                        fill="#22d3ee"
                        radius={[10, 10, 0, 0]}
                      />

                    </BarChart>

                  </ResponsiveContainer>

                </div>

              </div>

              <div className={`${
                darkMode
                  ? "bg-[#202b4a]"
                  : "bg-white"
              } p-8 rounded-3xl`}>

                <h2 className="text-4xl font-bold mb-8">
                  Sentiment Analysis
                </h2>

                <div className="h-[350px]">

                  <ResponsiveContainer width="100%" height="100%">

                    <PieChart>

                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        dataKey="value"
                        label
                      >

                        {pieData.map((entry, index) => (

                          <Cell
                            key={index}
                            fill={COLORS[index]}
                          />

                        ))}

                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                </div>

              </div>

            </div>

          </div>
        );

      // AI AGENT
      case "AI Agent":
        return (

          <div>

            <h1 className="text-6xl font-bold mb-10">
              AI Agent
            </h1>

            {/* CONTROLS */}
            <div className="flex flex-wrap gap-6 mb-10">

              <button
                onClick={() => {

                  setCallStarted(true);
                  setIsListening(true);
                  setIsSpeaking(true);

                  showToastMessage(
                    "AI Call Started",
                    "success"
                  );

                }}
                className="bg-green-500 px-8 py-4 rounded-2xl text-2xl flex items-center gap-3"
              >

                <Phone size={28} />

                Start Call

              </button>

              <button
                onClick={() => {

                  setCallStarted(false);
                  setIsListening(false);
                  setIsSpeaking(false);

                  showToastMessage(
                    "AI Call Ended",
                    "error"
                  );

                }}
                className="bg-red-500 px-8 py-4 rounded-2xl text-2xl flex items-center gap-3"
              >

                <PhoneOff size={28} />

                End Call

              </button>

              <button
                onClick={() =>
                  setIsListening(!isListening)
                }
                className={`px-8 py-4 rounded-2xl text-2xl flex items-center gap-3
                
                ${
                  isListening
                    ? "bg-cyan-500"
                    : "bg-gray-500"
                }`}
              >

                <Mic size={28} />

                {isListening
                  ? "Mic ON"
                  : "Mic OFF"}

              </button>

            </div>

            {/* STATUS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-10">

              {/* LISTENING */}
              <div className={`${
                darkMode
                  ? "bg-[#202b4a]"
                  : "bg-white"
              } p-8 rounded-3xl`}>

                <div className="flex items-center gap-5 mb-5">

                  <div className={`p-5 rounded-full
                    
                    ${
                      isListening
                        ? "bg-cyan-500 animate-pulse"
                        : "bg-gray-500"
                    }`}>

                    <Mic size={40} />

                  </div>

                  <div>

                    <h2 className="text-3xl font-bold">
                      Listening
                    </h2>

                    <p className="text-xl text-gray-400">
                      Voice Input Active
                    </p>

                  </div>

                </div>

                <p className="text-2xl">

                  {isListening
                    ? "Microphone Active"
                    : "Microphone Off"}

                </p>

              </div>

              {/* SPEAKING */}
              <div className={`${
                darkMode
                  ? "bg-[#202b4a]"
                  : "bg-white"
              } p-8 rounded-3xl`}>

                <div className="flex items-center gap-5 mb-5">

                  <div className={`p-5 rounded-full
                    
                    ${
                      isSpeaking
                        ? "bg-purple-500 animate-bounce"
                        : "bg-gray-500"
                    }`}>

                    <Volume2 size={40} />

                  </div>

                  <div>

                    <h2 className="text-3xl font-bold">
                      AI Speaking
                    </h2>

                    <p className="text-xl text-gray-400">
                      Text To Speech
                    </p>

                  </div>

                </div>

                <p className="text-2xl">

                  {isSpeaking
                    ? "AI Speaking..."
                    : "AI Silent"}

                </p>

              </div>

              {/* STATUS */}
              <div className={`${
                darkMode
                  ? "bg-[#202b4a]"
                  : "bg-white"
              } p-8 rounded-3xl`}>

                <div className="flex items-center gap-5 mb-5">

                  <div className={`p-5 rounded-full
                    
                    ${
                      callStarted
                        ? "bg-green-500 animate-pulse"
                        : "bg-gray-500"
                    }`}>

                    <Bot size={40} />

                  </div>

                  <div>

                    <h2 className="text-3xl font-bold">
                      Agent Status
                    </h2>

                    <p className="text-xl text-gray-400">
                      AI Call State
                    </p>

                  </div>

                </div>

                <p className="text-2xl">

                  {callStarted
                    ? "Call Running"
                    : "Waiting"}

                </p>

              </div>

            </div>

            {/* CONVERSATION */}
            <div className={`${
              darkMode
                ? "bg-[#202b4a]"
                : "bg-white"
            } p-10 rounded-3xl`}>

              <h2 className="text-4xl font-bold mb-8">
                Live Conversation
              </h2>

              <div className="space-y-6">

                <div className="bg-cyan-500/20 p-5 rounded-2xl">

                  <p className="text-cyan-400 text-xl mb-2">
                    AI Agent
                  </p>

                  <p className="text-2xl">
                    Hello! We are calling regarding
                    the upcoming election campaign.
                  </p>

                </div>

                <div className="bg-purple-500/20 p-5 rounded-2xl">

                  <p className="text-purple-400 text-xl mb-2">
                    User
                  </p>

                  <p className="text-2xl">
                    Yes, tell me more about it.
                  </p>

                </div>

                <div className="bg-cyan-500/20 p-5 rounded-2xl">

                  <p className="text-cyan-400 text-xl mb-2">
                    AI Agent
                  </p>

                  <p className="text-2xl">
                    Our candidate focuses on youth
                    development and digital growth.
                  </p>

                </div>

              </div>

            </div>

          </div>
        );

      // SETTINGS
      case "Settings":
        return (

          <div>

            <h1 className="text-6xl font-bold mb-8">
              Settings
            </h1>

            <div className={`${
              darkMode
                ? "bg-[#202b4a]"
                : "bg-white"
            } p-10 rounded-3xl space-y-6`}>

              <div className="flex justify-between items-center">

                <p className="text-2xl">
                  Enable AI Calls
                </p>

                <button className="bg-cyan-500 px-6 py-3 rounded-2xl">
                  ON
                </button>

              </div>

              <div className="flex justify-between items-center">

                <p className="text-2xl">
                  Notification Alerts
                </p>

                <button className="bg-purple-500 px-6 py-3 rounded-2xl">
                  ENABLED
                </button>

              </div>

            </div>

          </div>
        );

      default:
        return null;
    }
  };

  return (

    <div className={`flex min-h-screen relative transition-all duration-300

    ${
      darkMode
        ? "bg-[#020c36] text-white"
        : "bg-gray-100 text-black"
    }`}>

      {/* MOBILE MENU */}
      <button
        onClick={() =>
          setSidebarOpen(!sidebarOpen)
        }
        className="fixed top-6 left-6 z-50 bg-cyan-500 p-4 rounded-2xl lg:hidden"
      >

        {sidebarOpen
          ? <X size={30} />
          : <Menu size={30} />}

      </button>

      {/* SIDEBAR */}
      <div className={`fixed lg:static top-0 left-0 h-full w-80 p-8 z-40 transition-all duration-300

      ${
        darkMode
          ? "bg-[#28324d]"
          : "bg-white"
      }

      ${
        sidebarOpen
          ? "translate-x-0"
          : "-translate-x-full lg:translate-x-0"
      }`}>

        <div className="mb-16">

          <h1 className="text-5xl font-bold mb-3">
            AI Dashboard
          </h1>

          <p className="text-gray-400 text-lg">
            Campaign Calling System
          </p>

        </div>

        <div className="space-y-6">

          {[
            {
              name: "Dashboard",
              icon: <LayoutDashboard size={28} />,
            },
            {
              name: "Campaigns",
              icon: <Megaphone size={28} />,
            },
            {
              name: "Calls",
              icon: <PhoneCall size={28} />,
            },
            {
              name: "Analytics",
              icon: <BarChart3 size={28} />,
            },
            {
              name: "AI Agent",
              icon: <Bot size={28} />,
            },
            {
              name: "Settings",
              icon: <Settings size={28} />,
            },
          ].map((item) => (

            <button
              key={item.name}
              onClick={() =>
                setActivePage(item.name)
              }
              className={`w-full p-6 rounded-3xl text-left text-2xl transition flex items-center gap-4
              
              ${
                activePage === item.name
                  ? "bg-cyan-500 shadow-[0_0_25px_#22d3ee]"
                  : `${darkMode ? "bg-[#39435f]" : "bg-gray-200"} hover:scale-105`
              }`}
            >

              {item.icon}

              {item.name}

            </button>

          ))}

        </div>

      </div>

      {/* MAIN */}
      <div className="flex-1 p-6 lg:p-12">

        {/* TOAST */}
        {toast && (

          <div className={`fixed top-8 right-8 px-8 py-5 rounded-2xl shadow-2xl z-50 text-xl
          
          ${
            toastType === "success"
              ? "bg-green-500"
              : "bg-red-500"
          }`}>

            {toast}

          </div>

        )}

        {/* TOPBAR */}
        <div className="flex justify-end gap-4 mb-10 relative flex-wrap">

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className={`${
              darkMode
                ? "bg-[#202b4a]"
                : "bg-white"
            } px-5 py-4 rounded-2xl`}
          >

            {darkMode
              ? <Sun size={25} />
              : <Moon size={25} />}

          </button>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            placeholder="Search..."
            className={`${
              darkMode
                ? "bg-[#202b4a]"
                : "bg-white"
            } px-6 py-4 rounded-2xl outline-none text-xl`}
          />

          {/* NOTIFICATIONS */}
          <div className="relative">

            <button
              onClick={() =>
                setShowNotifications(!showNotifications)
              }
              className={`${
                darkMode
                  ? "bg-[#202b4a]"
                  : "bg-white"
              } px-6 py-4 rounded-2xl`}
            >
              🔔
            </button>

            {showNotifications && (

              <div className={`${
                darkMode
                  ? "bg-[#202b4a]"
                  : "bg-white"
              } absolute right-0 mt-4 w-96 rounded-3xl p-6 shadow-2xl z-50`}>

                <h2 className="text-3xl font-bold mb-6">
                  Notifications
                </h2>

                <div className="space-y-4">

                  <div className={`${
                    darkMode
                      ? "bg-[#39435f]"
                      : "bg-gray-200"
                  } p-4 rounded-2xl text-lg`}>
                    Campaign uploaded successfully
                  </div>

                  <div className={`${
                    darkMode
                      ? "bg-[#39435f]"
                      : "bg-gray-200"
                  } p-4 rounded-2xl text-lg`}>
                    AI completed 240 calls
                  </div>

                </div>

              </div>

            )}

          </div>

          {/* ADMIN */}
          <div className="relative">

            <button
              onClick={() =>
                setShowAdminMenu(!showAdminMenu)
              }
              className="bg-gradient-to-r from-cyan-400 to-purple-500 px-8 py-4 rounded-2xl text-xl"
            >
              Admin
            </button>

            {showAdminMenu && (

              <div className={`${
                darkMode
                  ? "bg-[#202b4a]"
                  : "bg-white"
              } absolute right-0 mt-4 w-64 rounded-3xl p-4 shadow-2xl z-50`}>

                <div className="space-y-3">

                  <button className={`${
                    darkMode
                      ? "bg-[#39435f]"
                      : "bg-gray-200"
                  } w-full p-4 rounded-2xl text-left text-lg`}>
                    Profile
                  </button>

                  <button
                    className="w-full bg-red-500 p-4 rounded-2xl text-left text-lg"
                  >
                    Logout
                  </button>

                </div>

              </div>

            )}

          </div>

        </div>

        {renderPage()}

      </div>

    </div>
  );
}

export default App;