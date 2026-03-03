import { useState, useRef, useEffect } from "react";
import { FaCircle } from "react-icons/fa";

export default function TripTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusOpen, setStatusOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setStatusOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const trips = [
    {
      driver: "Osasco Tavares",
      carro: "2024-4",
      status: "Em rota",
      distance: "3.2 km",
      start: "12:15 AM",
      end: "Em andamento",
      statusColor: "text-green-500",
    },
    {
      driver: "Matheus Souza",
      carro: "2026-3",
      status: "Em rota",
      distance: "3 km",
      start: "10:30 AM",
      end: "Em andamento",
      statusColor: "text-green-500",
    },
    {
      driver: "João R. Silva",
      carro: "2020-3",
      status: "Em rota",
      distance: "5.6 km",
      start: "10:15 AM",
      end: "Em andamento",
      statusColor: "text-green-500",
    },
    {
      driver: "Osasco Tavares",
      carro: "2024-4",
      status: "Concluída",
      distance: "3.2 km",
      start: "12:15 AM",
      end: "9:30 AM",
      statusColor: "text-green-500",
    },
    {
      driver: "Diadema",
      carro: "2024-4",
      status: "Concluída",
      distance: "11.0 km",
      start: "11:00 AM",
      end: "9:45 AM",
      statusColor: "text-red-500",
    },
    {
      driver: "Vanda Tornado",
      carro: "2026-3",
      status: "Concluída",
      distance: "5.9 km",
      start: "12:03 AM",
      end: "10:30 AM",
      statusColor: "text-red-500",
    },
    {
      driver: "Christina S.",
      carro: "2025-3",
      status: "Concluída",
      distance: "3.5 km",
      start: "12:55 AM",
      end: "9:00 AM",
      statusColor: "text-red-500",
    },
  ];

  const filteredTrips = trips.filter((trip) =>
    trip.driver.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Histórico</h2>
        
        {/* Status Dropdown */}
        <div className="relative inline-block" ref={dropdownRef}>
          <button 
            onClick={() => setStatusOpen(!statusOpen)}
            className="inline-flex w-full justify-center gap-x-1.5 rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-white/5 hover:bg-white/20"
          >
            Status
            <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400">
              <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </button>

          {statusOpen && (
            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-white/10 rounded-md bg-gray-800 outline-1 outline-offset-1 outline-white/10">
              <div className="py-1">
                <button 
                  onClick={() => setStatusOpen(false)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white focus:bg-white/5 focus:text-white focus:outline-hidden"
                >
                  Últimas 24h
                </button>
                <button 
                  onClick={() => setStatusOpen(false)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white focus:bg-white/5 focus:text-white focus:outline-hidden"
                >
                  Últimos 7 dias
                </button>
                <button 
                  onClick={() => setStatusOpen(false)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white focus:bg-white/5 focus:text-white focus:outline-hidden"
                >
                  Últimos 30 dias
                </button>
                
              </div>
             <div className="py-1">
              <button 
                  onClick={() => setStatusOpen(false)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white focus:bg-white/5 focus:text-white focus:outline-hidden"
                >
                  Até 3km
                </button>
                <button 
                  onClick={() => setStatusOpen(false)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white focus:bg-white/5 focus:text-white focus:outline-hidden"
                >
                  1km – 10km
                </button>
                <button 
                  onClick={() => setStatusOpen(false)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white focus:bg-white/5 focus:text-white focus:outline-hidden"
                >
                  Acima de 10km
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Pesquisar motorista..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 placeholder-gray-400"
        />
      </div>

      <table className="w-full text-sm text-left text-gray-300">
        <thead className="bg-gray-700 text-gray-400">
          <tr>
            <th className="py-3 px-4">Motorista</th>
            <th className="py-3 px-4">Carro</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Distância</th>
            <th className="py-3 px-4">Início</th>
            <th className="py-3 px-4">Final</th>
          </tr>
        </thead>

        <tbody>
          {filteredTrips.map((trip, index) => (
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
              <td className="py-3 px-4">{trip.carro}</td>
              <td className="py-3 px-4">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-lg ${
                    trip.status === "Em rota"
                      ? "bg-blue-500 text-white"
                      : trip.status === "Concluída"
                      ? "bg-green-500 text-white"
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