import { FaArrowUp, FaArrowDown } from "react-icons/fa";

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: "up" | "down";
  trendValue?: string;
}

export default function MetricCard({ title, value, trend, trendValue }: MetricCardProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-700">
      <div className="flex items-center justify-between">
        <h2 className="text-gray-400 text-sm font-medium">{title}</h2>
        {trend && (
          <span
            className={`flex items-center gap-1 text-sm font-semibold ${
              trend === "up" ? "text-green-500" : "text-red-500"
            }`}
          >
            {trend === "up" ? <FaArrowUp /> : <FaArrowDown />} {trendValue}
          </span>
        )}
      </div>
      <p className="text-3xl font-bold mt-2 text-white">{value}</p>
    </div>
  );
}