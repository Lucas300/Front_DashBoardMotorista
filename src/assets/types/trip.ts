export interface Trip {
  id: number;
  driver: string;
  status: "ACTIVE" | "FINISHED" | "CANCELLED";
  distanceKm: number;
  startTime: string;
  endTime: string;
}