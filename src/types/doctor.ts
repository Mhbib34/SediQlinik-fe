export type Doctor = {
  id: string;
  user_id: string;
  specialization: string;
  is_active: boolean;
  name?: string;
  status?: string;
  photos?: string;
  created_at?: Date;
  updated_at?: Date;
};

export type DoctorPage = {
  data: Doctor[];
  paging: {
    size: number;
    total_page: number;
    current_page: number;
  };
};
