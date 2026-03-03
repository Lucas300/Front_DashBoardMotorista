import { FaHome, FaCar, FaHistory, FaUserFriends, FaSatelliteDish } from "react-icons/fa";

const menuItems = [
  { label: "Principal", icon: <FaHome /> },
  { label: "Rastreamento", icon: <FaSatelliteDish /> },
  { label: "histórico", icon: <FaHistory /> },
  { label: "Veículos", icon: <FaCar /> },
  { label: "Motoristas", icon: <FaUserFriends /> },
  /*{ label: "Alertas", icon: <FaChartBar /> },*/
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-transparent p-6 flex flex-col items-center">
      <div className="w-full bg-gray-800 rounded-2xl shadow-lg border border-gray-700 py-6 px-4">
        <h1 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
          <FaHome className="text-xl" /> Menu
        </h1>
        <nav className="space-y-2">
          {menuItems.map((item, idx) => (
            <div
              key={item.label}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors text-gray-300 hover:text-white hover:bg-gray-700 ${idx === 0 ? "bg-gray-700 text-white" : ""}`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
              {item.label === "Live Tracking" || item.label === "Live History" || item.label === "Vehicles" ? (
                <span className="ml-auto text-xs text-gray-400">&#8250;</span>
              ) : null}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}