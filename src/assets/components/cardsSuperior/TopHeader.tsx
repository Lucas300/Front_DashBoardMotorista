import { Car, Clock, Route, Bell, AlertTriangle, Users } from "lucide-react";
import { useState } from "react";

export default function TopHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Dados de exemplo para o dropdown
  const avisos = [
    { id: 1, titulo: "Excesso de Velocidade", desc: "Veiculo com excesso de velocidade", tempo: "2h atrás" },
    { id: 2, titulo: "Motorista com ociosidade", desc: "Veiculo com Ociosidade em 15km", tempo: "1h atrás" },
  ];

  const desviosRota = [
    { id: 1, motorista: "João Silva", destino: "Centro - Av. Paulista", desvio: "2km" },
    { id: 2, motorista: "Pedro Santos", destino: "Zona Sul - Brooklin", desvio: "1.5km" },
  ];

  return (
    <div className="w-full flex justify-between items-center mb-6">

      {/* ====== CARDS DA ESQUERDA ====== */}
      <div className="flex gap-6">

        {/* Viagens Hoje */}
        <div className="bg-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-lg w-64">
          <div className="bg-cyan-500/20 p-3 rounded-xl">
            <Car className="text-cyan-400" size={22} />
          </div>
          <div>
            <p className="text-sm text-gray-400">Viagens Hoje</p>
            <h2 className="text-2xl font-bold text-white">4</h2>
          </div>
        </div>

        {/* Tempo Online */}
        <div className="bg-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-lg w-64">
          <div className="bg-purple-500/20 p-3 rounded-xl">
            <Clock className="text-purple-400" size={22} />
          </div>
          <div>
            <p className="text-sm text-gray-400">Tempo Online</p>
            <h2 className="text-2xl font-bold text-white">01:18:34</h2>
          </div>
        </div>

        {/* KM Rodados */}
        <div className="bg-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-lg w-64">
          <div className="bg-green-500/20 p-3 rounded-xl">
            <Route className="text-green-400" size={22} />
          </div>
          <div>
            <p className="text-sm text-gray-400">KM Rodados</p>
            <h2 className="text-2xl font-bold text-white">176 KM</h2>
          </div>
        </div>

      </div>

      {/* ====== DIREITA ====== */}
      <div className="flex items-center gap-6">

        {/* 
            <button className="bg-slate-800 px-5 py-2 rounded-xl text-white hover:bg-slate-700 transition">
            Hoje
            </button>
        */}

        {/* Avatar + Nome */}
        <div className="flex items-center gap-3 ml-4">
          <img
            src="https://i.pravatar.cc/100"
            alt="driver"
            className="w-10 h-10 rounded-full border-2 border-cyan-400"
          />
          <div>
            <p className="text-white font-semibold ">Matheus Souza</p>
            <p className="text-sm text-green-400">Online</p>
          </div>
        </div>

        {/* Notificação com Dropdown */}
        <div className="relative mr-4">
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="relative focus:outline-none"
          >
            <Bell className="text-white cursor-pointer hover:text-cyan-400 transition" size={22} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full text-white">
              {avisos.length + desviosRota.length}
            </span>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 overflow-hidden z-50">
              
              {/* Avisos */}
              <div className="p-3 border-b border-slate-700">
                <div className="flex items-center gap-2 mb-3">
                  <Bell className="text-cyan-400" size={16} />
                  <h3 className="text-white font-semibold text-sm">Avisos ({avisos.length})</h3>
                </div>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {avisos.map((aviso) => (
                    <div key={aviso.id} className="bg-slate-700/50 p-2 rounded-lg hover:bg-slate-700 transition cursor-pointer">
                      <p className="text-white text-sm font-medium">{aviso.titulo}</p>
                      <p className="text-gray-400 text-xs">{aviso.desc}</p>
                      <p className="text-cyan-400 text-xs mt-1">{aviso.tempo}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desvios de Rota */}
              <div className="p-3">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="text-yellow-400" size={16} />
                  <h3 className="text-white font-semibold text-sm">Desvios de Rota ({desviosRota.length})</h3>
                </div>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {desviosRota.map((desvio) => (
                    <div key={desvio.id} className="bg-slate-700/50 p-2 rounded-lg hover:bg-slate-700 transition cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Users className="text-gray-400" size={14} />
                        <p className="text-white text-sm font-medium">{desvio.motorista}</p>
                      </div>
                      <p className="text-gray-400 text-xs ml-6">{desvio.destino}</p>
                      <p className="text-yellow-400 text-xs ml-6 mt-1">Desvio: {desvio.desvio}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
