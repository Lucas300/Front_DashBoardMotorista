export type DriverStatus = 'online' | 'offline' | 'em_rota' | 'pausado';
export type TripStatus = 'em_andamento' | 'concluida' | 'cancelada';
export type ViewName = 'overview' | 'drivers' | 'driver_trips' | 'trip_detail' | 'history';

export interface RoutePoint {
  lat: number;
  lng: number;
}

export interface Alert {
  id: string;
  type: 'speeding' | 'braking' | 'route_deviation' | 'idle' | 'geofence';
  description: string;
  position: RoutePoint;
  timestamp: string;
}

export interface Trip {
  id: string;
  driverId: string;
  date: string;
  distance: number;       // km real
  plannedKm: number;      // km planejado
  alerts: Alert[];
  delayed: boolean;
  exceededKm: boolean;
  startTime: string;
  endTime: string;
  status: TripStatus;
  route: RoutePoint[];
  plannedRoute?: RoutePoint[];
  origin: RoutePoint;
  destination: RoutePoint;
}

export interface Driver {
  id: string;
  name: string;
  avatar: string;
  vehicle: string;
  licensePlate: string;
  status: DriverStatus;
  position: RoutePoint;
  tripsToday: number;
  onlineTime: string;     // hh:mm:ss
  kmToday: number;
  lastSeen: string;
}

export interface ViewState {
  current: ViewName;
  selectedDriver: Driver | null;
  selectedTrip: Trip | null;
  history: ViewName[];
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  view: ViewName | null;
}
