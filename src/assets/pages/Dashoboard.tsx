
import { useState } from "react";
import { LoadScript } from "@react-google-maps/api";
import Sidebar from "../components/cardEsquerda/Sidebar";
import DashboardGrid from "../components/DashboardGrid";

export default function Dashboard() {
  // Estado para controlar a view (sobe para o nível do Dashboard para compartilhar entre Sidebar e TopHeader)
  const [currentView, setCurrentView] = useState<"map" | "ociosidade">("map");

  const handleOciosidadesClick = () => {
    setCurrentView("ociosidade");
  };

  const handleBackToMap = () => {
    setCurrentView("map");
  };

  return (
    <LoadScript 
      googleMapsApiKey="AIzaSyDwTXVxmkgHWUeuDvcFKnX4vNtnlT1Nrx0"
      loadingElement={
        <div className="h-screen flex items-center justify-center bg-gray-900">
          <span className="text-cyan-400 text-xl">Carregando mapa...</span>
        </div>
      }
    >
      <div className="flex h-screen bg-gray-900 text-white">
        <Sidebar onOciosidadesClick={handleOciosidadesClick} />
        <div className="flex-1 p-6 overflow-auto">
          <DashboardGrid 
            currentView={currentView}
            onOciosidadesClick={handleOciosidadesClick}
            onBackToMap={handleBackToMap}
          />
        </div>
      </div>
    </LoadScript>
  );
}

