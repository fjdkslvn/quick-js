import { atom } from "recoil";

export interface User{
  user_id: string;
  name: string;
}

export const userData = atom<User>({
  key: "userData",
  default: {user_id: "", name: ""},
});