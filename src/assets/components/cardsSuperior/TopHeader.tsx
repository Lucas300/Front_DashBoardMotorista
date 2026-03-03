import { Car, Clock, Route, Bell } from "lucide-react";

export default function TopHeader() {
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

        {/* Notificação */}
        <div className="relative mr-4">
          <Bell className="text-white cursor-pointer" size={22} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full text-white">
            4
          </span>
        </div>

      </div>
    </div>
  );
}