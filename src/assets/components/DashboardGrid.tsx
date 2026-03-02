import MapCard from "./MapCard";
import MetricCard from "./MetricCard";
import TripTable from "./TripTable";
import CardsDireita from "./cardsDireita";

export default function DashboardGrid() {
  return (
    <div className="grid grid-cols-3 gap-6 h-screen">

      {/* Mapa ocupa 2 colunas */}
      <div className="col-span-2">
        <MapCard />
      </div>

      {/* Cards da direita ocupam toda a altura */}
      <div className="space-y-6 flex flex-col justify-between h-full">
        <CardsDireita />
      </div>

      {/* Tabela ocupa 3 colunas e está centralizada */}
      <div className="col-span-3 flex justify-center items-center">
        <div className="w-full max-w-5xl">
          <TripTable />
        </div>
      </div>

    </div>
  );
}