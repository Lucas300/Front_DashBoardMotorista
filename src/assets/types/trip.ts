export interface Trip {
  id: number;
  driver: string;
  carro: string;
  status: "ACTIVE" | "FINISHED" | "CANCELLED";
  distanceKm: number;
  startTime: string;
  endTime: string;
}
