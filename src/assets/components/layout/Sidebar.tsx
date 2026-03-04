import { Home, Radio, History, Car, Users } from 'lucide-react';
import type { ViewName } from '../../types';

interface SidebarProps {
    activeView: ViewName;
    onNavigate: (view: ViewName) => void;
}

const navItems = [
    { id: 'overview', label: 'Principal', icon: Home, view: 'overview' as ViewName },
    { id: 'drivers_tracking', label: 'Rastreamento', icon: Radio, view: 'overview' as ViewName },
    { id: 'history', label: 'Histórico', icon: History, view: 'history' as ViewName },
    { id: 'vehicles', label: 'Veículos', icon: Car, view: 'overview' as ViewName },
    { id: 'drivers', label: 'Motoristas', icon: Users, view: 'drivers' as ViewName },
];

const Sidebar = ({ activeView, onNavigate }: SidebarProps) => {
    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <Home size={20} className="brand-icon" />
                <span className="brand-text">Menu</span>
            </div>
            <nav className="sidebar-nav">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                        (item.id === 'overview' && activeView === 'overview') ||
                        (item.id === 'history' && activeView === 'history') ||
                        (item.id === 'drivers' && (activeView === 'drivers' || activeView === 'driver_trips'));

                    return (
                        <button
                            key={item.id}
                            className={`nav-item ${isActive ? 'nav-item--active' : ''}`}
                            onClick={() => onNavigate(item.view)}
                        >
                            <Icon size={18} className="nav-icon" />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;
