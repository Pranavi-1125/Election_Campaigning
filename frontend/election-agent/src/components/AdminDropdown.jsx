function AdminDropdown() {
  return (
    <div className="absolute right-0 top-16 w-56 bg-[#111827] border border-white/10 rounded-2xl shadow-2xl p-4 z-50">

      <div className="flex items-center gap-3 mb-4">

        <img
          src="https://i.pravatar.cc/40"
          alt=""
          className="rounded-full"
        />

        <div>
          <p className="font-semibold">
            Admin
          </p>

          <p className="text-sm text-gray-400">
            Campaign Manager
          </p>
        </div>

      </div>

      <div className="space-y-3">

        <button className="w-full bg-white/10 p-3 rounded-xl hover:bg-white/20 transition-all">
          Profile
        </button>

        <button className="w-full bg-white/10 p-3 rounded-xl hover:bg-white/20 transition-all">
          Settings
        </button>

        <button className="w-full bg-red-500/20 p-3 rounded-xl hover:bg-red-500/30 transition-all">
          Logout
        </button>

      </div>
    </div>
  );
}

export default AdminDropdown;