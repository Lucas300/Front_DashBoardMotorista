type MetricCardProps = {
  title: string;
  value: string | number;
};

export default function MetricCard({ title, value }: MetricCardProps) {
  return (
    <div className="bg-gray-800 p-5 rounded-2xl shadow-md">
      <h2 className="text-gray-400 text-sm">{title}</h2>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}