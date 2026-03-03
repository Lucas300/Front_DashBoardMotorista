import MapCard from "./mapa/MapCard";
import TripTable from "./tabelas/TripTable";
import CardsDireita from "./cardsDireita/CardsDireita";
import TopHeader from "./cardsSuperior/TopHeader";

export default function DashboardGrid() {
  return (
    <div className="grid grid-cols-3 gap-6 h-screen items-start">

      <div className="col-span-3">
        <TopHeader />
      </div>

      <div className="col-span-2">
        <MapCard />
      </div>

      <div className="self-start">
        <CardsDireita />
      </div>

      <div className="col-span-2 -mt-35">
  <TripTable />
</div>

    </div>
  );
}