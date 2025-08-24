export enum QueueStatus {
  WAITING = "waiting",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  SKIPPED = "skipped",
}

export type Queue = {
  id: string;
  appointment?: {
    id?: string;
    complaint?: string;
    patient_name?: string;
  };
  doctor?: {
    id?: string;
    doctor_name?: string;
  };
  current_queue?: number;
  total_waiting?: number;
  appointment_date?: Date;
  queue_number?: number;
  queue_date?: Date;
  status?: string;
  called_at?: Date;
  started_at?: Date;
  completed_at?: Date;
  estimated_duration?: number;
  notes?: string;
  created_at?: Date;
  updated_at?: Date;
};

export type QueuePage = {
  data: Queue[];
  paging: {
    size: number;
    total_pages: number;
    current_page: number;
  };
};

export interface QueueTodayStats {
  doctors_on_duty: number;
  queue_stats: {
    completed: number;
    in_progress: number;
    waiting: number;
    total_queues: number;
    cancelled: number;
  };
  today: {
    cancelled_appointments: number;
    completed_appointments: number;
    pending_appointments: number;
    total_appointments: number;
  };
}
