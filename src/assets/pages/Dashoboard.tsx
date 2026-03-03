import Sidebar from "../components/menu/Sidebar";
import DashboardGrid from "../components/DashboardGrid";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">
        <DashboardGrid />
      </div>
    </div>
  );
}