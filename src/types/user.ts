export enum Gender {
  MALE = "male",
  FEMALE = "female",
}

export enum UserRole {
  ADMIN = "admin",
  DOCTOR = "doctor",
  PATIENT = "patient",
}

export type User = {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  address?: string;
  date_of_birth?: Date;
  gender: Gender;
  role?: string;
  created_at?: Date;
  updated_at?: Date;
  reset_otp?: string;
  reset_otp_expired_at?: Date;
};
