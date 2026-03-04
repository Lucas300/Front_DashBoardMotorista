import { useState } from "react";
import MapCard from "./mapa/MapCard";
import TripTable from "./tabelas/TripTable";
import CardsDireita from "./cardsDireita/CardsDireita";
import TopHeader from "./cardsSuperior/TopHeader";
import ListaOciosidades from "./tabelas/ListaOciosidades";
import type { Driver } from "../types/trip";

// Props recebidas do Dashboard
interface DashboardGridProps {
  currentView: "map" | "ociosidade";
  onOciosidadesClick: () => void;
  onBackToMap: () => void;
}

export default function DashboardGrid({ 
  currentView, 
  onOciosidadesClick, 
  onBackToMap 
}: DashboardGridProps) {
  // Estado para armazenar o motorista selecionado
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

// Handler para selecionar um motorista da lista de ociosidades
  const handleSelectDriver = (driver: Driver) => {
    setSelectedDriver(driver);
    // Muda para a view de mapa ao selecionar o motorista
    onBackToMap();
  };

  return (
    <div className="grid grid-cols-3 gap-6 h-screen items-start">

      <div className="col-span-3">
        <TopHeader onOciosidadesClick={onOciosidadesClick} />
      </div>

      {/* Área central dinâmica - renderização condicional */}
      <div className="col-span-2">
        {currentView === "ociosidade" ? (
          <ListaOciosidades 
            onSelectDriver={handleSelectDriver} 
            onBack={onBackToMap} 
          />
        ) : (
          <MapCard selectedDriver={selectedDriver} />
        )}
      </div>

      <div className="self-start">
        <CardsDireita />
      </div>

      {/* Histórico só aparece na view de mapa (e sem motorista selecionado) */}
      <div className="col-span-2 -mt-35">
        {currentView === "map" && !selectedDriver && (
          <TripTable />
        )}
      </div>

    </div>
  );
}
