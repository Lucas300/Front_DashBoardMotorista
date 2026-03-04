import { Bell } from 'lucide-react';
import type { Driver } from '../../types';

interface HeaderProps {
    activeDriver: Driver | null;
    allDrivers: Driver[];
}

const StatCard = ({
    icon,
    label,
    value,
    color,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    color: string;
}) => (
    <div className="stat-card">
        <div className={`stat-icon ${color}`}>{icon}</div>
        <div className="stat-info">
            <span className="stat-label">{label}</span>
            <span className="stat-value">{value}</span>
        </div>
    </div>
);

const Header = ({ activeDriver, allDrivers }: HeaderProps) => {
    const driver = activeDriver ?? allDrivers[0];
    const totalTrips = allDrivers.reduce((sum, d) => sum + d.tripsToday, 0);

    return (
        <header className="header">
            <div className="header-stats">
                <StatCard
                    icon={
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                            <path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3" />
                            <rect x="9" y="11" width="14" height="10" rx="2" />
                            <circle cx="12" cy="16" r="1" />
                            <circle cx="20" cy="16" r="1" />
                        </svg>
                    }
                    label="Viagens Hoje"
                    value={String(totalTrips)}
                    color="stat-icon--blue"
                />
                <StatCard
                    icon={
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                    }
                    label="Tempo Online"
                    value={driver.onlineTime}
                    color="stat-icon--purple"
                />
                <StatCard
                    icon={
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                            <path d="M3 6h18M3 12h18M3 18h18" />
                        </svg>
                    }
                    label="KM Rodados"
                    value={`${driver.kmToday} KM`}
                    color="stat-icon--teal"
                />
            </div>

            <div className="header-profile">
                <div className="profile-info">
                    <span className="profile-name">{driver.name}</span>
                    <span className={`profile-status ${driver.status === 'em_rota' || driver.status === 'online' ? 'status--online' : 'status--offline'}`}>
                        {driver.status === 'em_rota' ? 'Online' : driver.status === 'online' ? 'Online' : driver.status === 'pausado' ? 'Pausado' : 'Offline'}
                    </span>
                </div>
                <img
                    src={driver.avatar}
                    alt={driver.name}
                    className="profile-avatar"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(driver.name)}&background=1a2744&color=60a5fa&size=64`;
                    }}
                />
                <button className="notification-btn">
                    <Bell size={18} />
                    <span className="notification-badge">4</span>
                </button>
            </div>
        </header>
    );
};

export default Header;
