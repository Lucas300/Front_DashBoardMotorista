export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 p-5 space-y-6">
      <h1 className="text-xl font-bold">Dashboard</h1>

      <nav className="space-y-4 text-gray-300">
        <p className="hover:text-white cursor-pointer">Dashboard</p>
        <p className="hover:text-white cursor-pointer">Live Tracking</p>
        <p className="hover:text-white cursor-pointer">Live History</p>
        <p className="hover:text-white cursor-pointer">Drivers</p>
        <p className="hover:text-white cursor-pointer">Vehicles</p>
        <p className="hover:text-white cursor-pointer">Reports</p>
      </nav>
    </div>
  );
}