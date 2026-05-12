function Dashboard() {
  return (
    <div>

      <h1 className="text-4xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white/10 p-6 rounded-3xl">
          <h2 className="text-xl mb-3">
            Total Calls
          </h2>

          <p className="text-4xl font-bold">
            12,540
          </p>
        </div>

        <div className="bg-white/10 p-6 rounded-3xl">
          <h2 className="text-xl mb-3">
            Supporters
          </h2>

          <p className="text-4xl font-bold text-green-400">
            68%
          </p>
        </div>

        <div className="bg-white/10 p-6 rounded-3xl">
          <h2 className="text-xl mb-3">
            Active Campaigns
          </h2>

          <p className="text-4xl font-bold text-cyan-400">
            8
          </p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;