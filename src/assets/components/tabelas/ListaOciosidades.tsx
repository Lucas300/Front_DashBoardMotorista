import { useState } from "react";
import { FaCircle, FaArrowLeft, FaClock, FaCar, FaMapMarkerAlt } from "react-icons/fa";
import type { Driver } from "../../types/trip";

interface ListaOciosidadesProps {
  onSelectDriver: (driver: Driver) => void;
  onBack: () => void;
}

// Dados de exemplo para motoristas ociosos
const mockDrivers: Driver[] = [
  {
    id: 1,
    name: "Osasco Tavares",
    car: "2024-4",
    status: "ocioso",
    ociosidadeMinutos: 45,
    position: { lat: -23.55052, lng: -46.633308 },
    route: [
      { lat: -23.55052, lng: -46.633308 },
      { lat: -23.559616, lng: -46.658823 },
      { lat: -23.563987, lng: -46.654321 },
      { lat: -23.56789, lng: -46.64 },
    ],
    distanceKm: 3.2,
    lastUpdate: "5 min atrás",
  },
  {
    id: 2,
    name: "Matheus Souza",
    car: "2026-3",
    status: "ocioso",
    ociosidadeMinutos: 30,
    position: { lat: -23.56123, lng: -46.656789 },
    route: [
      { lat: -23.56123, lng: -46.656789 },
      { lat: -23.564567, lng: -46.652345 },
      { lat: -23.568901, lng: -46.648901 },
    ],
    distanceKm: 2.8,
    lastUpdate: "3 min atrás",
  },
  {
    id: 3,
    name: "João R. Silva",
    car: "2020-3",
    status: "ocioso",
    ociosidadeMinutos: 60,
    position: { lat: -23.54876, lng: -46.629876 },
    route: [
      { lat: -23.54876, lng: -46.629876 },
      { lat: -23.552345, lng: -46.635678 },
      { lat: -23.556789, lng: -46.641234 },
    ],
    distanceKm: 5.1,
    lastUpdate: "10 min atrás",
  },
  {
    id: 4,
    name: "Diadema Santos",
    car: "2024-4",
    status: "ocioso",
    ociosidadeMinutos: 25,
    position: { lat: -23.57234, lng: -46.612345 },
    route: [
      { lat: -23.57234, lng: -46.612345 },
      { lat: -23.568901, lng: -46.618901 },
    ],
    distanceKm: 1.5,
    lastUpdate: "2 min atrás",
  },
  {
    id: 5,
    name: "Vanda Tornado",
    car: "2026-3",
    status: "ocioso",
    ociosidadeMinutos: 55,
    position: { lat: -23.54567, lng: -46.645678 },
    route: [
      { lat: -23.54567, lng: -46.645678 },
      { lat: -23.549876, lng: -46.650123 },
      { lat: -23.554321, lng: -46.654567 },
    ],
    distanceKm: 4.2,
    lastUpdate: "8 min atrás",
  },
];

export default function ListaOciosidades({ onSelectDriver, onBack }: ListaOciosidadesProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filteredDrivers = mockDrivers.filter((driver) =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDriverClick = (driver: Driver) => {
    setSelectedId(driver.id);
    // Pequeno delay para feedback visual antes de navegar
    setTimeout(() => {
      onSelectDriver(driver);
    }, 150);
  };

  const getOciosidadeColor = (minutos: number) => {
    if (minutos < 30) return "text-green-400";
    if (minutos < 45) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700 h-full">
      {/* Header com botãovoltar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
          >
            <FaArrowLeft /> Voltar
          </button>
          <h2 className="text-xl font-bold text-white">Motoristas em Ociosidade</h2>
        </div>
        <span className="text-gray-400 text-sm">
          {filteredDrivers.length} motorista(s) ocioso(s)
        </span>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Pesquisar motorista..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-cyan-500 placeholder-gray-400"
        />
      </div>

      {/* Tabela */}
      <div className="overflow-auto max-h-[calc(100vh-320px)]">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="bg-gray-700 text-gray-400 sticky top-0">
            <tr>
              <th className="py-3 px-4">Motorista</th>
              <th className="py-3 px-4">Carro</th>
              <th className="py-3 px-4">Ociosidade</th>
              <th className="py-3 px-4">Distância</th>
              <th className="py-3 px-4">Atualização</th>
            </tr>
          </thead>

          <tbody>
            {filteredDrivers.map((driver) => (
              <tr
                key={driver.id}
                onClick={() => handleDriverClick(driver)}
                className={`border-b border-gray-700 cursor-pointer transition-all ${
                  selectedId === driver.id
                    ? "bg-cyan-500/20"
                    : "hover:bg-gray-700"
                }`}
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <FaCircle className={getOciosidadeColor(driver.ociosidadeMinutos)} />
                    <span className="font-medium text-white">{driver.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <FaCar className="text-gray-500" />
                    {driver.car}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <FaClock className={getOciosidadeColor(driver.ociosidadeMinutos)} />
                    <span className={getOciosidadeColor(driver.ociosidadeMinutos)}>
                      {driver.ociosidadeMinutos} min
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-cyan-400" />
                    {driver.distanceKm} km
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-500">{driver.lastUpdate}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredDrivers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhum motorista encontrado
          </div>
        )}
      </div>
    </div>
  );
}

