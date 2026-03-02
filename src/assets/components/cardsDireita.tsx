import MetricCard from "./MetricCard";

export default function CardsDireita() {
  return (
    <div className="flex flex-col justify-between h-full space-y-6">
      <MetricCard title="Active Trips" value="176 KM" trend="up" trendValue="+10%" />
      <MetricCard title="Average Speed" value="73 KM/H" trend="down" trendValue="-5%" />
      <MetricCard title="Alerts" value="281" trend="up" trendValue="+15" />
      
    </div>
  );
}