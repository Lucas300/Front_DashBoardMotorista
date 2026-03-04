import { useState } from 'react';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';
import { CHART_DATA_ALERTS, CHART_DATA_KM } from '../../data/mockData';

type ChartType = 'linha' | 'barras';

const ChartToggle = ({
    value,
    onChange,
}: {
    value: ChartType;
    onChange: (v: ChartType) => void;
}) => (
    <div className="chart-toggle">
        <button className={`toggle-btn ${value === 'linha' ? 'toggle-btn--active' : ''}`} onClick={() => onChange('linha')}>
            Linha
        </button>
        <button className={`toggle-btn ${value === 'barras' ? 'toggle-btn--active' : ''}`} onClick={() => onChange('barras')}>
            Barras
        </button>
    </div>
);

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number }> }) => {
    if (active && payload && payload.length) {
        return (
            <div className="chart-tooltip">
                <span>{payload[0].value}</span>
            </div>
        );
    }
    return null;
};

const StatsPanel = () => {
    const [alertChart, setAlertChart] = useState<ChartType>('linha');
    const [kmChart, setKmChart] = useState<ChartType>('linha');

    return (
        <div className="stats-panel">
            {/* Alertas Ativos */}
            <div className="stats-card">
                <div className="stats-card-header">
                    <span className="stats-card-title">Alertas Ativos</span>
                    <ChartToggle value={alertChart} onChange={setAlertChart} />
                </div>
                <div className="stats-card-value">
                    <span className="big-number">281</span>
                    <span className="trend trend--up">+2%</span>
                </div>
                <div className="chart-area">
                    <ResponsiveContainer width="100%" height={90}>
                        {alertChart === 'linha' ? (
                            <LineChart data={CHART_DATA_ALERTS} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="day" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                                <Tooltip content={<CustomTooltip />} />
                                <Line type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={2.5} dot={{ fill: '#06b6d4', r: 3 }} activeDot={{ r: 5 }} />
                            </LineChart>
                        ) : (
                            <BarChart data={CHART_DATA_ALERTS} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="day" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="value" fill="#06b6d4" radius={[3, 3, 0, 0]} />
                            </BarChart>
                        )}
                    </ResponsiveContainer>
                </div>
            </div>

            {/* KM Rodados por Dia */}
            <div className="stats-card">
                <div className="stats-card-header">
                    <span className="stats-card-title">KM Rodados por Dia</span>
                    <ChartToggle value={kmChart} onChange={setKmChart} />
                </div>
                <div className="stats-card-value">
                    <span className="big-number">176<br /><small>KM</small></span>
                    <span className="trend trend--up">+2%</span>
                </div>
                <div className="chart-area">
                    <ResponsiveContainer width="100%" height={90}>
                        {kmChart === 'linha' ? (
                            <LineChart data={CHART_DATA_KM} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="day" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                                <Tooltip content={<CustomTooltip />} />
                                <Line type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={2.5} dot={{ fill: '#06b6d4', r: 3 }} activeDot={{ r: 5 }} />
                            </LineChart>
                        ) : (
                            <BarChart data={CHART_DATA_KM} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="day" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="value" fill="#06b6d4" radius={[3, 3, 0, 0]} />
                            </BarChart>
                        )}
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default StatsPanel;
