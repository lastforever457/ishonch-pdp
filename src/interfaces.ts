export type Role = "ADMIN" | "EMPLOYEE" | "STUDENT";

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
}
