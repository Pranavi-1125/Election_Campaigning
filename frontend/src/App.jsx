import { useState } from "react";
import Campaigns from "./components/campaining";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  Megaphone,
  Phone,
  BarChart3,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  Bot,
} from "lucide-react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  LineChart,
  Line,
} from "recharts";

import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";

const sentimentData = [
  { name: "Supporters", value: 65 },
  { name: "Neutral", value: 20 },
  { name: "Opposed", value: 15 },
];

const barData = [
  { name: "Jobs", value: 90 },
  { name: "Roads", value: 70 },
  { name: "Water", value: 60 },
  { name: "Education", value: 80 },
  { name: "Healthcare", value: 50 },
];

const lineData = [
  { day: "Mon", calls: 300 },
  { day: "Tue", calls: 500 },
  { day: "Wed", calls: 700 },
  { day: "Thu", calls: 600 },
  { day: "Fri", calls: 900 },
  { day: "Sat", calls: 750 },
];

const calls = [
  {
    id: 1,
    name: "Ravi Kumar",
    phone: "+91 9876543210",
    status: "Completed",
    sentiment: "Supporter",
    duration: "4m 20s",
    date: "11 May 2026",
  },
  {
    id: 2,
    name: "Priya Sharma",
    phone: "+91 9123456780",
    status: "Busy",
    sentiment: "Neutral",
    duration: "1m 10s",
    date: "10 May 2026",
  },
  {
    id: 3,
    name: "Amit Verma",
    phone: "+91 9988776655",
    status: "Completed",
    sentiment: "Opposed",
    duration: "3m 11s",
    date: "09 May 2026",
  },
];

const COLORS = ["#7C3AED", "#06B6D4", "#F43F5E"];

