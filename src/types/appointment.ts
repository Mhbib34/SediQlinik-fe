export type Appointment = {
  id: string;
  doctor: {
    doctor_id: string;
    name: string;
    specialization: string;
  };
  patient: {
    id: string;
    name: string;
    phone: string;
  };
  appointment_date: Date;
  appointment_time: string;
  complaint: string;
  status: AppointmentStatus;
  notes: string;
  created_at: Date;
  updated_at?: Date;
};

export enum AppointmentStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
}

export type AppointmentPage = {
  data: Appointment[];
  paging: {
    size: number;
    total_page: number;
    current_page: number;
  };
};
