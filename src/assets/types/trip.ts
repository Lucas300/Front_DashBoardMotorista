export interface Trip {
  id: number;
  driver: string;
  carro: string;
  status: "ACTIVE" | "FINISHED" | "CANCELLED";
  distanceKm: number;
  startTime: string;
  endTime: string;
}

// Tipo para coordenadas de rota
export interface Coordinate {
  lat: number;
  lng: number;
}

// Tipo para motorista com dados de ociosidade
export interface Driver {
  id: number;
  name: string;
  car: string;
  status: "ocioso" | "em_rota" | "disponivel";
  ociosidadeMinutos: number;
  position: Coordinate;
  route?: Coordinate[]; // Rota do motorista
  distanceKm: number;
  lastUpdate: string;
}
