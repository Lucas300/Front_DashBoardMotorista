import { useState, useRef, useEffect } from 'react';
import { Bell, AlertTriangle, Route, Zap } from 'lucide-react';
import type { Driver } from '../../types';
import { MOCK_TRIPS } from '../../data/mockData';
import { generateDynamicAlerts } from '../../utils/tripUtils';
import type { DynamicAlert } from '../../utils/tripUtils';

interface HeaderProps {
    activeDriver: Driver | null;
    allDrivers: Driver[];
    onAlertClick: (alert: DynamicAlert) => void;
}

const Header = ({ activeDriver, allDrivers, onAlertClick }: HeaderProps) => {
    const driver = activeDriver ?? allDrivers[0];
    const [showNotifications, setShowNotifications] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const alerts = generateDynamicAlerts(allDrivers, MOCK_TRIPS);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleAlertItemClick = (alert: DynamicAlert) => {
        onAlertClick(alert);
        setShowNotifications(false);
    };

    const getAlertIcon = (type: DynamicAlert['type']) => {
        switch (type) {
            case 'speeding': return <AlertTriangle size={16} className="text-red-500" />;
            case 'route_deviation': return <Route size={16} className="text-amber-500" />;
            case 'idle': return <Zap size={16} className="text-yellow-500" />;
            default: return <Bell size={16} className="text-blue-500" />;
        }
    };

    return (
        <header className="header">
            <div className="header-profile">
                <div className="profile-info">
                    {/*Versão que troca pelos motoristas*/}
                    {/*
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
                    */}
                    <span className="profile-name">{"Administrador"}</span>
                    <span className={`profile-status ${'online'}`}>
                        {'Online'}
                    </span>
                </div>
                <img
                    src={"https://api.dicebear.com/7.x/avataaars/svg?seed=Diego"}
                    alt={driver.name}
                    className="profile-avatar"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(driver.name)}&background=1a2744&color=60a5fa&size=64`;
                    }}
                />

                <div className="notification-container" ref={dropdownRef}>
                    <button
                        className={`notification-btn ${showNotifications ? 'notification-btn--active' : ''}`}
                        onClick={() => setShowNotifications(!showNotifications)}
                    >
                        <Bell size={22} />
                        {alerts.length > 0 && (
                            <span className="notification-badge">{alerts.length}</span>
                        )}
                    </button>

                    {showNotifications && (
                        <div className="notifications-dropdown">
                            <div className="notifications-header">
                                <span className="notifications-title">Avisos ({alerts.length})</span>
                            </div>
                            <div className="notifications-list">
                                {alerts.length > 0 ? (
                                    alerts.map((alert) => (
                                        <div
                                            key={alert.id}
                                            className="notification-item"
                                            onClick={() => handleAlertItemClick(alert)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <div className="notification-icon-wrapper">
                                                {getAlertIcon(alert.type)}
                                            </div>
                                            <div className="notification-content">
                                                <div className="notification-item-header">
                                                    <span className="notification-item-title">{alert.titulo}</span>
                                                    <span className="notification-item-time">{alert.tempo}</span>
                                                </div>
                                                <p className="notification-item-desc">{alert.desc}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="notification-empty">
                                        Nenhum aviso no momento
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
