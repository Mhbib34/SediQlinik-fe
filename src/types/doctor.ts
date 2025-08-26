export type Doctor = {
  id: string;
  user_id: string;
  specialization: string;
  is_active: boolean;
  status?: string;
  photos?: string;
  day_of_week?: string[];
  name?: string;
  email?: string;
  phone?: string;
  schedule_id?: string;
  start_time?: string;
  end_time?: string;
  created_at?: Date;
  updated_at?: Date;
};

export type DoctorSchedule = {
  id: string;
  day_of_week: string[];
  start_time: string;
  end_time: string;
  is_active: boolean;
  created_at: Date;
  status?: string;
};
export type DoctorPage = {
  data: Doctor[];
  paging: {
    size: number;
    total_page: number;
    current_page: number;
  };
};
