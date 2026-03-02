import MapCard from "./MapCard";
import MetricCard from "./MetricCard";
import TripTable from "./TripTable";

export default function DashboardGrid() {
  return (
    <div className="grid grid-cols-3 gap-6">

      {/* Mapa ocupa 2 colunas */}
      <div className="col-span-2">
        <MapCard />
      </div>

      {/* Cards da direita */}
      <div className="space-y-6">
        <MetricCard title="Active Trips" value="176 KM" />
        <MetricCard title="Average Speed" value="73 KM/H" />
        <MetricCard title="Alerts" value="281" />
      </div>

      {/* Tabela ocupa 3 colunas */}
      <div className="col-span-3">
        <TripTable />
      </div>

    </div>
  );
}