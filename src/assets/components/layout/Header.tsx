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
