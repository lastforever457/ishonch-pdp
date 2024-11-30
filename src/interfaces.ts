export type Role = "ADMIN" | "TEACHER" | "STUDENT";
export type Status = "ACTIVE" | "ARCHIVED" | "BLOCKED";

export interface IUser {
  id: number | string;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  role: Role;
  birthDate: string;
  male: "MALE" | "FEMALE";
  photo: string;
  status: Status;
}
