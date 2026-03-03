import { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

interface DataItem {
  name: string;
  value: number;
}

interface MetricChartCardProps {
  title: string;
  value: string;
  trend: "up" | "down";
  trendValue: string;
  data: DataItem[];
}

export default function MetricChartCard({
  title,
  value,
  trend,
  trendValue,
  data
}: MetricChartCardProps) {
  const [chartType, setChartType] = useState<"area" | "bar">("area");

  return (
    <div className="bg-slate-900 p-6 rounded-2xl shadow-lg w-full h-65 flex flex-col">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-gray-400 text-sm">{title}</h3>
          <div className="flex items-center space-x-3 mt-2">
            <span className="text-3xl font-bold text-white">{value}</span>
            <span
              className={`text-sm font-semibold ${
                trend === "up" ? "text-green-400" : "text-red-400"
              }`}
            >
              {trendValue}
            </span>
          </div>
        </div>

        {/* Botões de troca */}
        <div className="flex bg-slate-800 rounded-lg p-1">
          <button
            onClick={() => setChartType("area")}
            className={`px-3 py-1 text-sm rounded-md transition ${
              chartType === "area"
                ? "bg-cyan-500 text-white"
                : "text-gray-400"
            }`}
          >
            Linha
          </button>
          <button
            onClick={() => setChartType("bar")}
            className={`px-3 py-1 text-sm rounded-md transition ${
              chartType === "bar"
                ? "bg-cyan-500 text-white"
                : "text-gray-400"
            }`}
          >
            Barras
          </button>
        </div>
      </div>

      {/* Gráfico */}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "area" ? (
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "none",
                  borderRadius: "10px"
                }}
              />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#22d3ee"
                strokeWidth={3}
                fill="url(#colorGradient)"
                dot={{ r: 4 }}
                label={{
                  fill: "#e2e8f0",
                  fontSize: 12
                }}
              />
            </AreaChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "none",
                  borderRadius: "10px"
                }}
              />

              <Bar
                dataKey="value"
                fill="#22d3ee"
                radius={[8, 8, 0, 0]}
                label={{
                  position: "top",
                  fill: "#e2e8f0",
                  fontSize: 12
                }}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}