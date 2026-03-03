import MetricChartCard from "./MetricChartCard";

const alertsData = [
  { name: "Seg", value: 12 },
  { name: "Ter", value: 18 },
  { name: "Qua", value: 15 },
  { name: "Qui", value: 20 },
  { name: "Sex", value: 25 },
  { name: "Sab", value: 14 },
  { name: "Dom", value: 19 }
];

const kmData = [
  { name: "Seg", value: 120 },
  { name: "Ter", value: 160 },
  { name: "Qua", value: 180 },
  { name: "Qui", value: 170 },
  { name: "Sex", value: 185 },
  { name: "Sab", value: 150 },
  { name: "Dom", value: 110 }
];

export default function CardsDireita() {
  return (
    <div className="flex flex-col justify-between h-full space-y-6">
      
      <MetricChartCard
        title="Alertas Ativos"
        value="281"
        trend="up"
        trendValue="+2%"
        data={alertsData}
      />

      <MetricChartCard
        title="KM Rodados por Dia"
        value="176 KM"
        trend="up"
        trendValue="+2%"
        data={kmData}
      />

    </div>
  );
}