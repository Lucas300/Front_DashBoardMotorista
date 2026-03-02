import { FaCircle } from "react-icons/fa";

export default function TripTable() {
  const trips = [
    {
      driver: "Matheus Souza (ID: 123)",
      status: "Active",
      distance: "3 km",
      start: "10:30 AM",
      end: "7:15 PM",
      statusColor: "text-green-500",
    },
    {
      driver: "João R. Silva",
      status: "Inactive",
      distance: "5.6 km",
      start: "10:15 AM",
      end: "8:30 AM",
      statusColor: "text-gray-500",
    },
    {
      driver: "Osasco Tavares",
      status: "On Route",
      distance: "3.2 km",
      start: "12:15 AM",
      end: "9:30 AM",
      statusColor: "text-green-400",
    },
    {
      driver: "Diadema (ID: 2301 239)",
      status: "Offline",
      distance: "11.0 km",
      start: "11:00 AM",
      end: "9:45 AM",
      statusColor: "text-red-500",
    },
    {
      driver: "Vanda Tornado",
      status: "Inactive",
      distance: "5.9 km",
      start: "12:03 AM",
      end: "10:30 AM",
      statusColor: "text-gray-500",
    },
    {
      driver: "Christina S. (ID: 723 103)",
      status: "Active",
      distance: "3.5 km",
      start: "12:55 AM",
      end: "9:00 AM",
      statusColor: "text-green-500",
    },
  ];

  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Trip Summary</h2>
        <button className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-600">
          Status
        </button>
      </div>

      <table className="w-full text-sm text-left text-gray-300">
        <thead className="bg-gray-700 text-gray-400">
          <tr>
            <th className="py-3 px-4">Driver</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Distance</th>
            <th className="py-3 px-4">Start</th>
            <th className="py-3 px-4">End</th>
          </tr>
        </thead>

        <tbody>
          {trips.map((trip, index) => (
            <tr
              key={index}
              className={`border-b border-gray-700 ${
                index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"
              } hover:bg-gray-700`}
            >
              <td className="py-3 px-4 flex items-center gap-3">
                <FaCircle className={trip.statusColor} />
                {trip.driver}
              </td>
              <td className="py-3 px-4">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-lg ${
                    trip.status === "Active"
                      ? "bg-green-500 text-white"
                      : trip.status === "On Route"
                      ? "bg-green-400 text-white"
                      : "bg-gray-600 text-gray-300"
                  }`}
                >
                  {trip.status}
                </span>
              </td>
              <td className="py-3 px-4">{trip.distance}</td>
              <td className="py-3 px-4">{trip.start}</td>
              <td className="py-3 px-4">{trip.end}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}