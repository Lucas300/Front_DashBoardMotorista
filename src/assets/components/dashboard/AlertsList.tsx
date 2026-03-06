import { AlertTriangle, Route, Zap, Bell } from 'lucide-react';
import type { DynamicAlert } from '../../utils/tripUtils';

interface AlertsListProps {
    alerts: DynamicAlert[];
    onAlertClick: (alert: DynamicAlert) => void;
    title?: string;
}

const AlertsList = ({ alerts, onAlertClick, title = "Alertas Recentes" }: AlertsListProps) => {
    const getAlertIcon = (type: DynamicAlert['type']) => {
        switch (type) {
            case 'speeding': return <AlertTriangle size={16} className="text-red-500" />;
            case 'route_deviation': return <Route size={16} className="text-amber-500" />;
            case 'idle': return <Zap size={16} className="text-yellow-500" />;
            default: return <Bell size={16} className="text-blue-500" />;
        }
    };

    return (
        <div className="alerts-list-container">
            <div className="table-toolbar">
                <div className="table-toolbar-left">
                    <h2 className="table-title">{title}</h2>
                    <span className="cell-muted" style={{ fontSize: '13px', marginLeft: '8px' }}>
                        ({alerts.length})
                    </span>
                </div>
            </div>

            <div className="alerts-grid">
                {alerts.length > 0 ? (
                    alerts.map((alert) => (
                        <div
                            key={alert.id}
                            className="notification-item alert-card-item"
                            onClick={() => onAlertClick(alert)}
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
                        Nenhum alerta para este motorista
                    </div>
                )}
            </div>
        </div>
    );
};

export default AlertsList;