function Sidebar({ open, setOpen }) {
  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Campaigns",
      path: "/campaigns",
      icon: <Megaphone size={20} />,
    },
    {
      name: "Calls",
      path: "/calls",
      icon: <Phone size={20} />,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <BarChart3 size={20} />,
    },
    {
      name: "AI Agent",
      path: "/agent",
      icon: <Bot size={20} />,
   },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings size={20} />,
    },
   
  ];

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed lg:static z-50 top-0 left-0 h-screen w-72 bg-white/10 backdrop-blur-lg border-r border-white/10 p-5 transition-all duration-300 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            AI Agent
          </h1>

          <button
            className="lg:hidden"
            onClick={() => setOpen(false)}
          >
            <X />
          </button>
        </div>

        <div className="space-y-3">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-cyan-500 shadow-xl"
                    : "hover:bg-white/10"
                }`
              }
            >
              {link.icon}
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}

function Topbar({ setOpen }) {
  return (
    <div className="flex justify-between items-center p-5 border-b border-white/10 bg-white/5 backdrop-blur-lg">
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden"
          onClick={() => setOpen(true)}
        >
          <Menu />
        </button>

        <div className="hidden md:flex items-center bg-white/10 px-4 py-2 rounded-2xl w-80">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search campaigns..."
            className="bg-transparent outline-none ml-3 w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative">
          <Bell />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
        </div>

        <div className="flex items-center gap-3 bg-white/10 px-3 py-2 rounded-2xl">
          <img
            src="https://i.pravatar.cc/40"
            alt=""
            className="rounded-full"
          />
          <div>
            <p className="text-sm font-semibold">Admin</p>
            <p className="text-xs text-gray-400">
              Campaign Manager
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`bg-gradient-to-br ${color} p-[1px] rounded-3xl shadow-2xl`}
    >
      <div className="bg-[#111827]/90 rounded-3xl p-6 backdrop-blur-xl h-full">
        <p className="text-gray-400">{title}</p>

        <h1 className="text-4xl font-bold mt-3">{value}</h1>
      </div>
    </motion.div>
  );
}

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard
          title="Total Calls"
          value="12,540"
          color="from-purple-500 to-cyan-500"
        />

        <StatCard
          title="Active Campaigns"
          value="18"
          color="from-cyan-500 to-blue-500"
        />

        <StatCard
          title="Positive Sentiment"
          value="65%"
          color="from-pink-500 to-purple-500"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6">
          <h2 className="text-xl font-bold mb-6">
            Live Sentiment Analysis
          </h2>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={sentimentData}
                dataKey="value"
                outerRadius={110}
                label
              >
                {sentimentData.map((entry, index) => (
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

        <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6">
          <h2 className="text-xl font-bold mb-6">
            Top Public Issues
          </h2>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={barData}>
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />

              <Bar
                dataKey="value"
                fill="#7C3AED"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6 overflow-x-auto">
        <h2 className="text-xl font-bold mb-6">
          Recent Calls
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 text-left">
              <th className="p-4">Name</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Status</th>
              <th className="p-4">Sentiment</th>
              <th className="p-4">Duration</th>
            </tr>
          </thead>

          <tbody>
            {calls.map((call) => (
              <tr
                key={call.id}
                className="border-b border-white/5 hover:bg-white/5"
              >
                <td className="p-4">{call.name}</td>
                <td className="p-4">{call.phone}</td>
                <td className="p-4">{call.status}</td>
                <td className="p-4">{call.sentiment}</td>
                <td className="p-4">{call.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



function Calls() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
  useState("All");

  const [sentimentFilter, setSentimentFilter] =
  useState("All");

  
  const filtered = calls.filter((call) => {

  const matchesSearch = call.name
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === "All" ||
    call.status === statusFilter;

  const matchesSentiment =
    sentimentFilter === "All" ||
    call.sentiment === sentimentFilter;

  return (
    matchesSearch &&
    matchesStatus &&
    matchesSentiment
  );
});

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">
          Call History
        </h1>

        <input
          type="text"
          placeholder="Search calls..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white/10 px-4 py-3 rounded-2xl outline-none"
        />
      </div>

    <div className="flex gap-4 mb-6 flex-wrap">

  <select
    value={statusFilter}
    onChange={(e) =>
      setStatusFilter(e.target.value)
    }
    className="bg-white/10 px-4 py-3 rounded-2xl outline-none"
  >
    <option value="All">All Status</option>
    <option value="Completed">Completed</option>
    <option value="Busy">Busy</option>
  </select>

  <select
    value={sentimentFilter}
    onChange={(e) =>
      setSentimentFilter(e.target.value)
    }
    className="bg-white/10 px-4 py-3 rounded-2xl outline-none"
  >
    <option value="All">All Sentiments</option>
    <option value="Supporter">Supporter</option>
    <option value="Neutral">Neutral</option>
    <option value="Opposed">Opposed</option>
  </select>

     </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 text-left">
              <th className="p-4">Name</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Status</th>
              <th className="p-4">Sentiment</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((call) => (
              <tr
                key={call.id}
                className="border-b border-white/5 hover:bg-white/5"
              >
                <td className="p-4">{call.name}</td>
                <td className="p-4">{call.phone}</td>
                <td className="p-4">{call.status}</td>
                <td className="p-4">{call.sentiment}</td>
                <td className="p-4">{call.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Analytics() {
  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6">
          <h2 className="text-xl font-bold mb-6">
            Weekly Call Trends
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <XAxis dataKey="day" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="calls"
                stroke="#06B6D4"
                strokeWidth={4}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6">
          <h2 className="text-xl font-bold mb-6">
            Campaign Performance
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={lineData}>
              <XAxis dataKey="day" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />

              <Area
                type="monotone"
                dataKey="calls"
                stroke="#7C3AED"
                fill="#7C3AED"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <StatCard
          title="Supporters"
          value="65%"
          color="from-purple-500 to-pink-500"
        />

        <StatCard
          title="Neutral"
          value="20%"
          color="from-cyan-500 to-blue-500"
        />

        <StatCard
          title="Opposed"
          value="15%"
          color="from-red-500 to-pink-500"
        />
      </div>
    </div>
  );
}

function AgentPage() {
  const [transcript, setTranscript] = useState([
    "AI: Hello sir, how are you?",
  ]);

  const messages = [
    "User: I am good.",
    "AI: Will you support our campaign?",
    "User: Yes definitely.",
    "AI: Thank you for supporting us.",
  ];

  const simulateMessage = () => {
    setTranscript((prev) => {
      if (prev.length >= 5) return prev;

      return [...prev, messages[prev.length - 1]];
    });
  };

  return (
    <div className="space-y-6">

      <div className="grid md:grid-cols-4 gap-6">

        <StatCard
          title="Agent Status"
          value="Active"
          color="from-green-500 to-emerald-500"
        />

        <StatCard
          title="Calls Handled"
          value="1240"
          color="from-purple-500 to-cyan-500"
        />

        <StatCard
          title="Success Rate"
          value="89%"
          color="from-pink-500 to-red-500"
        />

        <StatCard
          title="AI Confidence"
          value="92%"
          color="from-cyan-500 to-blue-500"
        />

      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              Live Transcript
            </h2>

            <button
              onClick={simulateMessage}
              className="bg-gradient-to-r from-purple-600 to-cyan-500 px-5 py-2 rounded-2xl"
            >
              Simulate
            </button>
          </div>

          <div className="space-y-4">

            {transcript.map((msg, index) => (
              <div
                key={index}
                className={`p-4 rounded-2xl ${
                  msg.startsWith("AI")
                    ? "bg-purple-500/20"
                    : "bg-cyan-500/20"
                }`}
              >
                {msg}
              </div>
            ))}

          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            Agent Monitoring
          </h2>

          <div className="space-y-5">

            <div className="bg-white/10 p-5 rounded-2xl">
              <p className="text-gray-400">
                Current Call
              </p>

              <h3 className="text-xl font-bold mt-2">
                Ravi Kumar
              </h3>
            </div>

            <div className="bg-white/10 p-5 rounded-2xl">
              <p className="text-gray-400">
                Language
              </p>

              <h3 className="text-xl font-bold mt-2">
                Telugu
              </h3>
            </div>

            <div className="bg-white/10 p-5 rounded-2xl">
              <p className="text-gray-400">
                Sentiment
              </p>

              <h3 className="text-xl font-bold mt-2 text-green-400">
                Supporter
              </h3>
            </div>

            <div className="bg-white/10 p-5 rounded-2xl">
              <p className="mb-4 text-gray-400">
                Voice Activity
              </p>

              <div className="flex items-end gap-2 h-20">
                <div className="w-3 bg-cyan-400 h-10 rounded animate-pulse"></div>
                <div className="w-3 bg-purple-400 h-16 rounded animate-pulse"></div>
                <div className="w-3 bg-pink-400 h-8 rounded animate-pulse"></div>
                <div className="w-3 bg-cyan-400 h-20 rounded animate-pulse"></div>
                <div className="w-3 bg-purple-400 h-12 rounded animate-pulse"></div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}



function SettingsPage() {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6">
      <h1 className="text-2xl font-bold mb-6">
        Settings
      </h1>

      <div className="space-y-5">
        <div className="bg-white/10 p-5 rounded-2xl">
          <h2 className="font-semibold mb-2">
            Notification Settings
          </h2>

          <p className="text-gray-400">
            Manage campaign alerts and updates.
          </p>
        </div>

        <div className="bg-white/10 p-5 rounded-2xl">
          <h2 className="font-semibold mb-2">
            Theme Preferences
          </h2>

          <p className="text-gray-400">
            Dark modern dashboard theme enabled.
          </p>
        </div>
      </div>
    </div>
  );
}

function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex bg-[#0F172A] text-white min-h-screen">
      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex-1 lg:ml-0">
        <Topbar setOpen={setOpen} />

        <div className="p-6">
          <Routes>
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/campaigns"
              element={<Campaigns />}
            />

            <Route path="/calls" element={<Calls />} />

            <Route
              path="/analytics"
              element={<Analytics />}
            />
            <Route
              path="/agent"
              element={<AgentPage />}
            />

            <Route
              path="/settings"
              element={<SettingsPage />}
            />

            <Route
              path="*"
              element={<Navigate to="/dashboard" />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#111827] to-[#1E1B4B] text-white">
        <Layout />
      </div>
    </BrowserRouter>
  );
}