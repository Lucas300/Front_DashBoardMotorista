import type { Trip, Driver } from '../types';
import TripMap from '../components/map/TripMap';
import { ArrowLeft, AlertTriangle, CheckCircle, XCircle, MapPin, Clock, Navigation } from 'lucide-react';

interface TripDetailViewProps {
    trip: Trip;
    driver: Driver;
    onBack: () => void;
}

const TripDetailView = ({ trip, driver, onBack }: TripDetailViewProps) => {
    return (
        <div className="trip-detail-layout">
            <div className="trip-detail-map">
                <TripMap trip={trip} />
                <button className="back-btn trip-back-btn" onClick={onBack}>
                    <ArrowLeft size={16} />
                    <span>Voltar às Corridas</span>
                </button>
            </div>

            <div className="trip-detail-sidebar">
                <div className="trip-detail-card">
                    <h3 className="trip-detail-title">Detalhes da Corrida</h3>
                    <div className="trip-detail-driver">
                        <img
                            src={driver.avatar}
                            alt={driver.name}
                            className="trip-driver-avatar"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(driver.name)}&background=1a2744&color=60a5fa&size=48`;
                            }}
                        />
                        <div>
                            <span className="trip-driver-name">{driver.name}</span>
                            <span className="trip-driver-vehicle">{driver.vehicle}</span>
                        </div>
                    </div>

                    <div className="trip-stats-grid">
                        <div className="trip-stat">
                            <Navigation size={14} className="text-cyan-400" />
                            <span className="trip-stat-label">Distância Real</span>
                            <span className="trip-stat-value">{trip.distance} km</span>
                        </div>
                        <div className="trip-stat">
                            <MapPin size={14} className="text-blue-400" />
                            <span className="trip-stat-label">KM Planejado</span>
                            <span className="trip-stat-value">{trip.plannedKm} km</span>
                        </div>
                        <div className="trip-stat">
                            <Clock size={14} className="text-purple-400" />
                            <span className="trip-stat-label">Início</span>
                            <span className="trip-stat-value">{trip.startTime}</span>
                        </div>
                        <div className="trip-stat">
                            <Clock size={14} className="text-purple-400" />
                            <span className="trip-stat-label">Final</span>
                            <span className="trip-stat-value">{trip.endTime}</span>
                        </div>
                    </div>

                    <div className="trip-flags">
                        <div className={`trip-flag ${trip.delayed ? 'trip-flag--danger' : 'trip-flag--ok'}`}>
                            {trip.delayed ? <XCircle size={15} /> : <CheckCircle size={15} />}
                            <span>Atraso: <strong>{trip.delayed ? 'Sim' : 'Não'}</strong></span>
                        </div>
                        <div className={`trip-flag ${trip.exceededKm ? 'trip-flag--warning' : 'trip-flag--ok'}`}>
                            {trip.exceededKm ? <XCircle size={15} /> : <CheckCircle size={15} />}
                            <span>Excedeu KM: <strong>{trip.exceededKm ? 'Sim' : 'Não'}</strong></span>
                        </div>
                    </div>

                    {trip.alerts.length > 0 && (
                        <div className="trip-alerts-section">
                            <h4 className="alerts-section-title">
                                <AlertTriangle size={14} className="text-amber-400" />
                                Alertas ({trip.alerts.length})
                            </h4>
                            <ul className="alerts-list">
                                {trip.alerts.map((alert) => (
                                    <li key={alert.id} className="alert-item">
                                        <span className="alert-bullet" />
                                        <div>
                                            <span className="alert-desc">{alert.description}</span>
                                            <span className="alert-time">{alert.timestamp}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TripDetailView;
