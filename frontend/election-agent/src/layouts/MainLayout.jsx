import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function MainLayout() {
  return (
    <div className="flex text-white min-h-screen">

      <Sidebar />

      <div className="flex-1 p-5">

        <Topbar />

        <div>

  <h1 className="text-4xl font-bold mb-8">
    Dashboard
  </h1>

  {/* STATS */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

    <div className="bg-white/10 p-6 rounded-3xl">
      <h2 className="text-lg mb-3 text-gray-300">
        Total Calls
      </h2>

      <p className="text-4xl font-bold">
        12,540
      </p>
    </div>

    <div className="bg-white/10 p-6 rounded-3xl">
      <h2 className="text-lg mb-3 text-gray-300">
        Supporters
      </h2>

      <p className="text-4xl font-bold text-green-400">
        68%
      </p>
    </div>

    <div className="bg-white/10 p-6 rounded-3xl">
      <h2 className="text-lg mb-3 text-gray-300">
        Active Campaigns
      </h2>

      <p className="text-4xl font-bold text-cyan-400">
        8
      </p>
    </div>

  </div>

  {/* RECENT CALLS */}
  <div className="bg-white/10 rounded-3xl p-6">

    <h2 className="text-2xl font-bold mb-5">
      Recent Calls
    </h2>

    <div className="space-y-4">

      <div className="flex justify-between bg-white/5 p-4 rounded-2xl">
        <p>Ravi Kumar</p>
        <p className="text-green-400">
          Supporter
        </p>
      </div>

      <div className="flex justify-between bg-white/5 p-4 rounded-2xl">
        <p>Priya Sharma</p>
        <p className="text-yellow-400">
          Neutral
        </p>
      </div>

      <div className="flex justify-between bg-white/5 p-4 rounded-2xl">
        <p>Arjun Reddy</p>
        <p className="text-red-400">
          Opposed
        </p>
      </div>

    </div>

  </div>

</div>

      </div>

    </div>
  );
}

export default MainLayout;