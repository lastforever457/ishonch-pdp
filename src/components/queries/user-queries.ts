import axios from "axios";
import { IUser, Role } from "../../interfaces";
import { api } from "../utils";

export const getAllUsers = async () => {
  try {
    const res = await axios.get<IUser[]>(`${api}/employees`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getOneUser = async (
  id?: string | number,
  role?: Role,
  custom?: string
) => {
  try {
    if (id && id.toString().length > 0 && role) {
      const res = await axios.get<IUser>(
        `${api}/employees?id=${id}&role=${role}`
      );
      return res.data;
    } else if (id && id.toString().length > 0 && !role) {
      const res = await axios.get<IUser>(`${api}/employees?id=${id}`);
      return res.data;
    } else if (!id && role) {
      const res = await axios.get<IUser>(`${api}/employees?role=${role}`);
      return res.data;
    } else {
      const res = await axios.get<IUser>(`${api}/employees${custom}`);
      return res.data;
    }
  } catch (e) {
    console.log(e);
  }
};

export const postUser = async (data: IUser) => {
  try {
    const res = await axios.post(`${api}/employees`, data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
